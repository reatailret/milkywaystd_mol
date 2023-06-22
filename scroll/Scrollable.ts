namespace $.$$ {
	export type _Without<T> = { [P in keyof T]?: never };
	export type _XOR<T, U> = (_Without<T> & U) | (_Without<U> & T);
	export type _Top = { top?: number };
	export type _Bottom = { bottom?: number };
	export type _Left = { left?: number };
	export type _Right = { right?: number };
	export type _Start = { start?: number };
	export type _End = { end?: number };
	export type _XAxis = _XOR<_XOR<_Left, _Right>, _XOR<_Start, _End>>;
	export type _YAxis = _XOR<_Top, _Bottom>;

	/**
	 * An extended version of ScrollToOptions that allows expressing scroll offsets relative to the
	 * top, bottom, left, right, start, or end of the viewport rather than just the top and left.
	 * Please note: the top and bottom properties are mutually exclusive, as are the left, right,
	 * start, and end properties.
	 */
	export type ExtendedScrollToOptions = _XAxis & _YAxis & ScrollOptions;
	export class $milkywaystd_scroll_Scrollable {
		protected readonly _destroyed: $milkywaystd_classes_stream<boolean> =
			$milkywaystd_classes_stream(true);

		// taleUntil this._destroyed
		protected _elementScrolled: $milkywaystd_classes_stream<Event> | null = null;

		_elementRef: Element;
		destructor() {
			//this._elementRef.removeEventListener('scroll',this.scrolled);
		}

		scrollDispatcher: $milkywaystd_scroll_ScrollDispatcher;
		constructor(
			elementRef: Element,
			scrollDispatcher: $milkywaystd_scroll_ScrollDispatcher,
			dirr?: any
		) {
			this._elementRef = elementRef;
			this.scrollDispatcher = scrollDispatcher;
		}

		/** Gets the ElementRef for the viewport. */
		getElementRef(): Element {
			return this._elementRef;
		}
		deinit() {
			this.scrollDispatcher.deregister(this);
			this._destroyed(false);
		}

		Init() {
			
			this._elementScrolled = $milkywaystd_classes_StreamClass.fromEvent(
				this._elementRef as HTMLElement,
				"scroll"
			);
			this.scrollDispatcher.register(this);
		}
		/** Returns observable that emits when a scroll event is fired on the host element. */

		elementScrolled(): $milkywaystd_classes_stream<Event>|null {
			return this._elementScrolled;
		}

		/** Gets the ElementRef for the viewport. */
		get_elementRef() {
			return this._elementRef;
		}

		/**
		 * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
		 * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
		 * left and right always refer to the left and right side of the scrolling container irrespective
		 * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
		 * in an RTL context.
		 * @param options specified the offsets to scroll to.
		 */
		dir = null;
		scrollTo(options: ExtendedScrollToOptions): void {
			const el = this._elementRef;
			const isRtl = this.dir && this.dir.value == "rtl";

			// Rewrite start & end offsets as right or left offsets.
			if (options.left == null) {
				options.left = isRtl ? options.end : options.start;
			}

			if (options.right == null) {
				options.right = isRtl ? options.start : options.end;
			}

			// Rewrite the bottom offset as a top offset.
			if (options.bottom != null) {
				(options as _Without<_Bottom> & _Top).top =
					el.scrollHeight - el.clientHeight - options.bottom;
			}

			// Rewrite the right offset as a left offset.
			if (isRtl && getRtlScrollAxisType() != RtlScrollAxisType.NORMAL) {
				if (options.left != null) {
					(options as _Without<_Left> & _Right).right =
						el.scrollWidth - el.clientWidth - options.left;
				}

				if (getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
					options.left = options.right;
				} else if (
					getRtlScrollAxisType() == RtlScrollAxisType.NEGATED
				) {
					options.left = options.right
						? -options.right
						: options.right;
				}
			} else {
				if (options.right != null) {
					(options as _Without<_Right> & _Left).left =
						el.scrollWidth - el.clientWidth - options.right;
				}
			}

			this._applyScrollToOptions(options);
		}

		private _applyScrollToOptions(options: ScrollToOptions): void {
			const el = this._elementRef;

			if (supportsScrollBehavior()) {
				el.scrollTo(options);
			} else {
				if (options.top != null) {
					el.scrollTop = options.top;
				}
				if (options.left != null) {
					el.scrollLeft = options.left;
				}
			}
		}

		/**
		 * Measures the scroll offset relative to the specified edge of the viewport. This method can be
		 * used instead of directly checking scrollLeft or scrollTop, since browsers are not consistent
		 * about what scrollLeft means in RTL. The values returned by this method are normalized such that
		 * left and right always refer to the left and right side of the scrolling container irrespective
		 * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
		 * in an RTL context.
		 * @param from The edge to measure from.
		 */
		measureScrollOffset(
			from: "top" | "left" | "right" | "bottom" | "start" | "end"
		): number {
			const LEFT = "left";
			const RIGHT = "right";
			const el = this._elementRef;
			if (from == "top") {
				return el.scrollTop;
			}
			if (from == "bottom") {
				return el.scrollHeight - el.clientHeight - el.scrollTop;
			}

			// Rewrite start & end as left or right offsets.
			const isRtl = this.dir && this.dir.value == "rtl";
			if (from == "start") {
				from = isRtl ? RIGHT : LEFT;
			} else if (from == "end") {
				from = isRtl ? LEFT : RIGHT;
			}

			if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
				// For INVERTED, scrollLeft is (scrollWidth - clientWidth) when scrolled all the way left and
				// 0 when scrolled all the way right.
				if (from == LEFT) {
					return el.scrollWidth - el.clientWidth - el.scrollLeft;
				} else {
					return el.scrollLeft;
				}
			} else if (
				isRtl &&
				getRtlScrollAxisType() == RtlScrollAxisType.NEGATED
			) {
				// For NEGATED, scrollLeft is -(scrollWidth - clientWidth) when scrolled all the way left and
				// 0 when scrolled all the way right.
				if (from == LEFT) {
					return el.scrollLeft + el.scrollWidth - el.clientWidth;
				} else {
					return -el.scrollLeft;
				}
			} else {
				// For NORMAL, as well as non-RTL contexts, scrollLeft is 0 when scrolled all the way left and
				// (scrollWidth - clientWidth) when scrolled all the way right.
				if (from == LEFT) {
					return el.scrollLeft;
				} else {
					return el.scrollWidth - el.clientWidth - el.scrollLeft;
				}
			}
		}
	}
	/**
	 * @license
	 * Copyright Google LLC All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */

	/** The possible ways the browser may handle the horizontal scroll axis in RTL languages. */
	export const enum RtlScrollAxisType {
		/**
		 * scrollLeft is 0 when scrolled all the way left and (scrollWidth - clientWidth) when scrolled
		 * all the way right.
		 */
		NORMAL,
		/**
		 * scrollLeft is -(scrollWidth - clientWidth) when scrolled all the way left and 0 when scrolled
		 * all the way right.
		 */
		NEGATED,
		/**
		 * scrollLeft is (scrollWidth - clientWidth) when scrolled all the way left and 0 when scrolled
		 * all the way right.
		 */
		INVERTED,
	}

	/** Cached result of the way the browser handles the horizontal scroll axis in RTL mode. */
	let rtlScrollAxisType: RtlScrollAxisType | undefined;

	/** Cached result of the check that indicates whether the browser supports scroll behaviors. */
	let scrollBehaviorSupported: boolean | undefined;

	/** Check whether the browser supports scroll behaviors. */
	export function supportsScrollBehavior(): boolean {
		if (scrollBehaviorSupported == null) {
			// If we're not in the browser, it can't be supported. Also check for `Element`, because
			// some projects stub out the global `document` during SSR which can throw us off.
			if (
				typeof document !== "object" ||
				!document ||
				typeof Element !== "function" ||
				!Element
			) {
				scrollBehaviorSupported = false;
				return scrollBehaviorSupported;
			}

			// If the element can have a `scrollBehavior` style, we can be sure that it's supported.
			if ("scrollBehavior" in document.documentElement!.style) {
				scrollBehaviorSupported = true;
			} else {
				// At this point we have 3 possibilities: `scrollTo` isn't supported at all, it's
				// supported but it doesn't handle scroll behavior, or it has been polyfilled.
				const scrollToFunction: Function | undefined =
					Element.prototype.scrollTo;

				if (scrollToFunction) {
					// We can detect if the function has been polyfilled by calling `toString` on it. Native
					// functions are obfuscated using `[native code]`, whereas if it was overwritten we'd get
					// the actual function source. Via https://davidwalsh.name/detect-native-function. Consider
					// polyfilled functions as supporting scroll behavior.
					scrollBehaviorSupported = !/\{\s*\[native code\]\s*\}/.test(
						scrollToFunction.toString()
					);
				} else {
					scrollBehaviorSupported = false;
				}
			}
		}

		return scrollBehaviorSupported;
	}

	/**
	 * Checks the type of RTL scroll axis used by this browser. As of time of writing, Chrome is NORMAL,
	 * Firefox & Safari are NEGATED, and IE & Edge are INVERTED.
	 */
	export function getRtlScrollAxisType(): RtlScrollAxisType {
		// We can't check unless we're on the browser. Just assume 'normal' if we're not.
		if (typeof document !== "object" || !document) {
			return RtlScrollAxisType.NORMAL;
		}

		if (rtlScrollAxisType == null) {
			// Create a 1px wide scrolling container and a 2px wide content element.
			const scrollContainer = document.createElement("div");
			const containerStyle = scrollContainer.style;
			scrollContainer.dir = "rtl";
			containerStyle.width = "1px";
			containerStyle.overflow = "auto";
			containerStyle.visibility = "hidden";
			containerStyle.pointerEvents = "none";
			containerStyle.position = "absolute";

			const content = document.createElement("div");
			const contentStyle = content.style;
			contentStyle.width = "2px";
			contentStyle.height = "1px";

			scrollContainer.appendChild(content);
			document.body.appendChild(scrollContainer);

			rtlScrollAxisType = RtlScrollAxisType.NORMAL;

			// The viewport starts scrolled all the way to the right in RTL mode. If we are in a NORMAL
			// browser this would mean that the scrollLeft should be 1. If it's zero instead we know we're
			// dealing with one of the other two types of browsers.
			if (scrollContainer.scrollLeft === 0) {
				// In a NEGATED browser the scrollLeft is always somewhere in [-maxScrollAmount, 0]. For an
				// INVERTED browser it is always somewhere in [0, maxScrollAmount]. We can determine which by
				// setting to the scrollLeft to 1. This is past the max for a NEGATED browser, so it will
				// return 0 when we read it again.
				scrollContainer.scrollLeft = 1;
				rtlScrollAxisType =
					scrollContainer.scrollLeft === 0
						? RtlScrollAxisType.NEGATED
						: RtlScrollAxisType.INVERTED;
			}

			scrollContainer.remove();
		}
		return rtlScrollAxisType;
	}
}
