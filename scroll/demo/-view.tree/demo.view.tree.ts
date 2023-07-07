namespace $ {
	export class $milkywaystd_scroll_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \milkywaystd_scroll - virtual scroll
		 * ```
		 */
		title() {
			return "milkywaystd_scroll - virtual scroll"
		}
		
		/**
		 * ```tree
		 * sub / <= viewPort
		 * ```
		 */
		sub() {
			return [
				this.viewPort()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags / \scroll
		 * ```
		 */
		tags() {
			return [
				"scroll"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * itemRendererFactory null
		 * ```
		 */
		itemRendererFactory() {
			return null as any
		}
		
		/**
		 * ```tree
		 * viewPort $milkywaystd_scroll_VirtualScrollViewport
		 * 	itemRendererFactory <= itemRendererFactory
		 * 	itemHeight 50
		 * 	minBufferPx 400
		 * 	maxBufferPx 800
		 * 	style * height \100%
		 * 	pre_sub /
		 * 	post_sub /
		 * ```
		 */
		@ $mol_mem
		viewPort() {
			const obj = new this.$.$milkywaystd_scroll_VirtualScrollViewport()
			
			obj.itemRendererFactory = () => this.itemRendererFactory()
			obj.itemHeight = () => 50
			obj.minBufferPx = () => 400
			obj.maxBufferPx = () => 800
			obj.style = () => ({
				height: "100%"
			} as Record< string, any >)
			obj.pre_sub = () => [
			] as readonly any[]
			obj.post_sub = () => [
			] as readonly any[]
			
			return obj
		}
	}
	
}

