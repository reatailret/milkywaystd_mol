namespace $ {
	export class $milkywaystd_crud_demo_products_tablepage extends $mol_page {
		
		/**
		 * ```tree
		 * title \CRUD example
		 * ```
		 */
		title() {
			return "CRUD example"
		}
		
		/**
		 * ```tree
		 * body / <= Rows
		 * ```
		 */
		body() {
			return [
				this.Rows()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * foot / <= frow
		 * ```
		 */
		foot() {
			return [
				this.frow()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * item* null
		 * ```
		 */
		item(id: any) {
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
		 * Row*0 $milkywaystd_crud_demo_products_productrow
		 * 	data <= item*
		 * 	editCallback?val <=> editCallback?val
		 * 	deleteCallback?val <=> deleteCallback?val
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$milkywaystd_crud_demo_products_productrow()
			
			obj.data = () => this.item(id)
			obj.editCallback = (val?: any) => this.editCallback(val)
			obj.deleteCallback = (val?: any) => this.deleteCallback(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * rows / <= Row*0
		 * ```
		 */
		rows() {
			return [
				this.Row("0")
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Rows $mol_list rows <= rows
		 * ```
		 */
		@ $mol_mem
		Rows() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.rows()
			
			return obj
		}
		
		/**
		 * ```tree
		 * page?val 5
		 * ```
		 */
		@ $mol_mem
		page(val?: any) {
			if ( val !== undefined ) return val as never
			return 5
		}
		
		/**
		 * ```tree
		 * paginator $mol_paginator value?val <=> page?val
		 * ```
		 */
		@ $mol_mem
		paginator() {
			const obj = new this.$.$mol_paginator()
			
			obj.value = (val?: any) => this.page(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * page_labeler $mol_labeler
		 * 	title \Страница
		 * 	Content <= paginator
		 * ```
		 */
		@ $mol_mem
		page_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Страница"
			obj.Content = () => this.paginator()
			
			return obj
		}
		
		/**
		 * ```tree
		 * per_page?val \5
		 * ```
		 */
		@ $mol_mem
		per_page(val?: any) {
			if ( val !== undefined ) return val as never
			return "5"
		}
		
		/**
		 * ```tree
		 * perPageSelector $mol_select
		 * 	value?val <=> per_page?val
		 * 	hint \Количество записей на страницу
		 * 	dictionary *
		 * 		5 \5
		 * 		10 \10
		 * 		15 \15
		 * ```
		 */
		@ $mol_mem
		perPageSelector() {
			const obj = new this.$.$mol_select()
			
			obj.value = (val?: any) => this.per_page(val)
			obj.hint = () => "Количество записей на страницу"
			obj.dictionary = () => ({
				5: "5",
				10: "10",
				15: "15"
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * PRP_labeler $mol_labeler
		 * 	title \Записей на страницу
		 * 	Content <= perPageSelector
		 * ```
		 */
		@ $mol_mem
		PRP_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Записей на страницу"
			obj.Content = () => this.perPageSelector()
			
			return obj
		}
		
		/**
		 * ```tree
		 * totalItems \
		 * ```
		 */
		totalItems() {
			return ""
		}
		
		/**
		 * ```tree
		 * View2 $mol_text text <= totalItems
		 * ```
		 */
		@ $mol_mem
		View2() {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.totalItems()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Total_labeler $mol_labeler
		 * 	title \Всего записей
		 * 	Content <= View2
		 * ```
		 */
		@ $mol_mem
		Total_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Всего записей"
			obj.Content = () => this.View2()
			
			return obj
		}
		
		/**
		 * ```tree
		 * refresh? null
		 * ```
		 */
		@ $mol_mem
		refresh(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * View3 $mol_button_minor
		 * 	title \Обновить
		 * 	click? <=> refresh?
		 * ```
		 */
		@ $mol_mem
		View3() {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => "Обновить"
			obj.click = (next?: any) => this.refresh(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * refresh_labeler $mol_labeler
		 * 	title \
		 * 	Content <= View3
		 * ```
		 */
		@ $mol_mem
		refresh_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => ""
			obj.Content = () => this.View3()
			
			return obj
		}
		
		/**
		 * ```tree
		 * goToCreateNew? null
		 * ```
		 */
		@ $mol_mem
		goToCreateNew(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * View4 $mol_button_major
		 * 	title \Создать
		 * 	click? <=> goToCreateNew?
		 * ```
		 */
		@ $mol_mem
		View4() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => "Создать"
			obj.click = (next?: any) => this.goToCreateNew(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * create_labeler $mol_labeler
		 * 	title \
		 * 	Content <= View4
		 * ```
		 */
		@ $mol_mem
		create_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => ""
			obj.Content = () => this.View4()
			
			return obj
		}
		
		/**
		 * ```tree
		 * uiblocker \
		 * ```
		 */
		uiblocker() {
			return ""
		}
		
		/**
		 * ```tree
		 * frow $mol_row sub /
		 * 	<= page_labeler
		 * 	<= PRP_labeler
		 * 	<= Total_labeler
		 * 	<= refresh_labeler
		 * 	<= create_labeler
		 * 	<= uiblocker
		 * ```
		 */
		@ $mol_mem
		frow() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.page_labeler(),
				this.PRP_labeler(),
				this.Total_labeler(),
				this.refresh_labeler(),
				this.create_labeler(),
				this.uiblocker()
			] as readonly any[]
			
			return obj
		}
	}
	
}

