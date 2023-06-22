namespace $.$$ {
	export class $milkywaystd_scroll_VirtualScrollable extends $milkywaystd_scroll_Scrollable {
		constructor(
			elementRef: Element,
			scrollDispatcher: $milkywaystd_scroll_ScrollDispatcher,
			dir?: any,
		  ) {
			super(elementRef, scrollDispatcher, dir);
		  }
		
		  /**
		   * Measure the viewport size for the provided orientation.
		   *
		   * @param orientation The orientation to measure the size from.
		   */
		  measureViewportSize(orientation: 'horizontal' | 'vertical') {
			const viewportEl = this._elementRef;
			return orientation === 'horizontal' ? viewportEl.clientWidth : viewportEl.clientHeight;
		  }
		
		  /**
		   * Measure the bounding ClientRect size including the scroll offset.
		   *
		   * @param from The edge to measure from.
		  */ 
		  abstract measureBoundingClientRectWithScrollOffset(
			from: 'left' | 'top' | 'right' | 'bottom',
		  ): number;
		  
	}
}
