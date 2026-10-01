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
			this.item(id, this.one_fn(id))
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
		 * Получить элемент по ID (общий кэш класса, иначе one)
		 */
		@$mol_mem_key
		item(id: string | number, next?: T | null): T | null {
			this.item_version(id)

			const Class = this.entity_class() as typeof $mws_data_entity
			const key = String( id )

			if( next !== undefined ) return Class.item( key, next ) as T | null

			const shared = Class.item( key )
			if( shared === null ) return null
			if( shared !== undefined ) return shared as T

			return Class.item( key, this.one_fn( id ) ) as T
		}

		@$mol_action
		item_put(id: string | number, data: T | null) {
			const Class = this.entity_class() as typeof $mws_data_entity
			return Class.item( String( id ), data ) as T | null
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
			return [ ...this.dataKeys().keys() ]
				.map( id => this.item( id ) )
				.filter( ( item ): item is T => item != null )
		}
		@$mws_mem
		dataKeys(next?: $mol_wire_dict<string, T>): $mol_wire_dict<string, T>
		{
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
			const dict = new $mol_wire_dict<string, T>()
			for( const item of data ) {
				const id = String( this.item_id( item ) )
				this.item_put( id, item )
				dict.set( id, item )
			}
			return dict
		}
		@$mol_action
		update(id: string | number, data: Partial<T>): T {
			const item = this.update_fn(id, data)
			const key = String( id )
			const current = $mol_wire_probe( ()=> this.item( id ) )
			const merged = { ...current, ...item } as T
			this.item( id, merged )
			const dict = this.dataKeys()
			if( dict.has( key ) ) dict.set( key, merged )
			return merged
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
			const id = this.item_id( item )
			this.item( id, item )
			this.dataKeys().set( String( id ), item )
			return item
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
			const key = String( id )
			this.dataKeys().delete( key )
			this.item( id, null )
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

		/**
		 * Фабрика entity.
		 * entity(id) — новый экземпляр (свой draft).
		 * entity({ id, cached: true }) — синглтон Class.for(id) на все репо.
		 * Данные общие через Class.item в обоих случаях.
		 */
		@$mol_mem_key
		entity(id?: string | number | { id?: string | number, cached?: boolean }) {
			let cached = false
			let real_id = id as string | number | undefined
			if( id !== null && typeof id === 'object' ) {
				cached = id.cached === true
				real_id = id.id
			}
			if( real_id === undefined || real_id === '' ) return this.new_entity()
			if( cached ) {
				const Class = this.entity_class() as typeof $mws_data_entity
				const entity = Class.for( String( real_id ) ) as $mws_data_entity<T>
				if( !$mol_wire_probe( ()=> entity.repo() ) ) entity.repo( this )
				return entity
			}
			const entity = this.entity_factory()
			entity.repo( this )
			entity.id( real_id )
			return entity
		}

		new_entity() {
			const entity = this.entity_factory()
			entity.repo(this)
			return entity
		}

		entity_class(): new () => $mws_data_entity<T> {
			return $mws_data_entity
		}
		
		entity_factory(): $mws_data_entity<T> {
			return new ( this.entity_class() )()
		}
	}
}

