namespace $.$$ {
	function rangesEqual(r1: ListRange, r2: ListRange): boolean {
		return r1.start == r2.start && r1.end == r2.end;
	  }
	export type ListRange = {start: number; end: number};
	export class $milkywaystd_scroll_VirtualScrollViewportController extends $milkywaystd_scroll_VirtualScrollable {
		
		//private _platform = inject(Platform);

		/** Emits when the viewport is detached from a CdkVirtualForOf. */
		private readonly _detachedSubject = $milkywaystd_classes_stream();
	  
		/** Emits when the rendered range changes. */
		private readonly _renderedRangeSubject:$milkywaystd_classes_stream<ListRange> = $milkywaystd_classes_stream();
	  
		/** The direction the viewport scrolls. */
		
		
	  @$mol_mem
		orientation(orientation?: 'horizontal' | 'vertical') {
		  if (orientation !== undefined) {
			return orientation;
		  }
		  return 'vertical';
		}
		
	  
		/**
		 * Whether rendered items should persist in the DOM after scrolling out of view. By default, items
		 * will be removed.
		 */
		
		get appendOnly(): boolean {
		  return this._appendOnly;
		}
		set appendOnly(value: boolean) {
		  this._appendOnly = value;
		}
		private _appendOnly = false;
	  
		// Note: we don't use the typical EventEmitter here because we need to subscribe to the scroll
		// strategy lazily (i.e. only if the user is actually listening to the events). We do this because
		// depending on how the strategy calculates the scrolled index, it may come at a cost to
		// performance.
		/** Emits when the index of the first element visible in the viewport changes. */
		
		readonly scrolledIndexChange: $milkywaystd_classes_stream<number> = $milkywaystd_classes_stream();
	  
		/** The element that wraps the rendered content. */
		_contentWrapper = null;
	  
		/** A stream that emits whenever the rendered range changes. */
		readonly renderedRangeStream: $milkywaystd_classes_stream<ListRange> = this._renderedRangeSubject;
	  
		/**
		 * The total size of all content (in pixels), including content that is not currently rendered.
		 */
		@$mol_mem
		private _totalContentSize(size?:number){
			if(undefined !== size) return size;
			return 0;
		};
	  
		/** A string representing the `style.width` property value to be used for the spacer element. */
		@$mol_mem
		_totalContentWidth (){
			this.orientation() === 'horizontal' ? `${this._totalContentSize()}px` : '';
		};
	  
		/** A string representing the `style.height` property value to be used for the spacer element. */
		@$mol_mem
		_totalContentHeight(){
			return this.orientation() === 'horizontal' ? '' : `${this._totalContentSize()}px`;
		};
	  
		/**
		 * The CSS transform applied to the rendered subset of items so that they appear within the bounds
		 * of the visible viewport.
		 */
		private _renderedContentTransform: string;
	  
		/** The currently rendered range of indices. */
		private _renderedRange: ListRange = {start: 0, end: 0};
	  
		/** The length of the data bound to this viewport (in number of items). */
		private _dataLength = 0;
	  
		/** The size of the viewport (in pixels). */
		private _viewportSize = 0;
	  
		/** the currently attached CdkVirtualScrollRepeater. */
		private _forOf: $milkywaystd_scroll_VirtualForOf | null = null;
	  
		/** The last rendered content offset that was set. */
		private _renderedContentOffset = 0;
	  
		/**
		 * Whether the last rendered content offset was to the end of the content (and therefore needs to
		 * be rewritten as an offset to the start of the content).
		 */
		private _renderedContentOffsetNeedsRewrite = false;
	  
		/** Whether there is a pending change detection cycle. */
		private _isChangeDetectionPending = false;
	  
		/** A list of functions to run after the next change detection cycle. */
		private _runAfterChangeDetection: Function[] = [];
	  
		/** Subscription to changes in the viewport size. */
		private _viewportChanges = null;

		_scrollStrategy:$milkywaystd_scroll_interface_IVirtualScrollStrategy
		scrollable:$milkywaystd_scroll_VirtualScrollable

		subscripion:$milkywaystd_classes_stream<Event>
	  
