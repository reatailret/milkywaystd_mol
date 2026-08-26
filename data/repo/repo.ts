namespace $ {
	
	/**
	 * Метаданные списка
	 */
	export type $mws_data_repo_meta = {
		total?: number
		offset?: number
		limit?: number
	}
	
	export abstract class $mws_data_repo<T extends Record<string, any>> extends $mol_object {

		version = Date.now()
		/**
		 * Ключ идентификатора
		 */
		@$mol_mem
		id_key(next?: string): string {
			return next ?? 'id'
		}

		/**
		 * Получить ID элемента
		 */
		item_id(item: T): string | number {
			return (item as any)[this.id_key()]
		}

		/**
		 * Параметры запроса (фильтры, пагинация)
		 */
		@$mol_mem
		filters(next?: Record<string, any>): Record<string, any> {
			return next ?? {}
		}

		@$mol_mem
		sort(next?: { field: string, order: 'asc' | 'desc' } | null): { field: string, order: 'asc' | 'desc' } | null {
			return next ?? null
		}

		@$mol_mem
		offset(next?: number): number {
			return next ?? 0
		}

		@$mol_mem
		limit(next?: number): number {
			return next ?? 10
		}

		/**
		 * Версия списка для инвалидации
		 */
		@$mol_mem
		list_version(next?: number): number {
			return next ?? 0
		}

		/**
		 * Перезагрузить список
		 */
		@$mol_action
		list_reload() {
			this.list_version(this.list_version() + 1)
		}

		/**
		 * Версия элемента для инвалидации
		 */
		@$mol_mem_key
		item_version(id: string | number, next?: number): number {
			return next ?? 0
		}

		/**
		 * Перезагрузить элемент
		 */
		@$mol_action
		item_reload(id: string | number) {
			this.item_version(id, this.item_version(id) + 1)
		}

		
		@$mol_action
		list_fn(): readonly T[] {
			return []
		}

		/**
		 * Метаданные списка 
		 */
		@$mol_mem
		list_meta(next?: $mws_data_repo_meta): $mws_data_repo_meta {
			return next ?? {
				total: 0,
				offset: 0,
				limit: 0
			}
		}

		/**
		 * Получить один элемент по ID 
		 */
		@$mol_action
		one_fn(id: string | number): T {
			$mol_fail(new Error('Not implemented: override one() in repo_memory or repo_rest'))
		}

		/**
		 * Получить элемент по ID (сначала из списка, иначе one)
		 */
		@$mol_mem_key
		item(id: string | number, next?: T): T {
			this.item_version(id)

			if(next !== undefined) {
				return next
			}
			

			return this.one_fn(id)
		}

		/**
		 * Идёт ли загрузка списка (выводится из suspend)
		 */
		@$mol_mem
		list_pending(): boolean {
			try {
				this.list()
				return false
			} catch( error ) {
				if( $mol_promise_like( error ) ) return true
				return false
			}
		}

		/**
		 * Идёт ли загрузка элемента (выводится из suspend)
		 */
		@$mol_mem_key
		item_pending(id: string | number): boolean {
			try {
				this.item(id)
				return false
			} catch( error ) {
				if( $mol_promise_like( error ) ) return true
				return false
			}
		}

		
		/**
		 * Получить список элементов (в порядке источника)
		 */
		@$mol_mem
		list(): readonly T[] {
			const keys = this.dataKeys()
			return Object.keys(this.dataKeys())
				.map( id => keys[ id ] )
				.filter( item => item !== undefined )
		}
		@$mol_mem
		dataKeys(next?: Record<string, T>): Record<string, T>
		{
			console.log('dataKeys', next)
			$mol_wire_solid()
			this.list_version()
			this.filters()
			this.sort()
			this.offset()
			this.limit()
			if(next !== undefined) {
				return next
			}
			const data = this.list_fn()
			const obj : Record<string, any> = {}
			for( const iterator of data )
			{
				obj[ `${ (iterator as any)[ this.id_key() ] }` ] = iterator
			}
			return obj
		}
		@$mol_action
		update(id: string | number, data: Partial<T>): T {
			const item = this.update_fn(id, data)
			const obj = this.dataKeys()
			if(obj[`${id}`]) {
				const mut = $mol_mutable(obj)
				mut[`${id}`](next => ({...next, ...item}))
				this.dataKeys(mut() as Record<string, T>)
			}
			return this.item(id, item)
		}
		@$mol_action
		update_fn(id: string | number, data: Partial<T>): T {
			return {} as T
		}
		/**
		 * Создать элемент (переопределяется в repo_memory/repo_rest)
		 */
		@$mol_action
		create(data: Partial<T>): T {
			const item = this.create_fn(data)
			return this.item(this.item_id(item), item)
		}
		@$mol_action
		create_fn(data: Partial<T>): T {
			return {} as T
		}

		
		

		
		/**
		 * Удалить элемент (переопределяется в repo_memory/repo_rest)
		 */
		@$mol_action
		remove(id: string | number) {
			const result = this.remove_fn(id)
			const obj = { ...this.dataKeys() }
			delete obj[`${id}`]
			this.dataKeys(obj)
			console.log('remove', obj)
			return result
		}
		@$mol_action
		remove_fn(id: string | number) {
			return id
		}

		

		/**
		 * Установить пагинацию
		 */
		@$mol_mem
		pagination(next?: { offset: number, limit: number }): { offset: number, limit: number } {
			return next ?? { offset: 0, limit: 10 }
		}

		@$mol_mem_key
		entity(id?: string | number) {
			const entity = this.entity_factory()
			entity.repo(this)
			entity.id(id)
			return entity
		}

		new_entity() {
			const entity = this.entity_factory()
			entity.repo(this)
			return entity
		}
		
		entity_factory(): $mws_data_entity<T> {
			return null!
		}
	}
}

