namespace $ {
	export class $milkywaystd_crud_demo_products extends $mol_book2 {
		
		/**
		 * ```tree
		 * tablepage $milkywaystd_crud_demo_products_tablepage editCallback?val <=> editCallback?val
		 * ```
		 */
		@ $mol_mem
		tablepage() {
			const obj = new this.$.$milkywaystd_crud_demo_products_tablepage()
			
			obj.editCallback = (val?: any) => this.editCallback(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * editpage <= form_factory
		 * ```
		 */
		editpage() {
			return this.form_factory()
		}
		
		/**
		 * ```tree
		 * pages <= pages_visible
		 * ```
		 */
		pages() {
			return this.pages_visible()
		}
		
		/**
		 * ```tree
		 * param \
		 * ```
		 */
		param() {
			return ""
		}
		
		/**
		 * ```tree
		 * menu_title \
		 * ```
		 */
		menu_title() {
			return ""
		}
		
		/**
		 * ```tree
		 * editCallback?val null
		 * ```
		 */
		@ $mol_mem
		editCallback(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * form_factory null
		 * ```
		 */
		form_factory() {
			return null as any
		}
		
		/**
		 * ```tree
		 * pages_visible /
		 * ```
		 */
		pages_visible() {
			return [
			] as readonly any[]
		}
	}
	
}

