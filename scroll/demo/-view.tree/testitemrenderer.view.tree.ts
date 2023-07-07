namespace $ {
	export class $milkywaystd_scroll_demo_testitemrenderer extends $mol_row {
		
		/**
		 * ```tree
		 * sub / <= title
		 * ```
		 */
		sub() {
			return [
				this.title()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * minimal_height 50
		 * ```
		 */
		minimal_height() {
			return 50
		}
	}
	
}

