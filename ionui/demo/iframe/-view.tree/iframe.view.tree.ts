namespace $ {
	export class $milkywaystd_ionui_demo_iframe extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Ionic example
		 * ```
		 */
		title() {
			return "Ionic example"
		}
		
		/**
		 * ```tree
		 * sub / <= iframe
		 * ```
		 */
		sub() {
			return [
				this.iframe()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags / \ionic
		 * ```
		 */
		tags() {
			return [
				"ionic"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * iframe $milkywaystd_ui_iframe
		 * 	style *
		 * 		height \100%
		 * 		width \100%
		 * 	attr * src \https://reatailret.github.io/milkywaystd_mol/ionui/demo/-/index.html
		 * ```
		 */
		@ $mol_mem
		iframe() {
			const obj = new this.$.$milkywaystd_ui_iframe()
			
			obj.style = () => ({
				height: "100%",
				width: "100%"
			} as Record< string, any >)
			obj.attr = () => ({
				src: "https://reatailret.github.io/milkywaystd_mol/ionui/demo/-/index.html"
			} as Record< string, any >)
			
			return obj
		}
	}
	
}

