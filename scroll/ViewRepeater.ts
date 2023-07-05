namespace $.$$ {
	export interface _ViewRepeaterItemContext<T> {
		implicit?: T;
	}

	/**
	 * The arguments needed to construct an embedded view for an item in a view
	 * container.
	 *
	 * @template C The type for the context passed to each embedded view.
	 */
	export interface _ViewRepeaterItemInsertArgs<C> {
		templateRef: TemplateRef<C>;
		context?: C;
		index?: number;
	}

	/**
	 * A factory that derives the embedded view context for an item in a view
	 * container.
	 *
	 * @template T The type for the embedded view's implicit property.
	 * @template R The type for the item in each IterableDiffer change record.
	 * @template C The type for the context passed to each embedded view.
	 */
	export type _ViewRepeaterItemContextFactory<
		T,
		R,
		C extends _ViewRepeaterItemContext<T>
	> = (
		record: IterableChangeRecord<R>,
		adjustedPreviousIndex: number | null,
		currentIndex: number | null
	) => _ViewRepeaterItemInsertArgs<C>;

	/**
	 * Extracts the value of an item from an {@link IterableChangeRecord}.
	 *
	 * @template T The type for the embedded view's implicit property.
	 * @template R The type for the item in each IterableDiffer change record.
	 */
	export type _ViewRepeaterItemValueResolver<T, R> = (
		record: IterableChangeRecord<R>
	) => T;

	/** Indicates how a view was changed by a {@link _ViewRepeater}. */
	export const enum _ViewRepeaterOperation {
		/** The content of an existing view was replaced with another item. */
		REPLACED,
		/** A new view was created with `createEmbeddedView`. */
		INSERTED,
		/** The position of a view changed, but the content remains the same. */
		MOVED,
		/** A view was detached from the view container. */
		REMOVED,
	}

	/**
	 * Meta data describing the state of a view after it was updated by a
	 * {@link _ViewRepeater}.
	 *
	 * @template R The type for the item in each IterableDiffer change record.
	 * @template C The type for the context passed to each embedded view.
	 */
	export interface _ViewRepeaterItemChange<R, C> {
		/** The view's context after it was changed. */
		context?: C;
		/** Indicates how the view was changed. */
		operation: _ViewRepeaterOperation;
		/** The view's corresponding change record. */
		record: IterableChangeRecord<R>;
	}

	/**
	 * Type for a callback to be executed after a view has changed.
	 *
	 * @template R The type for the item in each IterableDiffer change record.
	 * @template C The type for the context passed to each embedded view.
	 */
	export type _ViewRepeaterItemChanged<R, C> = (
		change: _ViewRepeaterItemChange<R, C>
	) => void;

	/**
	 * Describes a strategy for rendering items in a {@link $milkywaystd_scroll_VirtualForOf}.
	 *
	 * @template T The type for the embedded view's implicit property.
	 * @template R The type for the item in each IterableDiffer change record.
	 * @template C The type for the context passed to each embedded view.
	 */
	export interface _ViewRepeater<
		T,
		R,
		C extends _ViewRepeaterItemContext<T>
	> {
		applyChanges(
			changes: IterableChanges<R>,
			viewContainerRef: $milkywaystd_scroll_VirtualForOf,
			itemContextFactory: _ViewRepeaterItemContextFactory<T, R, C>,
			itemValueResolver: _ViewRepeaterItemValueResolver<T, R>,
			itemViewChanged?: _ViewRepeaterItemChanged<R, C>
		): void;

		detach(): void;
	}

	/**
	 * A repeater that caches views when they are removed from a
	 * {@link $milkywaystd_scroll_VirtualForOf}. When new items are inserted into the container,
	 * the repeater will reuse one of the cached views instead of creating a new
	 * embedded view. Recycling cached views reduces the quantity of expensive DOM
	 * inserts.
	 *
	 * @template T The type for the embedded view's implicit property.
	 * @template R The type for the item in each IterableDiffer change record.
	 * @template C The type for the context passed to each embedded view.
	 */
	export class $milkywaystd_scroll_RecycleViewRepeaterStrategy<
		T,
		R,
		C extends _ViewRepeaterItemContext<T>
	> implements _ViewRepeater<T, R, C>
	{
		/**
		 * The size of the cache used to store unused views.
		 * Setting the cache size to `0` will disable caching. Defaults to 20 views.
		 */
		viewCacheSize: number = 20;

		/**
		 * View cache that stores embedded view instances that have been previously stamped out,
		 * but don't are not currently rendered. The view repeater will reuse these views rather than
		 * creating brand new ones.
		 *
		 * TODO(michaeljamesparsons) Investigate whether using a linked list would improve performance.
		 */
		private _viewCache: EmbeddedViewRef<C>[] = [];

		/** Apply changes to the DOM. */
		applyChanges2(
			changes: Array<$milkywaystd_scroll_Diff>,
			viewContainerRef: $milkywaystd_scroll_VirtualForOf,
			itemContextFactory: _ViewRepeaterItemContextFactory<T, R, C>,
			itemValueResolver: _ViewRepeaterItemValueResolver<T, R>,
			itemViewChanged?: _ViewRepeaterItemChanged<R, C>
		) {
			// Rearrange the views to put them in the right location.
			if (!changes.length) return;
			viewContainerRef.startMutation();
			changes.sort((a,b)=>{return a.currentIndex === null && b.currentIndex !== null?-1:1})
			for (const record of changes) {
				let adjustedPreviousIndex = record.previousIndex;
				let currentIndex = record.currentIndex;
				let view;
				let operation: _ViewRepeaterOperation;
				if (record.previousIndex == null) {
					// Item added.
					const viewArgsFactory = () =>
						itemContextFactory(
							record,
							adjustedPreviousIndex,
							currentIndex
						);
					view = this._insertView(
						viewArgsFactory,
						currentIndex!,
						viewContainerRef,
						itemValueResolver(record)
					);
					operation = view
						? _ViewRepeaterOperation.INSERTED
						: _ViewRepeaterOperation.REPLACED;
				} else if (currentIndex == null) {
					// Item removed.
					this._detachAndCacheView(
						adjustedPreviousIndex!,
						viewContainerRef
					);
					operation = _ViewRepeaterOperation.REMOVED;
				} else {
					// Item moved.
					view = this._moveView(
						adjustedPreviousIndex!,
						currentIndex!,
						viewContainerRef,
						itemValueResolver(record)
					);
					operation = _ViewRepeaterOperation.MOVED;
				}

				if (itemViewChanged) {
					itemViewChanged({
						context: view?.context,
						operation,
						record,
					});
				}
			}
			viewContainerRef.applyMutation();
		}
		applyChanges(
			changes: IterableChanges<R>,
			viewContainerRef: $milkywaystd_scroll_VirtualForOf,
			itemContextFactory: _ViewRepeaterItemContextFactory<T, R, C>,
			itemValueResolver: _ViewRepeaterItemValueResolver<T, R>,
			itemViewChanged?: _ViewRepeaterItemChanged<R, C>,
		  ) {
			// Rearrange the views to put them in the right location.
			
			changes.forEachOperation(
			  (
				record: IterableChangeRecord<R>,
				adjustedPreviousIndex: number | null,
				currentIndex: number | null,
			  ) => {
				
				let view: EmbeddedViewRef<C> | undefined;
				let operation: _ViewRepeaterOperation;
				if (record.previousIndex == null) {
				  // Item added.
				  const viewArgsFactory = () =>
					itemContextFactory(record, adjustedPreviousIndex, currentIndex);
				  view = this._insertView(
					viewArgsFactory,
					currentIndex!,
					viewContainerRef,
					itemValueResolver(record),
				  );
				  operation = view ? _ViewRepeaterOperation.INSERTED : _ViewRepeaterOperation.REPLACED;
				} else if (currentIndex == null) {
				  // Item removed.
				  this._detachAndCacheView(adjustedPreviousIndex!, viewContainerRef);
				  operation = _ViewRepeaterOperation.REMOVED;
				} else {
				  // Item moved.
				  view = this._moveView(
					adjustedPreviousIndex!,
					currentIndex!,
					viewContainerRef,
					itemValueResolver(record),
				  );
				  operation = _ViewRepeaterOperation.MOVED;
				}
		
				if (itemViewChanged) {
				  itemViewChanged({
					context: view?.context,
					operation,
					record,
				  });
				}
			  },
			);
			
		  }
		detach() {
			for (const view of this._viewCache) {
				if(view.destroy)
				view.destroy();
			}
			this._viewCache = [];
		}

		/**
		 * Inserts a view for a new item, either from the cache or by creating a new
		 * one. Returns `undefined` if the item was inserted into a cached view.
		 */
		private _insertView(
			viewArgsFactory: () => _ViewRepeaterItemInsertArgs<C>,
			currentIndex: number,
			viewContainerRef: $milkywaystd_scroll_VirtualForOf,
			value: T
		): EmbeddedViewRef<C> | undefined {
			const cachedView = this._insertViewFromCache(
				currentIndex!,
				viewContainerRef
			);
			if (cachedView) {
				
				cachedView.implicit(value);
				
				return undefined;
			}
			//console.log("CACHE NO USED")
			const viewArgs = viewArgsFactory();
			//console.log("VIEW ARGS", viewArgs)
			return viewContainerRef.createEmbeddedView(
				viewArgs.templateRef,
				viewArgs.context,
				viewArgs.index
			);
		}

		/** Detaches the view at the given index and inserts into the view cache. */
		private _detachAndCacheView(
			index: number,
			viewContainerRef: $milkywaystd_scroll_VirtualForOf
		) {
			const detachedView = viewContainerRef.detach(
				index
			) as EmbeddedViewRef<C>;
			if(detachedView)
			this._maybeCacheView(detachedView, viewContainerRef);
		}

		/** Moves view at the previous index to the current index. */
		private _moveView(
			adjustedPreviousIndex: number,
			currentIndex: number,
			viewContainerRef: $milkywaystd_scroll_VirtualForOf,
			value: T
		): EmbeddedViewRef<C> {
			const view = viewContainerRef.get(
				adjustedPreviousIndex!
			) as EmbeddedViewRef<C>;
			viewContainerRef.move(view, currentIndex);
			
			view.implicit(value);
			return view;
		}

		/**
		 * Cache the given detached view. If the cache is full, the view will be
		 * destroyed.
		 */
		private _maybeCacheView(
			view: EmbeddedViewRef<C>,
			viewContainerRef: $milkywaystd_scroll_VirtualForOf
		) {
			if (this._viewCache.length < this.viewCacheSize) {
				
				this._viewCache.push(view);
			} else {
				
				const index = viewContainerRef.indexOf(view);

				// The host component could remove views from the container outside of
				// the view repeater. It's unlikely this will occur, but just in case,
				// destroy the view on its own, otherwise destroy it through the
				// container to ensure that all the references are removed.
				if (index === -1) {
					console.warn("SET DESTROY FUNCTION!")
					//view.destroy();
				} else {
					viewContainerRef.remove(index);
				}
			}
		}

		/** Inserts a recycled view from the cache at the given index. */
		private _insertViewFromCache(
			index: number,
			viewContainerRef: $milkywaystd_scroll_VirtualForOf
		): EmbeddedViewRef<C> | null {
			const cachedView = this._viewCache.pop();
			if (cachedView) {
				//console.log("GET CACHED ", cachedView)
				viewContainerRef.insert(cachedView, index);
			}
			return cachedView || null;
		}
	}

	/**
	 * A repeater that destroys views when they are removed from a
	 * {@link ViewContainerRef}. When new items are inserted into the container,
	 * the repeater will always construct a new embedded view for each item.
	 *
	 * @template T The type for the embedded view's implicit property.
	 * @template R The type for the item in each IterableDiffer change record.
	 * @template C The type for the context passed to each embedded view.
	 */
	export class $milkywaystd_scroll_DisposeViewRepeaterStrategy<
		T,
		R,
		C extends _ViewRepeaterItemContext<T>
	> implements _ViewRepeater<T, R, C>
	{
		applyChanges(
			changes: Array<$milkywaystd_scroll_Diff>,
			viewContainerRef: $milkywaystd_scroll_VirtualForOf,
			itemContextFactory: _ViewRepeaterItemContextFactory<T, R, C>,
			itemValueResolver: _ViewRepeaterItemValueResolver<T, R>,
			itemViewChanged?: _ViewRepeaterItemChanged<R, C>
		) {
			let mutStarted = false;
			changes.forEachOperation(
			  (
				record: IterableChangeRecord<R>,
				adjustedPreviousIndex: number | null,
				currentIndex: number | null,
			  ) => {
				if(!mutStarted){
					mutStarted = true;
				
				}
				let view;
				let operation: _ViewRepeaterOperation;
					if (record.previousIndex == null) {
						const insertContext = itemContextFactory(
							record,
							adjustedPreviousIndex,
							currentIndex
						);
						view = viewContainerRef.createEmbeddedView(
							insertContext.templateRef,
							insertContext.context,
							insertContext.index
						);
						operation = _ViewRepeaterOperation.INSERTED;
					} else if (currentIndex == null) {
						viewContainerRef.remove(adjustedPreviousIndex!);
						operation = _ViewRepeaterOperation.REMOVED;
					} else {
						view = viewContainerRef.get(
							adjustedPreviousIndex!
						) as EmbeddedViewRef<C>;
						viewContainerRef.move(view!, currentIndex);
						operation = _ViewRepeaterOperation.MOVED;
					}

					if (itemViewChanged) {
						itemViewChanged({
							context: view?.context,
							operation,
							record,
						});
					}
				})
				return mutStarted;
		}

		detach() {}
	}
}