		constructor(
		  elementRef: Element,
		  
		  
		  scrollStrategy: $milkywaystd_scroll_interface_IVirtualScrollStrategy,
		  dir: any,
		  scrollDispatcher: $milkywaystd_scroll_ScrollDispatcher,
		  //viewportRuler: ViewportRuler,
		  scrollable?: $milkywaystd_scroll_VirtualScrollable,
		) {
		  super(elementRef, scrollDispatcher,dir);
	  
		  if (!scrollStrategy) {
			throw Error('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
		  }
		  this.scrollable = scrollable
		  this._scrollStrategy = scrollStrategy
		/*  this._viewportChanges = viewportRuler.change().subscribe(() => {
			this.checkViewportSize();
		  });
	  */
		  if (!this.scrollable) {
			// No scrollable is provided, so the virtual-scroll-viewport needs to become a scrollable
			this._elementRef.classList.add('cdk-virtual-scrollable');
			this.scrollable = this;
		  }
		  this._scrollStrategy.scrolledIndexChange.subscribe(()=>Promise.resolve().then(this.scrolledIndexChange))
		}
	  
		Init() {
		  // Scrolling depends on the element dimensions which we can't get during SSR.
		//  if (!this._platform.isBrowser) {
		//	return;
		  //}
	  
		  if (this.scrollable === this) {
			super.Init();
		  }
		  // It's still too early to measure the viewport at this point. Deferring with a promise allows
		  // the Viewport to be rendered with the correct size before we measure. We run this outside the
		  // zone to avoid causing more change detection cycles. We handle the change detection loop
		  // ourselves instead.
		  //this.ngZone.runOutsideAngular(() =>
			Promise.resolve().then(() => {
			  this._measureViewportSize();
			  this._scrollStrategy.attach(this);
	  
			  this.subscripion = this.scrollable
				.elementScrolled()
				.auditTime(0)
				.subscribe(() => this._scrollStrategy.onContentScrolled());
				this.subscripion(null)
	  
			  this._markChangeDetectionNeeded();
			})
			//,
		  //);
		}
	  
		deinit() {
		  this.detach();
		  this._scrollStrategy.detach();
	  
		  // Complete all subjects
		  //this._renderedRangeSubject.complete();
		  //this._detachedSubject.complete();
		  //this._viewportChanges.unsubscribe();
	  
		  super.deinit();
		}
	  
		/** Attaches a `CdkVirtualScrollRepeater` to this viewport. */
		attach(forOf: $milkywaystd_scroll_VirtualForOf) {
		  if (this._forOf ) {
			throw Error('$milkywaystd_scroll_VirtualForOf is already attached.');
		  }
	  
		  // Subscribe to the data stream of the CdkVirtualForOf to keep track of when the data length
		  // changes. Run outside the zone to avoid triggering change detection, since we're managing the
		  // change detection loop ourselves.
		  //this.ngZone.runOutsideAngular(() => {
			this._forOf = forOf;
			this._forOf.dataStream.subscribe(data => {
			  const newLength = data.length;
			  if (newLength !== this._dataLength) {
				this._dataLength = newLength;
				this._scrollStrategy.onDataLengthChanged();
			  }
			  this._doChangeDetection();
			});
		 // });
		}
	  
		/** Detaches the current `CdkVirtualForOf`. */
		detach() {
		  this._forOf = null;
		  this._detachedSubject()
		}
	  
		/** Gets the length of the data bound to this viewport (in number of items). */
		getDataLength(): number {
		  return this._dataLength;
		}
	  
		/** Gets the size of the viewport (in pixels). */
		getViewportSize(): number {
		  return this._viewportSize;
		}
	  
		// TODO(mmalerba): This is technically out of sync with what's really rendered until a render
		// cycle happens. I'm being careful to only call it after the render cycle is complete and before
		// setting it to something else, but its error prone and should probably be split into
		// `pendingRange` and `renderedRange`, the latter reflecting whats actually in the DOM.
	  
		/** Get the current rendered range of items. */
		getRenderedRange(): ListRange {
		  return this._renderedRange;
		}
	  
		measureBoundingClientRectWithScrollOffset(from: 'left' | 'top' | 'right' | 'bottom'): number {
		  return this.getElementRef().getBoundingClientRect()[from];
		}
	  
		/**
		 * Sets the total size of all content (in pixels), including content that is not currently
		 * rendered.
		 */
		setTotalContentSize(size: number) {
		  if (this._totalContentSize() !== size) {
			this._totalContentSize(size);
			
			this._markChangeDetectionNeeded();
		  }
		}
	  
		/** Sets the currently rendered range of indices. */
		setRenderedRange(range: ListRange) {
		  if (!rangesEqual(this._renderedRange, range)) {
			if (this.appendOnly) {
			  range = {start: 0, end: Math.max(this._renderedRange.end, range.end)};
			}
			this._renderedRangeSubject((this._renderedRange = range));
			this._markChangeDetectionNeeded(() => this._scrollStrategy.onContentRendered());
		  }
		}
	  
		/**
		 * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
		 */
		getOffsetToRenderedContentStart(): number | null {
		  return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
		}
	  
		/**
		 * Sets the offset from the start of the viewport to either the start or end of the rendered data
		 * (in pixels).
		 */
		setRenderedContentOffset(offset: number, to: 'to-start' | 'to-end' = 'to-start') {
		  // In appendOnly, we always start from the top
		  offset = this.appendOnly && to === 'to-start' ? 0 : offset;
	  
		  // For a horizontal viewport in a right-to-left language we need to translate along the x-axis
		  // in the negative direction.
		  const isRtl = this.dir && this.dir.value == 'rtl';
		  const isHorizontal = this.orientation() == 'horizontal';
		  const axis = isHorizontal ? 'X' : 'Y';
		  const axisDirection = isHorizontal && isRtl ? -1 : 1;
		  let transform = `translate${axis}(${Number(axisDirection * offset)}px)`;
		  this._renderedContentOffset = offset;
		  if (to === 'to-end') {
			transform += ` translate${axis}(-100%)`;
			// The viewport should rewrite this as a `to-start` offset on the next render cycle. Otherwise
			// elements will appear to expand in the wrong direction (e.g. `mat-expansion-panel` would
			// expand upward).
			this._renderedContentOffsetNeedsRewrite = true;
		  }
		  if (this._renderedContentTransform != transform) {
			// We know this value is safe because we parse `offset` with `Number()` before passing it
			// into the string.
			this._renderedContentTransform = transform;
			this._markChangeDetectionNeeded(() => {
			  if (this._renderedContentOffsetNeedsRewrite) {
				this._renderedContentOffset -= this.measureRenderedContentSize();
				this._renderedContentOffsetNeedsRewrite = false;
				this.setRenderedContentOffset(this._renderedContentOffset);
			  } else {
				this._scrollStrategy.onRenderedOffsetChanged();
			  }
			});
		  }
		}
	  
		/**
		 * Scrolls to the given offset from the start of the viewport. Please note that this is not always
		 * the same as setting `scrollTop` or `scrollLeft`. In a horizontal viewport with right-to-left
		 * direction, this would be the equivalent of setting a fictional `scrollRight` property.
		 * @param offset The offset to scroll to.
		 * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
		 */
		scrollToOffset(offset: number, behavior: ScrollBehavior = 'auto') {
		  const options: ExtendedScrollToOptions = {behavior};
		  if (this.orientation() === 'horizontal') {
			options.start = offset;
		  } else {
			options.top = offset;
		  }
		  this.scrollable.scrollTo(options);
		}
	  
		/**
		 * Scrolls to the offset for the given index.
		 * @param index The index of the element to scroll to.
		 * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
		 */
		scrollToIndex(index: number, behavior: ScrollBehavior = 'auto') {
		  this._scrollStrategy.scrollToIndex(index, behavior);
		}
	  
		/**
		 * Gets the current scroll offset from the start of the scrollable (in pixels).
		 * @param from The edge to measure the offset from. Defaults to 'top' in vertical mode and 'start'
		 *     in horizontal mode.
		 */
		override measureScrollOffset(
		  from?: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end',
		): number {
		  // This is to break the call cycle
		  let measureScrollOffset: InstanceType<typeof $milkywaystd_scroll_Scrollable>['measureScrollOffset'];
		  if (this.scrollable == this) {
			measureScrollOffset = (_from: NonNullable<typeof from>) => super.measureScrollOffset(_from);
		  } else {
			measureScrollOffset = (_from: NonNullable<typeof from>) =>
			  this.scrollable.measureScrollOffset(_from);
		  }
	  
		  return Math.max(
			0,
			measureScrollOffset(from ?? (this.orientation() === 'horizontal' ? 'start' : 'top')) -
			  this.measureViewportOffset(),
		  );
		}
	  
		/**
		 * Measures the offset of the viewport from the scrolling container
		 * @param from The edge to measure from.
		 */
		measureViewportOffset(from?: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end') {
		  let fromRect: 'left' | 'top' | 'right' | 'bottom';
		  const LEFT = 'left';
		  const RIGHT = 'right';
		  const isRtl = this.dir?.value == 'rtl';
		  if (from == 'start') {
			fromRect = isRtl ? RIGHT : LEFT;
		  } else if (from == 'end') {
			fromRect = isRtl ? LEFT : RIGHT;
		  } else if (from) {
			fromRect = from;
		  } else {
			fromRect = this.orientation() === 'horizontal' ? 'left' : 'top';
		  }
	  
		  const scrollerClientRect = this.scrollable.measureBoundingClientRectWithScrollOffset(fromRect);
		  const viewportClientRect = this._elementRef.getBoundingClientRect()[fromRect];
	  
		  return viewportClientRect - scrollerClientRect;
		}
	  
		/** Measure the combined size of all of the rendered items. */
		measureRenderedContentSize(): number {
		  const contentEl = this._contentWrapper as HTMLElement;
		  return this.orientation() === 'horizontal' ? contentEl.offsetWidth : contentEl.offsetHeight;
		}
	  
		/**
		 * Measure the total combined size of the given range. Throws if the range includes items that are
		 * not rendered.
		 */
		measureRangeSize(range: ListRange): number {
		  if (!this._forOf) {
			return 0;
		  }
		  return this._forOf.measureRangeSize(range, this.orientation());
		}
	  
		/** Update the viewport dimensions and re-render. */
		checkViewportSize() {
		  // TODO: Cleanup later when add logic for handling content resize
		  this._measureViewportSize();
		  this._scrollStrategy.onDataLengthChanged();
		}
	  
		/** Measure the viewport size. */
		private _measureViewportSize() {
		  this._viewportSize = this.scrollable.measureViewportSize(this.orientation());
		}
	  
		/** Queue up change detection to run. */
		private _markChangeDetectionNeeded(runAfter?: Function) {
		  if (runAfter) {
			this._runAfterChangeDetection.push(runAfter);
		  }
	  
		  // Use a Promise to batch together calls to `_doChangeDetection`. This way if we set a bunch of
		  // properties sequentially we only have to run `_doChangeDetection` once at the end.
		 /* if (!this._isChangeDetectionPending) {
			this._isChangeDetectionPending = true;
			this.ngZone.runOutsideAngular(() =>
			  Promise.resolve().then(() => {
				this._doChangeDetection();
			  }),
			);
		  }*/
		  if (!this._isChangeDetectionPending) {
			this._isChangeDetectionPending = true;
		  Promise.resolve().then(() => {
			this._doChangeDetection();
		  })
		}
		}
	  
		/** Run change detection. */
		private _doChangeDetection() {
		  this._isChangeDetectionPending = false;
			console.log("_doChangeDetection")
		  // Apply the content transform. The transform can't be set via an Angular binding because
		  // bypassSecurityTrustStyle is banned in Google. However the value is safe, it's composed of
		  // string literals, a variable that can only be 'X' or 'Y', and user input that is run through
		  // the `Number` function first to coerce it to a numeric value.
		  this._contentWrapper.style.transform = this._renderedContentTransform;
		  // Apply changes to Angular bindings. Note: We must call `markForCheck` to run change detection
		  // from the root, since the repeated items are content projected in. Calling `detectChanges`
		  // instead does not properly check the projected content.
		 // this.ngZone.run(() => this._changeDetectorRef.markForCheck());
	  
		  const runAfterChangeDetection = this._runAfterChangeDetection;
		  this._runAfterChangeDetection = [];
		  for (const fn of runAfterChangeDetection) {
			fn();
		  }
		}
	  
		
	}
}
