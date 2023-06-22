namespace $.$$
{
	type $milkywaystd_crud_id_type = string | number
	export enum $milkywaystd_crud_events
	{
		FETCH_LIST_START,
		FETCH_LIST_END,
		FETCH_LIST_ERROR,

		ONE_FETCH_START,
		ONE_FETCH_END,
		ONE_FETCH_ERROR,

		ONE_REPLACE_START,
		ONE_REPLACE_END,
		ONE_REPLACE_ERROR,

		ONE_UPDATE_START,
		ONE_UPDATE_END,
		ONE_UPDATE_ERROR,

		ONE_DELETE_START,
		ONE_DELETE_END,
		ONE_DELETE_ERROR,

		CREATE_START,
		CREATE_END,
		CREATE_ERROR,
	}
	export class $milkywaystd_crud<T> extends $mol_object2
	{
		_headers: Record<string, string> = {
			"Content-Type": "application/json",
		};
		headers( value?: Record<string, string> ): Record<string, string>
		{
			if( value !== undefined )
			{
				this._headers = { ...value, ...this._headers }
			}
			return this._headers
		}

		private _apiUrl = "";
		public get apiUrl()
		{
			return this._apiUrl
		}
		public set apiUrl( value )
		{
			this._apiUrl = value
		}
		private _apiResource = "";
		public get apiResource()
		{
			return this._apiResource
		}
		public set apiResource( value )
		{
			this._apiResource = value
		}
		private _idKey = "id";
		public get idKey()
		{
			return this._idKey
		}
		public set idKey( value )
		{
			this._idKey = value
		}

		@$mol_mem
		params( obj?: { [ key: string ]: string } )
		{
			return obj ?? {}
		}

		customUrlFunc: null | ( () => string ) = null;

		listDataFunc: ( data: any ) => Array<T> = ( data ) => data as Array<T>;
		listMetaFunc: ( data: any ) => Object = ( data ) => data as Object;
		oneItemFunc: ( data: any ) => T = ( data ) => data as T;
		processErrorFunc: ( error: Error ) => any = ( error ) => error;
		packPostData: ( data: unknown ) => unknown = ( data ) => data;
		packUpdateData: ( data: unknown ) => unknown = ( data ) => data;
		packReplaceData: ( data: unknown ) => unknown = ( data ) => data;

		@$mol_mem
		url(): string
		{
			if( this.customUrlFunc )
			{
				return this.customUrlFunc()
			}
			if( !this.apiUrl )
			{
				$mol_fail( "Api url is not defined" )
			}
			if( !this.apiResource )
			{
				$mol_fail( "Api resource is not defined" )
			}
			let url = `${ this.apiUrl.replace(
				/[\/]+$/gm,
				""
			) }/${ this.apiResource.replace( /[\/]+$|^[\/]+/gm, "" ) }`
			return url
		}
		@$mol_mem
		urlList(): string
		{
			let url = this.url()
			const params = new URLSearchParams()
			const params_obj = this.params()

			for( const param_key in params_obj )
			{
				params.append( param_key, params_obj[ param_key ] )
			}
			url += `?${ params.toString() }`
			return url
		}
		@$mol_mem_key
		urlOne( id?: $milkywaystd_crud_id_type ): string
		{
			if( !id )
			{
				throw new Error( "id id empty" )
			}
			let url = this.url()
			url += `/${ id }`

			return url
		}

		@$mol_mem
		metaInfo( value?: unknown ):Record<string,any>
		{
			return value ?? {}
		}
		_creatingId: string = "";

		creatingId( val?: string )
		{
			if( undefined !== val )
			{
				this._creatingId = val
			}
			return this._creatingId
		}
		_keyCache = new Map<string, any>();
		@$mol_mem
		dataKeys(): { [ key: string ]: T } | {}
		{
			const obj : Record<string, any> = {}
			for( const iterator of this.list() )
			{
				obj[ `${ (iterator as any)[ this.idKey ] }` ] = iterator
			}
			return obj
		}
		_cachedObject = new Map();
		getCachedObject( id: $milkywaystd_crud_id_type )
		{
			return this._cachedObject.get( id )
		}
		setCachedObject( id: any, val: T )
		{
			return this._cachedObject.set( id, val )
		}
		@$mol_action
		prependToList( data: T )
		{
			const list = [ data, ...this.list() ]
			this.list( list )
		}
		@$mol_action
		appendToList( data: T )
		{
			const list = [ ...this.list(), data ]
			this.list( list )
		}
		@$mol_action
		removeFromList( id: string )
		{
			const list = [ ...this.list() ]
			const idx = list.findIndex( ( el ) => `${ (el as any)[ this.idKey ] }` === `${ id }` )
			if( idx === -1 )
			{
				return false
			}
			list.splice( idx, 1 )
			this.list( list )
			return true
		}
		@$mol_action
		replaceListItem( replaceId: string, data: T )
		{
			const list = [ ...this.list() ]
			const idx = list.findIndex(
				( el ) => `${ (el as any)[ this.idKey ] }` === `${ replaceId }`
			)

			if( idx === -1 )
			{
				return false
			}
			if( (data as any)[ this.idKey ] === undefined )
			{
				(data as any)[ this.idKey ] = replaceId
			}
			list[ idx ] = data
			this.list( list )

			return true
		}
		@$mol_mem
		list( data?: Array<T> ): Array<T>
		{
			if( undefined !== data )
			{
				return data
			}

			this.reset()
			this.urlList()

			return this.fetchList()
		}

		@$mol_mem_key
		byId( id: string, val?: T ): T
		{
			if( val !== undefined ) return val
			let p = (this.dataKeys() as any)[ `${ id }` ]
			return p && p._error ? p._error : p
		}

		@$mol_mem_key
		byServerId( id: string ): T
		{
			return this.fetchOne( id )
		}

		@$mol_mem_key
		byIdR( id: string, val?: T ): T
		{
			this.dataKeys()
			if( val )
			{
				return val
			}
			let p = (this.dataKeys() as Record<string,any>)[ `${ id }` ]
			if( !p )
			{
			}
			if( !p )
			{
				p = this.fetchOne( id )
			}

			return p && p._error ? p._error : p
		}
		@$mol_mem_key
		creatingChannel( id: string, val?: T ): T
		{
			return val ?? null as T
		}
		@$mol_action
		public fetchList()
		{
			try
			{
				this.isPending( true )

				this.trackEvent(
					"list",
					$milkywaystd_crud_events.FETCH_LIST_START
				)

				var response = this.$.$milkywaystd_fetch.json( this.urlList(), {
					method: "GET",
					headers: { ...( this.headers() as HeadersInit ) },
				} )
				this.trackEvent(
					"list",
					$milkywaystd_crud_events.FETCH_LIST_END
				)
				this.isPending( false )
			} catch( error )
			{
				$mol_fail_catch( error )

				this.trackEvent(
					"list",
					$milkywaystd_crud_events.FETCH_LIST_ERROR,
					error as ErrorResponse
				)
				this.isPending( false )

				$mol_fail_hidden( this.processErrorFunc( error as Error ) )
			}

			this.metaInfo( this.listMetaFunc( response ) )
			const list = this.listDataFunc( response )

			return list
		}

		@$mol_action
		public fetchOne( id: $milkywaystd_crud_id_type )
		{
			try
			{
				this.isPending( true )
				this.trackEvent( id, $milkywaystd_crud_events.ONE_FETCH_START )

				var response = this.$.$milkywaystd_fetch.json( this.urlOne( id ), {
					method: "GET",
					headers: { ...( this.headers() as HeadersInit ) },
				} )
				this.isPending( false )
				this.trackEvent( id, $milkywaystd_crud_events.ONE_FETCH_END )
			} catch( error )
			{
				$mol_fail_catch( error )
				this.isPending( false )
				this.trackEvent(
					id,
					$milkywaystd_crud_events.ONE_FETCH_ERROR,
					error as ErrorResponse
				)

				$mol_fail_hidden( this.processErrorFunc( error as Error ) )
			}
			const r = this.oneItemFunc( response )

			return r
		}

		@$mol_action
		public create( item: Partial<T>, id?: $milkywaystd_crud_id_type )
		{
			try
			{
				this.isPending( true )
				if( id )
				{
					this.trackEvent( id, $milkywaystd_crud_events.CREATE_START )
				}

				var response = this.$.$milkywaystd_fetch.json( this.url(), {
					method: "POST",
					body: JSON.stringify( this.packPostData( item ) ),
					headers: this.headers() as HeadersInit,
				} )
				this.isPending( false )
				if( id )
				{
					this.trackEvent( id, $milkywaystd_crud_events.CREATE_END )
				}
			} catch( error )
			{
				$mol_fail_catch( error )
				this.isPending( false )
				if( id )
				{
					this.trackEvent(
						id,
						$milkywaystd_crud_events.CREATE_ERROR,
						error as ErrorResponse
					)
				}

				$mol_fail_hidden( this.processErrorFunc( error as Error ) )
			}

			const r = this.oneItemFunc( response )
			if( `${ (r as any)[ this.idKey ] }` !== `${ id }` )
			{
				this.creatingChannel( `${ id }`, r )
				this.replaceListItem( `${ id }`, r )
			}
			return r
		}

		@$mol_action
		public updateOne( id: $milkywaystd_crud_id_type, item: Partial<T> )
		{
			return this.editFn( id, item, "PATCH" )
		}
		@$mol_action
		public replaceOne( id: $milkywaystd_crud_id_type, item: Partial<T> )
		{
			return this.editFn( id, item, "PUT" )
		}
		@$mol_action
		public deleteOne( id: $milkywaystd_crud_id_type )
		{
			try
			{
				this.isPending( true )
				this.trackEvent( id, $milkywaystd_crud_events.ONE_DELETE_START )

				this.$.$milkywaystd_fetch.json( this.urlOne( id ), {
					method: "DELETE",
					headers: this.headers() as HeadersInit,
				} )
				this.isPending( false )
				this.trackEvent( id, $milkywaystd_crud_events.ONE_DELETE_END )
			} catch( error )
			{
				$mol_fail_catch( error )
				this.isPending( false )
				this.trackEvent(
					id,
					$milkywaystd_crud_events.ONE_DELETE_ERROR,
					error as ErrorResponse
				)

				$mol_fail_hidden( this.processErrorFunc( error as Error ) )
			}

			this.removeListItem( id )

			return true
		}
		@$mol_action
		private editFn(
			id: $milkywaystd_crud_id_type,
			item: Partial<T>,
			method: "PATCH" | "PUT"
		)
		{
			try
			{
				this.isPending( true )

				this.trackEvent(
					id,
					method === "PATCH"
						? $milkywaystd_crud_events.ONE_UPDATE_START
						: $milkywaystd_crud_events.ONE_REPLACE_START
				)

				var response = this.$.$milkywaystd_fetch.json( this.urlOne( id ), {
					method: method,
					body: JSON.stringify(
						method === "PATCH"
							? this.packUpdateData( item )
							: this.packReplaceData( item )
					),
					headers: this.headers() as HeadersInit,
				} )
				this.isPending( false )
				this.trackEvent(
					id,
					method === "PATCH"
						? $milkywaystd_crud_events.ONE_UPDATE_END
						: $milkywaystd_crud_events.ONE_REPLACE_END
				)
			} catch( error )
			{
				$mol_fail_catch( error )
				this.isPending( false )
				this.trackEvent(
					id,
					method === "PATCH"
						? $milkywaystd_crud_events.ONE_UPDATE_ERROR
						: $milkywaystd_crud_events.ONE_REPLACE_ERROR,
					error as ErrorResponse
				)

				$mol_fail_hidden( this.processErrorFunc( error as Error ) )
			}
			const r = this.oneItemFunc( response )
			this.updateListItem( r )
			return r
		}
		@$mol_action
		updateListItem( item: T )
		{
			const list = [ ...this.list() ]
			const exist = list.findIndex(
				( el ) => `${ (el as any)[ this.idKey ] }` === `${ (item as any)[ this.idKey ] }`
			)
			if( exist !== -1 )
			{
				list[ exist ] = item
				this.list( list )
			}
		}
		@$mol_action
		removeListItem( id: $milkywaystd_crud_id_type )
		{
			let list = [ ...this.list() ]
			const exist = list.findIndex(
				( el ) => `${ (el as any)[ this.idKey ] }` === `${ id }`
			)
			if( exist !== -1 )
			{
				list.splice( exist, 1 )
				this.list( list )
			}
		}
		@$mol_action
		isPending( status?: boolean )
		{
			if( status !== undefined )
			{
				if( status )
				{
					setTimeout( () =>
					{
						$mol_wire_async( this ).pendingChanel( $mol_promise() )
					}, 0 )
				} else
				{
					setTimeout( () =>
					{
						$mol_wire_async( this ).pendingChanel( false )
					}, 0 )
				}
			}
			return status !== undefined ? status : false
		}
		@$mol_mem
		pendingChanel( val?: any )
		{
			return val ?? false
		}
		@$mol_mem
		isListPending( status?: boolean )
		{
			if( status !== undefined )
			{
				if( status )
				{
					setTimeout( () =>
					{
						$mol_wire_async( this ).listPendingChanel( $mol_promise() )
					}, 0 )
				} else
				{
					setTimeout( () =>
					{
						$mol_wire_async( this ).listPendingChanel( false )
					}, 0 )
				}
			}

			return status !== undefined ? status : false
		}

		@$mol_mem
		listPendingChanel( val?: any )
		{
			if( val !== undefined ) return val ?? false
		}
		@$mol_action
		isOnePending( status?: boolean )
		{
			if( status !== undefined )
			{
				if( status )
				{
					setTimeout( () =>
					{
						$mol_wire_async( this ).onePendingChanel( $mol_promise() )
					}, 0 )
				} else
				{
					setTimeout( () =>
					{
						$mol_wire_async( this ).onePendingChanel( false )
					}, 0 )
				}
			}

			return status !== undefined ? status : false
		}

		@$mol_mem
		onePendingChanel( val?: any )
		{
			return val !== undefined ? val : false
		}
		@$mol_action
		trackEvent(
			id: $milkywaystd_crud_id_type,
			status?: $milkywaystd_crud_events | "",
			error?: ErrorResponse
		)
		{
			setTimeout( () =>
			{
				$mol_wire_async( this ).trackEventChannel( `${ id }`, status )
			}, 0 )

			switch( status )
			{
				case $milkywaystd_crud_events.CREATE_START:
					$mol_wire_async( this ).creatingChannel(
						`${ id }`,
						$mol_promise() as any
					)
					$mol_wire_async( this ).replaceListItem(
						`${ id }`,
						$mol_promise() as any
					)
					break
				case $milkywaystd_crud_events.ONE_REPLACE_START:
				case $milkywaystd_crud_events.ONE_UPDATE_START:
				case $milkywaystd_crud_events.ONE_DELETE_START:
				case $milkywaystd_crud_events.ONE_FETCH_START:
					this.isOnePending( true )
					if( $milkywaystd_crud_events.ONE_FETCH_START !== status )
					{
						$mol_wire_async( this ).byIdR(
							`${ id }`,
							$mol_promise() as any
						)
					}

					break
				case $milkywaystd_crud_events.FETCH_LIST_START:
					this.isListPending( true )
					break
				case $milkywaystd_crud_events.FETCH_LIST_END:
					this.isListPending( false )
					break
				case $milkywaystd_crud_events.FETCH_LIST_ERROR:
					this.listPendingChanel( false )
					break
				case $milkywaystd_crud_events.CREATE_END:
				case $milkywaystd_crud_events.ONE_REPLACE_END:
				case $milkywaystd_crud_events.ONE_UPDATE_END:
				case $milkywaystd_crud_events.ONE_DELETE_END:
				case $milkywaystd_crud_events.ONE_FETCH_END:
					if( $milkywaystd_crud_events.ONE_FETCH_END !== status )
						this.isOnePending( false )

					break

				case $milkywaystd_crud_events.CREATE_ERROR:
				case $milkywaystd_crud_events.ONE_REPLACE_ERROR:
				case $milkywaystd_crud_events.ONE_UPDATE_ERROR:
				case $milkywaystd_crud_events.ONE_DELETE_ERROR:
				case $milkywaystd_crud_events.ONE_FETCH_ERROR:
					this.isOnePending( false )
					if( $milkywaystd_crud_events.ONE_FETCH_ERROR !== status )
					{
						//

						if( $milkywaystd_crud_events.CREATE_ERROR === status )
						{
							try
							{
								this.creatingChannel( `${ id }`, error as any )
							} catch( error ) {}
						}

						const temp : Record<string,any> = { _error: error }
						temp[this.idKey] = id

						this.replaceListItem( `${ id }`, temp as T )
					}
					break

				default:
					break
			}
		}

		@$mol_mem_key
		trackEventChannel( id: string, status?: $milkywaystd_crud_events | "" )
		{
			return status ?? ""
		}
		@$mol_mem_key
		trackEventErrorChanel(
			id: string,
			param?: any
		): { error: ErrorResponse } | null
		{
			if( param instanceof ErrorResponse )
			{
				param = { error: param }
			}
			return param ?? null
		}
		@$mol_action
		listReload()
		{
			return this.reset( Date.now() )
		}
		@$mol_mem
		reset( val?: any )
		{
			return val ?? Date.now()
		}
	}
}
