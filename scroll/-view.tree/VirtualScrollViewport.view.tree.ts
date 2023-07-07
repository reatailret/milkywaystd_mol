namespace $ {
	export class $milkywaystd_scroll_VirtualScrollViewport extends $mol_view {
		
		/**
		 * ```tree
		 * pre_sub /
		 * ```
		 */
		pre_sub() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * post_sub /
		 * ```
		 */
		post_sub() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= getForOf
		 * 	<= spacer
		 * ```
		 */
		sub() {
			return [
				this.getForOf(),
				this.spacer()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * getForOf null
		 * ```
		 */
		getForOf() {
			return null as any
		}
		
		/**
		 * ```tree
		 * totalContentWidth 0
		 * ```
		 */
		totalContentWidth() {
			return 0
		}
		
		/**
		 * ```tree
		 * totalContentHeight 0
		 * ```
		 */
		totalContentHeight() {
			return 0
		}
		
		/**
		 * ```tree
		 * spacer $milkywaystd_scroll_VirtualScrollSpacer style *
		 * 	width <= totalContentWidth
		 * 	height <= totalContentHeight
		 * ```
		 */
		@ $mol_mem
		spacer() {
			const obj = new this.$.$milkywaystd_scroll_VirtualScrollSpacer()
			
			obj.style = () => ({
				width: this.totalContentWidth(),
				height: this.totalContentHeight()
			} as Record< string, any >)
			
			return obj
		}
	}
	
}

