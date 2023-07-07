namespace $ {
	export class $milkywaystd_crud_demo_products2_editform extends $mol_page {
		
		/**
		 * ```tree
		 * tools / <= Button_tools
		 * ```
		 */
		tools() {
			return [
				this.Button_tools()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * body /
		 * 	<= uiblocker
		 * 	<= EditForm
		 * 	<= Result
		 * ```
		 */
		body() {
			return [
				this.uiblocker(),
				this.EditForm(),
				this.Result()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * foot /
		 * ```
		 */
		foot() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * message *
		 * 	required \Обязательно для заполнения
		 * 	positive \Цена должна быть больше 0
		 * ```
		 */
		message() {
			return {
				required: "Обязательно для заполнения",
				positive: "Цена должна быть больше 0"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * closepage?val null
		 * ```
		 */
		@ $mol_mem
		closepage(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Button_tools $mol_button_minor
		 * 	title \Закрыть
		 * 	event_activate?val <=> closepage?val
		 * ```
		 */
		@ $mol_mem
		Button_tools() {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => "Закрыть"
			obj.event_activate = (val?: any) => this.closepage(val)
			
			return obj
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
		 * name_label \Название
		 * ```
		 */
		name_label() {
			return "Название"
		}
		
		/**
		 * ```tree
		 * name_bid \
		 * ```
		 */
		name_bid() {
			return ""
		}
		
		/**
		 * ```tree
		 * draft*title?val \
		 * ```
		 */
		@ $mol_mem_key
		draft(id: any, val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Name_control $mol_string value?val <=> draft*title?val
		 * ```
		 */
		@ $mol_mem
		Name_control() {
			const obj = new this.$.$mol_string()
			
			obj.value = (val?: any) => this.draft("title", val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Name_field $mol_form_field
		 * 	name <= name_label
		 * 	bid <= name_bid
		 * 	control <= Name_control
		 * ```
		 */
		@ $mol_mem
		Name_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => this.name_label()
			obj.bid = () => this.name_bid()
			obj.control = () => this.Name_control()
			
			return obj
		}
		
		/**
		 * ```tree
		 * price_label \Цена
		 * ```
		 */
		price_label() {
			return "Цена"
		}
		
		/**
		 * ```tree
		 * price_bid \
		 * ```
		 */
		price_bid() {
			return ""
		}
		
		/**
		 * ```tree
		 * draftNum*price?val 0
		 * ```
		 */
		@ $mol_mem_key
		draftNum(id: any, val?: any) {
			if ( val !== undefined ) return val as never
			return 0
		}
		
		/**
		 * ```tree
		 * Price_control $mol_number
		 * 	value?val <=> draftNum*price?val
		 * 	precision_view 0.01
		 * ```
		 */
		@ $mol_mem
		Price_control() {
			const obj = new this.$.$mol_number()
			
			obj.value = (val?: any) => this.draftNum("price", val)
			obj.precision_view = () => 0.01
			
			return obj
		}
		
		/**
		 * ```tree
		 * Price_field $mol_form_field
		 * 	name <= price_label
		 * 	bid <= price_bid
		 * 	control <= Price_control
		 * ```
		 */
		@ $mol_mem
		Price_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => this.price_label()
			obj.bid = () => this.price_bid()
			obj.control = () => this.Price_control()
			
			return obj
		}
		
		/**
		 * ```tree
		 * login_submit_label \Сохранить
		 * ```
		 */
		login_submit_label() {
			return "Сохранить"
		}
		
		/**
		 * ```tree
		 * event_submit? null
		 * ```
		 */
		@ $mol_mem
		event_submit(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Save_submit $mol_button_major
		 * 	title <= login_submit_label
		 * 	click? <=> event_submit?
		 * 	enabled <= submit_allowed
		 * ```
		 */
		@ $mol_mem
		Save_submit() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => this.login_submit_label()
			obj.click = (next?: any) => this.event_submit(next)
			obj.enabled = () => this.submit_allowed()
			
			return obj
		}
		
		/**
		 * ```tree
		 * submit_allowed
		 * ```
		 */
		submit_allowed() {
			return this.EditForm().submit_allowed()
		}
		
		/**
		 * ```tree
		 * EditForm $mol_form
		 * 	submit_allowed => submit_allowed
		 * 	submit? <=> event_submit?
		 * 	form_fields /
		 * 		<= Name_field
		 * 		<= Price_field
		 * 	buttons / <= Save_submit
		 * ```
		 */
		@ $mol_mem
		EditForm() {
			const obj = new this.$.$mol_form()
			
			obj.submit = (next?: any) => this.event_submit(next)
			obj.form_fields = () => [
				this.Name_field(),
				this.Price_field()
			] as readonly any[]
			obj.buttons = () => [
				this.Save_submit()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * status?val null
		 * ```
		 */
		@ $mol_mem
		status(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Result $mol_status message <= status?val
		 * ```
		 */
		@ $mol_mem
		Result() {
			const obj = new this.$.$mol_status()
			
			obj.message = () => this.status()
			
			return obj
		}
	}
	
}

