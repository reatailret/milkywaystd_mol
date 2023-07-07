namespace $ {
	export class $milkywaystd_crud_demo_products_productrow extends $mol_row {
		
		/**
		 * ```tree
		 * minimal_height 100
		 * ```
		 */
		minimal_height() {
			return 100
		}
		
		/**
		 * ```tree
		 * minimal_width 200
		 * ```
		 */
		minimal_width() {
			return 200
		}
		
		/**
		 * ```tree
		 * data null
		 * ```
		 */
		data() {
			return null as any
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
		 * deleteCallback?val null
		 * ```
		 */
		@ $mol_mem
		deleteCallback(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * ondelete?val null
		 * ```
		 */
		@ $mol_mem
		ondelete(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Id_labeler
		 * 	<= Title_labeler
		 * 	<= Price_labeler
		 * 	<= EditlButton
		 * 	<= DelButton
		 * ```
		 */
		sub() {
			return [
				this.Id_labeler(),
				this.Title_labeler(),
				this.Price_labeler(),
				this.EditlButton(),
				this.DelButton()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * row_id \
		 * ```
		 */
		row_id() {
			return ""
		}
		
		/**
		 * ```tree
		 * View $mol_text text <= row_id
		 * ```
		 */
		@ $mol_mem
		View() {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.row_id()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Id_labeler $mol_labeler
		 * 	title \ID
		 * 	Content <= View
		 * ```
		 */
		@ $mol_mem
		Id_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "ID"
			obj.Content = () => this.View()
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_name \
		 * ```
		 */
		row_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * View2 $mol_text text <= row_name
		 * ```
		 */
		@ $mol_mem
		View2() {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.row_name()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Title_labeler $mol_labeler
		 * 	title \Product Name
		 * 	Content <= View2
		 * ```
		 */
		@ $mol_mem
		Title_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Product Name"
			obj.Content = () => this.View2()
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_price \
		 * ```
		 */
		row_price() {
			return ""
		}
		
		/**
		 * ```tree
		 * View3 $mol_text text <= row_price
		 * ```
		 */
		@ $mol_mem
		View3() {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.row_price()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Price_labeler $mol_labeler
		 * 	title \Product Price
		 * 	Content <= View3
		 * ```
		 */
		@ $mol_mem
		Price_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Product Price"
			obj.Content = () => this.View3()
			
			return obj
		}
		
		/**
		 * ```tree
		 * editArg null
		 * ```
		 */
		editArg() {
			return null as any
		}
		
		/**
		 * ```tree
		 * edIcon $mol_icon_edit
		 * ```
		 */
		@ $mol_mem
		edIcon() {
			const obj = new this.$.$mol_icon_edit()
			
			return obj
		}
		
		/**
		 * ```tree
		 * edLabel \Редактировать
		 * ```
		 */
		edLabel() {
			return "Редактировать"
		}
		
		/**
		 * ```tree
		 * EditlButton $mol_link
		 * 	hint \Редактировать
		 * 	arg <= editArg
		 * 	sub /
		 * 		<= edIcon
		 * 		<= edLabel
		 * ```
		 */
		@ $mol_mem
		EditlButton() {
			const obj = new this.$.$mol_link()
			
			obj.hint = () => "Редактировать"
			obj.arg = () => this.editArg()
			obj.sub = () => [
				this.edIcon(),
				this.edLabel()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * delIcon $mol_icon_trash_can
		 * ```
		 */
		@ $mol_mem
		delIcon() {
			const obj = new this.$.$mol_icon_trash_can()
			
			return obj
		}
		
		/**
		 * ```tree
		 * delLabel \Удалить
		 * ```
		 */
		delLabel() {
			return "Удалить"
		}
		
		/**
		 * ```tree
		 * uiblocker null
		 * ```
		 */
		uiblocker() {
			return null as any
		}
		
		/**
		 * ```tree
		 * DelButton $mol_button_minor
		 * 	hint \Удалить
		 * 	hint \Удалить
		 * 	event * click? <=> ondelete?
		 * 	sub /
		 * 		<= delIcon
		 * 		<= delLabel
		 * 		<= uiblocker
		 * ```
		 */
		@ $mol_mem
		DelButton() {
			const obj = new this.$.$mol_button_minor()
			
			obj.hint = () => "Удалить"
			obj.hint = () => "Удалить"
			obj.event = () => ({
				click: (next?: any) => this.ondelete(next)
			} as Record< string, any >)
			obj.sub = () => [
				this.delIcon(),
				this.delLabel(),
				this.uiblocker()
			] as readonly any[]
			
			return obj
		}
	}
	
}

