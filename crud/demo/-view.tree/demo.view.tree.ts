namespace $ {
	export class $milkywaystd_crud_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \milkywaystd_crud lib, backend Strapi
		 * ```
		 */
		title() {
			return "milkywaystd_crud lib, backend Strapi"
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
		 * tags / \crud
		 * ```
		 */
		tags() {
			return [
				"crud"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * products $milkywaystd_crud_demo_products
		 * 	param \mol_book2_crud_demo_1
		 * 	menu_title \Classic
		 * ```
		 */
		@ $mol_mem
		products() {
			const obj = new this.$.$milkywaystd_crud_demo_products()
			
			obj.param = () => "mol_book2_crud_demo_1"
			obj.menu_title = () => "Classic"
			
			return obj
		}
		
		/**
		 * ```tree
		 * products2 $milkywaystd_crud_demo_products2
		 * 	param \mol_book2_crud_demo_2
		 * 	menu_title \Optimistic
		 * ```
		 */
		@ $mol_mem
		products2() {
			const obj = new this.$.$milkywaystd_crud_demo_products2()
			
			obj.param = () => "mol_book2_crud_demo_2"
			obj.menu_title = () => "Optimistic"
			
			return obj
		}
		
		/**
		 * ```tree
		 * View $mol_book2_catalog
		 * 	menu_title \
		 * 	spreads *
		 * 		p <= products
		 * 		p2 <= products2
		 * ```
		 */
		@ $mol_mem
		View() {
			const obj = new this.$.$mol_book2_catalog()
			
			obj.menu_title = () => ""
			obj.spreads = () => ({
				p: this.products(),
				p2: this.products2()
			} as Record< string, any >)
			
			return obj
		}
	}
	
}

