namespace $ {
	export class $milkywaystd_app_demo extends $mol_app_demo {
		
		/**
		 * ```tree
		 * Menu <= milkywaystd_app_demo_menu_factory
		 * ```
		 */
		Menu() {
			return this.milkywaystd_app_demo_menu_factory()
		}
		
		/**
		 * ```tree
		 * menu_items /any
		 * 	<= p1
		 * 	<= p2
		 * 	<= p3
		 * ```
		 */
		menu_items() {
			return [
				this.p1(),
				this.p2(),
				this.p3()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * milkywaystd_app_demo_menu_factory null
		 * ```
		 */
		milkywaystd_app_demo_menu_factory() {
			return null as any
		}
		
		/**
		 * ```tree
		 * p1 *
		 * 	label \Misc
		 * 	tags / \crud
		 * ```
		 */
		p1() {
			return {
				label: "Misc",
				tags: [
					"crud"
				] as readonly any[]
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * p2 *
		 * 	label \Ui
		 * 	tags /
		 * 		\scroll
		 * 		\menu
		 * ```
		 */
		p2() {
			return {
				label: "Ui",
				tags: [
					"scroll",
					"menu"
				] as readonly any[]
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * p3 *
		 * 	label \Ionic
		 * 	tags / \ionic
		 * ```
		 */
		p3() {
			return {
				label: "Ionic",
				tags: [
					"ionic"
				] as readonly any[]
			} as Record< string, any >
		}
	}
	
	export class $milkywaystd_app_demo_menu_tree extends $mol_app_demo_menu {
		
		/**
		 * ```tree
		 * title \$milkywaystd examples
		 * ```
		 */
		title() {
			return "$milkywaystd examples"
		}
		
		/**
		 * ```tree
		 * Body $mol_scroll sub /
		 * 	<= List
		 * 	<= menu
		 * ```
		 */
		@ $mol_mem
		Body() {
			const obj = new this.$.$mol_scroll()
			
			obj.sub = () => [
				this.List(),
				this.menu()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * filter?val \
		 * ```
		 */
		@ $mol_mem
		filter(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Filter $mol_search query?val <=> filter?val
		 * ```
		 */
		@ $mol_mem
		Filter() {
			const obj = new this.$.$mol_search()
			
			obj.query = (val?: any) => this.filter(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * List $mol_list rows / <= Filter
		 * ```
		 */
		@ $mol_mem
		List() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Filter()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * tree_menu_items /
		 * ```
		 */
		tree_menu_items() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * menu $milkywaystd_ui_treemenu
		 * 	items <= tree_menu_items
		 * 	filter <= filter
		 * ```
		 */
		@ $mol_mem
		menu() {
			const obj = new this.$.$milkywaystd_ui_treemenu()
			
			obj.items = () => this.tree_menu_items()
			obj.filter = () => this.filter()
			
			return obj
		}
	}
	
}

