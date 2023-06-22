namespace $.$$ {
	/** The context for an item rendered by `CdkVirtualForOf` */
	export type CdkVirtualForOfContext<T> = {
		/** The item value. */
		implicit: T;
		/** The DataSource, Observable, or NgIterable that was passed to *cdkVirtualFor. */
		cdkVirtualForOf: DataSource<T> | Observable<T[]> | NgIterable<T>;
		/** The index of the item in the DataSource. */
		index: number;
		/** The number of items in the DataSource. */
		count: number;
		/** Whether this is the first item in the DataSource. */
		first: boolean;
		/** Whether this is the last item in the DataSource. */
		last: boolean;
		/** Whether the index is even. */
		even: boolean;
		/** Whether the index is odd. */
		odd: boolean;
	};

	/** Helper to extract the offset of a DOM Node in a certain direction. */
	function getOffset(
		orientation: "horizontal" | "vertical",
		direction: "start" | "end",
		node: Node
	) {
		const el = node as Element;
		if (!el.getBoundingClientRect) {
			return 0;
		}
		const rect = el.getBoundingClientRect();

		if (orientation === "horizontal") {
			return direction === "start" ? rect.left : rect.right;
		}

		return direction === "start" ? rect.top : rect.bottom;
	}

	/**
	 * A directive similar to `ngForOf` to be used for rendering data inside a virtual scrolling
	 * container.
	 */
	type DataSource = any;
	export class $milkywaystd_scroll_VirtualForOf extends $.$mol_view {
		/** Emits when the rendered view of the data changes. */
		readonly viewChange = $milkywaystd_classes_stream<ListRange>();

		/** Subject that emits when a new DataSource instance is given. */
		private readonly _dataSourceChanges =
			$milkywaystd_classes_stream<DataSource>();

		/** The DataSource to display. */

		get cdkVirtualForOf():
			| DataSource
			| $milkywaystd_classes_stream<[]>
			| null
			| undefined {
			return this._cdkVirtualForOf;
		}
		set cdkVirtualForOf(
			value:
				| DataSource
				| $milkywaystd_classes_stream<[]>
				| null
				| undefined
		) {
			this._cdkVirtualForOf = value;
			this._dataSourceChanges(value);
		}

		_cdkVirtualForOf:
			| DataSource
			| $milkywaystd_classes_stream<[]>
			| null
			| undefined;

		sub() {
			return this.calculatedSubs();
		}

		@$mol_mem
		calculatedSubs(val?: undefined | Array<any>): Array<any> {
			if (undefined !== val) {
				return val;
			}

			return [];
		}
		idx = 0;

		/*
		 * The `TrackByFunction` to use for tracking changes. The `TrackByFunction` takes the index and
		 * the item and produces a value to be used as the item's identity when tracking changes.
		 */

		get cdkVirtualForTrackBy() {
			return this._cdkVirtualForTrackBy;
		}
		set cdkVirtualForTrackBy(fn) {
			this._needsUpdate = true;
			this._cdkVirtualForTrackBy = fn
				? (index, item) =>
						fn(
							index +
								(this._renderedRange
									? this._renderedRange.start
									: 0),
							item
						)
				: undefined;
		}
		private _cdkVirtualForTrackBy;

		/** The template used to stamp out new elements. */

		set cdkVirtualForTemplate(value) {
			if (value) {
				this._needsUpdate = true;
				this._template = value;
			}
		}
		
		/**
		 * The size of the cache used to store templates that are not being used for re-use later.
		 * Setting the cache size to `0` will disable caching. Defaults to 20 templates.
		 */

		get cdkVirtualForTemplateCacheSize(): number {
			return this._viewRepeater.viewCacheSize;
		}
		set cdkVirtualForTemplateCacheSize(size) {
			this._viewRepeater.viewCacheSize = size;
		}

		/** Emits whenever the data in the current DataSource changes. */
		readonly dataStream: $milkywaystd_classes_stream<[]> =
			this._dataSourceChanges;

		/** The differ used to calculate changes to the data. */
		private _differ =
			new $milkywaystd_classes_DefaultIterableDifferFactory().create();

		/** The most recent data emitted from the DataSource. */
		private _data;

		/** The currently rendered items. */
		private _renderedItems;

		/** The currently rendered range of indices. */
		private _renderedRange: ListRange;

		/** Whether the rendered data should be updated during the next ngDoCheck cycle. */
		private _needsUpdate = false;

		private readonly _destroyed = $milkywaystd_classes_stream();

		/** The view container to add items to. */
		_viewContainerRef() {
			return this;
		}
		/** The template to use when stamping out new items. */
		_template = null;
		
		/** The strategy used to render items in the virtual scroll viewport. */
		//_viewRepeater: _RecycleViewRepeaterStrategy<T, T, CdkVirtualForOfContext<T>>,
		_viewRepeater = new $milkywaystd_scroll_RecycleViewRepeaterStrategy();//new $milkywaystd_scroll_DisposeViewRepeaterStrategy(); //
		// //
		/** The virtual scrolling viewport that these items are being rendered in. */
		//_viewport: CdkVirtualScrollViewport,
		_viewport: $milkywaystd_scroll_VirtualScrollViewportController | null =
			null;

		init() {
			this.dataStream.subscribe((data) => {
				console.log("forof dataStream", data);
				this._data = data;
				this._onRenderedDataChange();
			});
			this._viewport.renderedRangeStream.subscribe((range) => {
				console.log("forof renderedRangeStream", range);
				this._renderedRange = range;

				this.viewChange(this._renderedRange);

				this._onRenderedDataChange();
			});
			this._viewport.attach(this);
		}
		/**
		 * Measures the combined size (width for horizontal orientation, height for vertical) of all items
		 * in the specified range. Throws an error if the range includes items that are not currently
		 * rendered.
		 */
		measureRangeSize(
			range: ListRange,
			orientation: "horizontal" | "vertical"
		): number {
			console.log("measureRangeSize", range);
			if (range.start >= range.end) {
				return 0;
			}
			if (
				range.start < this._renderedRange.start ||
				range.end > this._renderedRange.end
			) {
				throw Error(
					`Error: attempted to measure an item that isn't rendered.`
				);
			}

			// The index into the list of rendered views for the first item in the range.
			const renderedStartIndex = range.start - this._renderedRange.start;
			// The length of the range we're measuring.
			const rangeLen = range.end - range.start;

			// Loop over all the views, find the first and land node and compute the size by subtracting
			// the top of the first node from the bottom of the last one.
			let firstNode: HTMLElement | undefined;
			let lastNode: HTMLElement | undefined;

			// Find the first node by starting from the beginning and going forwards.
			for (let i = 0; i < rangeLen; i++) {
				const view = this._viewContainerRef()
					.get(i + renderedStartIndex)
					.dom_node();
				if (view && view.rootNodes.length) {
					firstNode = lastNode = view.rootNodes[0];
					break;
				}
			}

			// Find the last node by starting from the end and going backwards.
			for (let i = rangeLen - 1; i > -1; i--) {
				const view = this._viewContainerRef()
					.get(i + renderedStartIndex)
					.dom_node();
				if (view && view.rootNodes.length) {
					lastNode = view.rootNodes[view.rootNodes.length - 1];
					break;
				}
			}
			console.log("measureRangeSize", firstNode, lastNode);
			return firstNode && lastNode
				? getOffset(orientation, "end", lastNode) -
						getOffset(orientation, "start", firstNode)
				: 0;
		}

		ngDoCheck() {
			if (this._differ && this._needsUpdate) {
				// TODO(mmalerba): We should differentiate needs update due to scrolling and a new portion of
				// this list being rendered (can use simpler algorithm) vs needs update due to data actually
				// changing (need to do this diff).
				const changes = this._differ.diff(this._renderedItems);
				console.log(
					"onRenderedDataChange",
					this._renderedRange,
					changes
				);
				if (!changes) {
					this._updateContext();
				} else {
					this._applyChanges(changes);
				}
				this._needsUpdate = false;
			}
		}

		destructor() {
			console.log("VOF DESTRUCTOR")
			//this._viewport.detach();

			//this._dataSourceChanges.next(undefined!);
			//this._dataSourceChanges.complete();
			//this.viewChange.complete();

			//this._destroyed.next();
			//this._destroyed.complete();
			this._viewRepeater.detach();
		}

		/** React to scroll state changes in the viewport. */
		private _onRenderedDataChange() {
			if (!this._renderedRange) {
				return;
			}
			this._renderedItems = this._data.slice(
				this._renderedRange.start,
				this._renderedRange.end
			);
			this._needsUpdate = true;
			this.ngDoCheck();
		}

		/** Swap out one `DataSource` for another. */
		private _changeDataSource(
			oldDs: DataSource<T> | null,
			newDs: DataSource<T> | null
		): Observable<readonly T[]> {
			if (oldDs) {
				oldDs.disconnect(this);
			}

			this._needsUpdate = true;
			return newDs ? newDs.connect(this) : observableOf();
		}

		/** Update the `CdkVirtualForOfContext` for all views. */
		private _updateContext() {
			const count = this._data.length;
			let i = this._viewContainerRef().length;
			while (i--) {
				const view = this._viewContainerRef().get(i) as EmbeddedViewRef<
					CdkVirtualForOfContext<T>
				>;
				view.context.index = this._renderedRange.start + i;
				view.context.count = count;
				this._updateComputedContextProperties(view.context);
				view.detectChanges();
			}
		}

		/** Apply changes to the DOM. */
		private _applyChanges2(changes: Array<$milkywaystd_scroll_Diff>) {
			this._viewRepeater.applyChanges(
				changes,
				this._viewContainerRef(),
				(
					record: IterableChangeRecord<T>,
					_adjustedPreviousIndex: number | null,
					currentIndex: number | null
				) => this._getEmbeddedViewArgs(record, currentIndex!),
				(record) => record.item
			);

			// Update implicit for any items that had an identity change.
			/* changes.forEachIdentityChange((record: IterableChangeRecord<T>) => {
		const view = this._viewContainerRef().get(record.currentIndex!) as EmbeddedViewRef<
		  CdkVirtualForOfContext<T>
		>;
		view.context.implicit = record.item;
	  });
  		*/
			for (const iterator of changes) {
				console.log(
					"UPDATE ITEM ON INDEX",
					iterator.currentIndex,
					this.calculatedSubs().length
				);
				if (iterator.currentIndex !== null) {
					const view = this._viewContainerRef().get(
						iterator.currentIndex!
					);
					console.log("UPDATE ITEM ON INDEX", view);
					//view.onData(iterator.item);
				}
			}
			// Update the context variables on all items.
			/*
	  const count = this._data.length;
	  let i = this._viewContainerRef().length;
	  while (i--) {
		const view = this._viewContainerRef().get(i) as EmbeddedViewRef<CdkVirtualForOfContext<T>>;
		view.context.index = this._renderedRange.start + i;
		view.context.count = count;
		this._updateComputedContextProperties(view.context);
	  }
	  */
		}
		private _applyChanges(changes) {
			
			this._viewRepeater.applyChanges(
				changes,
				this._viewContainerRef(),
				(
					record: IterableChangeRecord<T>,
					_adjustedPreviousIndex: number | null,
					currentIndex: number | null
				) => this._getEmbeddedViewArgs(record, currentIndex!),
				(record) => record.item
			);

			// Update implicit for any items that had an identity change.
			changes.forEachIdentityChange((record: IterableChangeRecord<T>) => {
				const view = this._viewContainerRef().get(
					record.currentIndex!
				) as EmbeddedViewRef<CdkVirtualForOfContext<T>>;
				view.implicit(record.item);
				console.log("forEachIdentityChange", record.item);
			});

			// Update the context variables on all items.

			const count = this._data.length;
			let i = this.tempSubs.length;
			while (i--) {
				const view = this._viewContainerRef().get(i) as EmbeddedViewRef<
					CdkVirtualForOfContext<T>
				>;
				const context = view.context();
				context.index = this._renderedRange.start + i;
				context.count = count;
				this._updateComputedContextProperties(context);
			}
			this.applyMutation();
		}
		/** Update the computed properties on the `CdkVirtualForOfContext`. */
		private _updateComputedContextProperties(
			context: CdkVirtualForOfContext<any>
		) {
			context.first = context.index === 0;
			context.last = context.index === context.count - 1;
			context.even = context.index % 2 === 0;
			context.odd = !context.even;
		}

		private _getEmbeddedViewArgs(
			record: IterableChangeRecord<T>,
			index: number
		): _ViewRepeaterItemInsertArgs<CdkVirtualForOfContext<T>> {
			// Note that it's important that we insert the item directly at the proper index,
			// rather than inserting it and the moving it in place, because if there's a directive
			// on the same node that injects the `ViewContainerRef`, Angular will insert another
			// comment node which can throw off the move when it's being repeated for all items.
			return {
				templateRef: this._template,
				context: {
					implicit: record.item,
					// It's guaranteed that the iterable is not "undefined" or "null" because we only
					// generate views for elements if the "cdkVirtualForOf" iterable has elements.
					cdkVirtualForOf: this._cdkVirtualForOf!,
					index: -1,
					count: -1,
					first: false,
					last: false,
					odd: false,
					even: false,
				},
				index,
			};
		}
		mutationstarted = false;
		tempSubs: any = [];
		public startMutation() {
			if (this.mutationstarted) throw new Error("already mutation");
			this.mutationstarted = true;
			this.tempSubs = [...this.calculatedSubs()];
		}
		public applyMutation() {
			//this.tempSubs = this.tempSubs.filter((el) => el._index !== null);
			//this.tempSubs.sort((a, b) => a._index - b._index);
			this.calculatedSubs([...this.tempSubs]);
			this.mutationstarted = false;
		}
		public indexOf(view: any) {
			return this.tempSubs[this.tempSubs.indexOf(view)]
		}
		public insert(view: any, index: number) {
			console.log("call insert", index);
			
			this.tempSubs.splice(index,0,view);
		}
		public move(view: any, index: number) {
			console.log("call move", index);
			//view._index = index;
		}
		public remove(index: number) {
			console.log("call remove", index);

			let removed = this.tempSubs.splice(index, 1);
			if (removed && removed.length) {
				removed = removed[0];
				removed._index = null;
			} else {
				return null;
			}

			return removed;
		}
		public detach(index: number) {
			console.log("call detach", index);
			const detached = this.remove(index);
			//if (!detached) throw new Error("Detached can not be null");
			return detached;
		}
		public get(index: number) {
			console.log("call get", index);
			return this.tempSubs[index];
		}
		public createEmbeddedView(templateRef, context, index) {
			if (!templateRef) throw new Error("templateRef is not a function");

			const b = templateRef();
			b.onData(context);
			this.insert(b, index);
		}
	}
}
