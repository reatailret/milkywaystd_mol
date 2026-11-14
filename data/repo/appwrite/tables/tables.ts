namespace $ {

	/**
	 * Репозиторий строк Appwrite TablesDB.
	 * Фильтры, сортировка и страница становятся Query SDK.
	 */
	export class $mws_data_repo_appwrite_tables< T extends Record< string, any > > extends $mws_data_repo< T > {

		@$mol_mem
		client( next?: $mws_lib_appwrite ): $mws_lib_appwrite {
			if( next !== undefined ) return next

			const client = new this.$.$mws_lib_appwrite()
			client.$ = this.$
			return client
		}

		@$mol_mem
		database( next?: string ): string {
			return next ?? ''
		}

		@$mol_mem
		table( next?: string ): string {
			return next ?? ''
		}

		@$mol_mem
		override id_key( next?: string ): string {
			return next ?? '$' + 'id'
		}

		@$mol_mem
		queries(): string[] {
			const Query = this.$.$mws_lib_appwrite_sdk.Query
			const queries: string[] = []

			const filters = this.filters()
			for( const key in filters ) {
				const value = filters[ key ]
				if( value !== undefined && value !== null && value !== '' ) {
					queries.push( Query.equal( key, value ) )
				}
			}

			const sort = this.sort()
			if( sort ) {
				queries.push(
					sort.order === 'desc'
						? Query.orderDesc( sort.field )
						: Query.orderAsc( sort.field ),
				)
			}

			queries.push( Query.offset( this.offset() ) )
			queries.push( Query.limit( this.limit() ) )

			return queries
		}

		pack_data( data: Partial< T > ): Record< string, any > {
			const packed: Record< string, any > = {}

			for( const key in data ) {
				if( key.startsWith( '$' ) ) continue
				packed[ key ] = data[ key ]
			}

			return packed
		}

		row_id( data: Partial< T > ): string {
			const id = ( data as Record< string, any > )[ this.id_key() ]
			if( id !== undefined && id !== null && id !== '' ) return String( id )

			return this.$.$mws_lib_appwrite_sdk.ID.unique()
		}

		@$mol_action
		override list_fn(): readonly T[] {
			// Позиционные аргументы: $mol_wire_sync оставляет последнюю перегрузку SDK.
			const response = $mol_wire_sync( this.client().tables() ).listRows(
				this.database(),
				this.table(),
				this.queries(),
			)

			this.list_meta( {
				total: response.total,
				offset: this.offset(),
				limit: this.limit(),
			} )

			return response.rows as unknown as readonly T[]
		}

		@$mol_action
		override one_fn( id: string | number ): T {
			return $mol_wire_sync( this.client().tables() ).getRow(
				this.database(),
				this.table(),
				String( id ),
			) as unknown as T
		}

		@$mol_action
		override create_fn( data: Partial< T > ): T {
			return $mol_wire_sync( this.client().tables() ).createRow(
				this.database(),
				this.table(),
				this.row_id( data ),
				this.pack_data( data ),
			) as unknown as T
		}

		@$mol_action
		override update_fn( id: string | number, data: Partial< T > ): T {
			return $mol_wire_sync( this.client().tables() ).updateRow(
				this.database(),
				this.table(),
				String( id ),
				this.pack_data( data ),
			) as unknown as T
		}

		@$mol_action
		override remove_fn( id: string | number ) {
			$mol_wire_sync( this.client().tables() ).deleteRow(
				this.database(),
				this.table(),
				String( id ),
			)
			return id
		}

	}

}
