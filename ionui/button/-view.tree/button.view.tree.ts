namespace $ {
	export class $milkywaystd_ionui_button extends $milkywaystd_ionui_component {
		
		/**
		 * ```tree
		 * dom_name \ion-button
		 * ```
		 */
		dom_name() {
			return "ion-button"
		}
		
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
	}
	
}

