namespace $ {
	/**
	 * Репозиторий поверх REST API.
	 * Конфигурация: uri + resource, заголовки,
	 * query из реактивного состояния (filters/sort/пагинация) и transform-хуки.
	 */
	export class $mws_data_repo_rest<T extends Record<string, any>> extends $mws_data_repo<T> {

		/**
		 * Базовый адрес API (apiUrl)
		 */
		@$mol_mem
		uri(next?: string): string {
			return next ?? ''
		}

		/**
		 * Ресурс/коллекция (apiResource)
		 */
		@$mol_mem
		resource(next?: string): string {
			return next ?? ''
		}

		/**
		 * Заголовки запроса
		 */
		@$mol_mem
		headers(next?: Record<string, string>): Record<string, string> {
			return next ?? { 'Content-Type': 'application/json' }
		}

		/**
		 * Параметры query из реактивного состояния базы
		 */
		@$mol_mem
		query(): Record<string, string> {
			const params: Record<string, string> = {}

			const filters = this.filters()
			for( const key in filters ) {
				const value = filters[ key ]
				if( value !== undefined && value !== null && value !== '' ) {
					params[ key ] = String( value )
				}
			}

			const sort = this.sort()
			if( sort ) {
				params.sort = sort.field
				params.order = sort.order
			}

			params.offset = String( this.offset() )
			params.limit = String( this.limit() )

			return params
		}

		/**
		 * Базовый URL ресурса
		 */
		@$mol_mem
		url(): string {
			const base = this.uri().replace( /\/+$/, '' )
			const res = this.resource().replace( /^\/+|\/+$/g, '' )
			return `${ base }/${ res }`
		}

		/**
		 * URL списка с query-параметрами
		 */
		@$mol_mem
		url_list(): string {
			const qs = new URLSearchParams( this.query() ).toString()
			return qs ? `${ this.url() }?${ qs }` : this.url()
		}

		/**
		 * URL одного элемента
		 */
		@$mol_mem_key
		url_one(id: string | number): string {
			return `${ this.url() }/${ id }`
		}

		/**
		 * Разбор ответа списка
		 */
		list_unpack(data: any): readonly T[] {
			return data as readonly T[]
		}

		/**
		 * Разбор метаданных списка
		 */
		meta_unpack(data: any): $mws_data_repo_meta {
			return data as $mws_data_repo_meta
		}

		/**
		 * Разбор ответа одного элемента
		 */
		one_unpack(data: any): T {
			return data as T
		}

		/**
		 * Подготовка тела для создания
		 */
		pack_create(data: Partial<T>): unknown {
			return data
		}

		/**
		 * Подготовка тела для обновления.
		 * По умолчанию исключает ключ идентификатора — id уже передаётся в URL.
		 */
		pack_update(data: Partial<T>): unknown {
			const { [this.id_key()]: _id, ...rest } = data as Record<string, any>
			return rest
		}

		/**
		 * GET списка как действие (не @$mol_mem): мемоизированная обёртка над fetch
		 * стала бы общим узлом графа и её резолв перезапускал бы подписчиков.
		 * Сам HTTP-запрос дедуплицируется $mol_fetch по URL.
		 */
		@$mol_action
		fetch_list(): any {
			return this.$.$mol_fetch.json( this.url_list(), {
				method: 'GET',
				headers: this.headers() as HeadersInit,
			} )
		}

		/**
		 * GET одного элемента как действие (не @$mol_mem): иначе резолв запроса
		 * перезапустил бы читателей item()/entity.data() и мог затереть черновик формы.
		 */
		@$mol_action
		fetch_one(id: string | number): any {
			return this.$.$mol_fetch.json( this.url_one(id), {
				method: 'GET',
				headers: this.headers() as HeadersInit,
			} )
		}

		@$mol_action
		override list_fn(): readonly T[] {
			const response = this.fetch_list()
			this.list_meta(this.meta_unpack(response))
			return this.list_unpack( response )
		}

		

		@$mol_action
		override one_fn(id: string | number): T {
			return this.one_unpack( this.fetch_one(id) )
		}

		@$mol_action
		override create_fn(data: Partial<T>): T {
			const response = this.$.$mol_fetch.json( this.url(), {
				method: 'POST',
				body: JSON.stringify( this.pack_create( data ) ),
				headers: this.headers() as HeadersInit,
			} )
			return this.one_unpack( response )
		}

		@$mol_action
		override update_fn(id: string | number, data: Partial<T>): T {
			const response = this.$.$mol_fetch.json( this.url_one(id), {
				method: 'PATCH',
				body: JSON.stringify( this.pack_update( data ) ),
				headers: this.headers() as HeadersInit,
			} )
			return this.one_unpack( response )
		}

		@$mol_action
		override remove_fn(id: string | number) {
			this.$.$mol_fetch.json( this.url_one(id), {
				method: 'DELETE',
				headers: this.headers() as HeadersInit,
			} )
			return id
		}
	}
}
