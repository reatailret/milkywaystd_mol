namespace $ {
	/**
	 * Универсальный интерфейс источника данных для View.
	 * list/columns/list_meta — для отображения списка; repo() — для доступа к репо (entity, мутации).
	 */
	export interface $mws_data_source<T extends Record<string, any>> {

		list(params?: Record<string, any>): readonly T[]
		list_meta(): Record<string, any>
		columns(next?: readonly $mws_data_column_config<T>[]): readonly $mws_data_column_config<T>[]

		limit(next?: number): number
		offset(next?: number): number
		
		repo(next?: $mws_data_repo<T>): $mws_data_repo<T>
	}
	/**
	 * Поля одного элемента списка (`list()`).
	 */
	export type $mws_data_source_item<T extends Record<string, any> = Record<string, any>> =
		ReturnType<$mws_data_source<T>['list']>[number]
	/**
	 * Конфигурация колонки таблицы
	 */
	export type $mws_data_column_config<T = any> = {
		id: string
		title: string
		field?: keyof T
		width?: number
		sortable?: boolean
		filterable?: boolean
		renderer?: (id?: string) => $mws_data_renderer_cell
	}

	/**
	 * Базовые параметры для списка
	 */
	export type $mws_data_list_params = {
		offset?: number
		limit?: number
		sort?: string
		order?: 'asc' | 'desc'
		[key: string]: any
	}

	

	/**
	 * Реализация source: обёртка над repo с API для таблицы (rows, total, filters, sort, pagination).
	 * View передаётся source; для entity используется source.repo().
	 */
	export class $mws_data_source<T extends Record<string, any>> extends $mol_object {

		
		@$mol_mem
		immediate(next?: boolean): boolean {
			return next ?? false
		}
		
		@$mol_action
		apply_if_immediate() {
			if (this.immediate()) {
				this.apply_params()
			}
		}

		@$mol_mem
		repo(next?: $mws_data_repo<T>): $mws_data_repo<T> {
			return next ?? null!
		}

		@$mol_mem
		list_meta(): Record<string, any> {
			return this.repo().list_meta()
		}

		@$mol_mem
		columns(next?: readonly $mws_data_column_config<T>[]): readonly $mws_data_column_config<T>[] {
			return next ?? []
		}

		@$mol_mem
		filters(next?: Record<string, any>): Record<string, any> {
			if(next !== undefined) {
				this.apply_if_immediate()
			}
			return next ?? {}
		}

		@$mol_mem
		sort(next?: { field: string, order: 'asc' | 'desc' } | null): { field: string, order: 'asc' | 'desc' } | null {
			if(next !== undefined) {
				this.apply_if_immediate()
			}
			return next ?? null
		}

		@$mol_mem
		offset(next?: number): number {
			if(next !== undefined) {
				this.apply_if_immediate()
			}
			return next ?? 0
		}

		@$mol_mem
		limit(next?: number): number {

			if(next !== undefined) {
				this.apply_if_immediate()
			}
			return next ?? 10
		}

		@$mol_mem
		list(): readonly T[] {
			
			this.offset()
			this.limit()
			this.filters()
			this.sort()

			if (this.client_side_processing()) {
				let items = this.repo().list()
				items = this.apply_client_filters(items)
				items = this.apply_client_sort(items)
				items = this.apply_client_pagination(items)
				return items
			}
			this.apply_params()
			return this.repo().list()
		}

			
		@$mol_mem
		client_side_processing(next?: boolean): boolean {
			return next ?? false
		}

		protected apply_client_filters(items: readonly T[]): readonly T[] {
			const filters = this.filters()
			if (Object.keys(filters).length === 0) return items
			return items.filter(item => {
				for (const key in filters) {
					const value = filters[key]
					if (value === undefined || value === null || value === '') continue
					const itemValue = (item as any)[key]
					if (typeof value === 'string' && typeof itemValue === 'string') {
						if (!itemValue.toLowerCase().includes(value.toLowerCase())) return false
					} else if (itemValue !== value) return false
				}
				return true
			})
		}

		protected apply_client_sort(items: readonly T[]): readonly T[] {
			const sort = this.sort()
			if (!sort) return items
			const field = sort.field as keyof T
			const order = sort.order === 'desc' ? -1 : 1
			return [...items].sort((a, b) => {
				const aVal = a[field]
				const bVal = b[field]
				if (aVal < bVal) return -order
				if (aVal > bVal) return order
				return 0
			})
		}

		protected apply_client_pagination(items: readonly T[]): readonly T[] {
			return items.slice(this.offset(), this.offset() + this.limit())
		}

		@$mol_action
		protected apply_params() {
			this.repo().filters(this.filters())
			this.repo().sort(this.sort())
			this.repo().offset(this.offset())
			this.repo().limit(this.limit())
		}

		

		@$mol_action
		filter_set(field: string, value: any) {
			this.filters({ ...this.filters(), [field]: value })
		}

		@$mol_action
		filter_remove(field: string) {
			const filters = { ...this.filters() }
			delete filters[field]
			this.filters(filters)
		}

		@$mol_action
		filter_clear() {
			this.filters({})
		}

		@$mol_action
		sort_set(field: string, order: 'asc' | 'desc') {
			this.sort({ field, order })
		}

		@$mol_action
		sort_clear() {
			this.sort(null)
		}

		@$mol_action
		sort_toggle(field: string) {
			const current = this.sort()
			if (current?.field === field) {
				this.sort_set(field, current.order === 'asc' ? 'desc' : 'asc')
			} else {
				this.sort_set(field, 'asc')
			}
		}

		@$mol_action
		page_go(page: number) {
			this.offset(page * this.limit())
		}

		@$mol_mem
		page(): number {
			return Math.floor(this.offset() / this.limit())
		}

		@$mol_mem
		page_count(): number {
			return Math.ceil(this.total() / this.limit())
		}

		@$mol_action
		page_next() {
			if (this.page() < this.page_count() - 1) this.page_go(this.page() + 1)
		}

		@$mol_action
		page_prev() {
			if (this.page() > 0) this.page_go(this.page() - 1)
		}

		@$mol_action
		reload() {
			this.repo().list_reload()
		}

		@$mol_mem
		total(): number {
			return this.list_meta().total ?? this.list().length
		}
	}
}

