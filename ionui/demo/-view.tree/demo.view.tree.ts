namespace $ {
	export class $milkywaystd_ionui_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Ionic implementation
		 * ```
		 */
		title() {
			return "Ionic implementation"
		}
		
		/**
		 * ```tree
		 * sub / <= View
		 * ```
		 */
		sub() {
			return [
				this.View()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * View $milkywaystd_ionui_demo_route
		 * ```
		 */
		@ $mol_mem
		View() {
			const obj = new this.$.$milkywaystd_ionui_demo_route()
			
			return obj
		}
	}
	
}

