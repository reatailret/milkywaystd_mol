namespace $.$$ {
	export class $milkywaystd_scroll_ScrollDispatcher {
		/** Used to reference correct document/window */
		protected _document: Document;

		constructor(
		 document: any
		) {
		
		  this._document = document;
		}
	  
		/** Subject for notifying that a registered scrollable reference element has been scrolled. */
		private readonly _scrolled:$milkywaystd_classes_stream<$milkywaystd_scroll_Scrollable | void> = $milkywaystd_classes_stream();
	  
		/** Keeps track of the global `scroll` and `resize` subscriptions. */
		_globalSubscription:$milkywaystd_classes_stream<any> | null = null;
	  
		/** Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards. */
		private _scrolledCount = 0;
	  
		/**
		 * Map of all the scrollable references that are registered with the service and their
		 * scroll event subscriptions.
		 */
		scrollContainers: Map<$milkywaystd_scroll_Scrollable, $milkywaystd_classes_stream<any>> = new Map();
	  
		/**
		 * Registers a scrollable instance with the service and listens for its scrolled events. When the
		 * scrollable is scrolled, the service emits the event to its scrolled observable.
		 * @param scrollable Scrollable instance to be registered.
		 */
		register(scrollable: $milkywaystd_scroll_Scrollable): void {
		  if (!this.scrollContainers.has(scrollable)) {
			this.scrollContainers.set(
			  scrollable,
			  scrollable.elementScrolled()!.subscribe(() => this._scrolled(scrollable)),
			);
		  }
		}
	  
		/**
		 * De-registers a Scrollable reference and unsubscribes from its scroll event observable.
		 * @param scrollable Scrollable instance to be deregistered.
		 */
		deregister(scrollable: $milkywaystd_scroll_Scrollable): void {
		  const scrollableReference = this.scrollContainers.get(scrollable);
	  
		  if (scrollableReference) {
			//scrollableReference.unsubscribe();
			this.scrollContainers.delete(scrollable);
		  }
		}
	  
		/**
		 * Returns an observable that emits an event whenever any of the registered Scrollable
		 * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
		 * to override the default "throttle" time.
		 *
		 * **Note:** in order to avoid hitting change detection for every scroll event,
		 * all of the events emitted from this stream will be run outside the Angular zone.
		 * If you need to update any data bindings as a result of a scroll event, you have
		 * to run the callback using `NgZone.run`.
		 */
		
		scrolled(auditTimeInMs: number = 20): $milkywaystd_classes_stream<$milkywaystd_scroll_Scrollable | void> {
		/*  if (!this._platform.isBrowser) {
			return observableOf<void>();
		  }
	  	*/	
		  
			if (!this._globalSubscription) {
			  this._addGlobalListener();
			}
	  
			// In the case of a 0ms delay, use an observable without auditTime
			// since it does add a perceptible delay in processing overhead.
			const subscription =
			  auditTimeInMs > 0
				? this._scrolled.auditTime(auditTimeInMs)
				: this._scrolled;
	  
			this._scrolledCount++;
	  
			/*return () => {
			  subscription.unsubscribe();
			  this._scrolledCount--;
	  
			  if (!this._scrolledCount) {
				this._removeGlobalListener();
			  }
			};*/
			return subscription;
		  
		}
	  
		ngOnDestroy() {
		  this._removeGlobalListener();
		  this.scrollContainers.forEach((_, container) => this.deregister(container));
		  //this._scrolled.complete();
		}
	  
		/**
		 * Returns an observable that emits whenever any of the
		 * scrollable ancestors of an element are scrolled.
		 * @param elementOrElementRef Element whose ancestors to listen for.
		 * @param auditTimeInMs Time to throttle the scroll events.
		 */
		ancestorScrolled(
		  elementOrElementRef: any,
		  auditTimeInMs?: number,
		): $milkywaystd_classes_stream<$milkywaystd_scroll_Scrollable | void> {
		  const ancestors = this.getAncestorScrollContainers(elementOrElementRef);
	  
		  return this.scrolled(auditTimeInMs).filter(target => {
			  return !target || ancestors.indexOf(target) > -1;
			});
		}
	  
		/** Returns all registered Scrollables that contain the provided element. */
		getAncestorScrollContainers(elementOrElementRef: any): $milkywaystd_scroll_Scrollable[] {
		  const scrollingContainers: $milkywaystd_scroll_Scrollable[] = [];
	  
		  this.scrollContainers.forEach((_subscription: any, scrollable: $milkywaystd_scroll_Scrollable) => {
			if (this._scrollableContainsElement(scrollable, elementOrElementRef)) {
			  scrollingContainers.push(scrollable);
			}
		  });
	  
		  return scrollingContainers;
		}
	  
		/** Use defaultView of injected document if available or fallback to global window reference */
		private _getWindow(): Window {
		  return this._document.defaultView || window;
		}
	  
		/** Returns true if the element is contained within the provided Scrollable. */
		private _scrollableContainsElement(
		  scrollable: $milkywaystd_scroll_Scrollable,
		  elementOrElementRef: Element,
		): boolean {
		  let element: Element | null = elementOrElementRef;
		  let scrollableElement = scrollable.getElementRef();
	  
		  // Traverse through the element parents until we reach null, checking if any of the elements
		  // are the scrollable's element.
		  do {
			if (element == scrollableElement) {
			  return true;
			}
		  } while ((element = element!.parentElement));
	  
		  return false;
		}
	  
		/** Sets up the global scroll listeners. */
		private _addGlobalListener() {
		  this._globalSubscription = $milkywaystd_classes_stream.fromEvent(window.document as any, 'scroll').subscribe(() => this._scrolled());
		}
	  
		/** Cleans up the global scroll listener. */
		private _removeGlobalListener() {
		  if (this._globalSubscription) {
			//this._globalSubscription.unsubscribe();
			this._globalSubscription = null;
		  }
		}
	}
}
