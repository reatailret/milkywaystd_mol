namespace $ {
	/** A strategy that dictates which items should be rendered in the viewport. */
	export interface $milkywaystd_scroll_interface_IVirtualScrollStrategy {
		/** Emits when the index of the first element visible in the viewport changes. */

		scrolledIndexChange: $milkywaystd_classes_stream<number> | null;

		/**
		 * Attaches this scroll strategy to a viewport.
		 * @param viewport The viewport to attach this strategy to.
		 */
		attach(viewport: CdkVirtualScrollViewport): void;

		/** Detaches this scroll strategy from the currently attached viewport. */
		detach(): void;

		/** Called when the viewport is scrolled (debounced using requestAnimationFrame). */
		onContentScrolled(): void;

		/** Called when the length of the data changes. */
		onDataLengthChanged(): void;

		/** Called when the range of items rendered in the DOM has changed. */
		onContentRendered(): void;

		/** Called when the offset of the rendered items changed. */
		onRenderedOffsetChanged(): void;

		/**
		 * Scroll to the offset for the given index.
		 * @param index The index of the element to scroll to.
		 * @param behavior The ScrollBehavior to use when scrolling.
		 */
		scrollToIndex(index: number, behavior: ScrollBehavior): void;
	}
}
