namespace $.$$
{
	export class $milkywaystd_crud_demo_products2_editform extends $.$milkywaystd_crud_demo_products2_editform
	{
		@$mol_mem
		srv()
		{
			const srv = $milkywaystd_crud_demo_products_service.getInstance()
			return srv
		}

		@$mol_mem
		uiblocker()
		{
			return ""
		}

		@$mol_mem
		model(): Product
		{
			try
			{
				if( this.isEdit() )
				{
					this.editKey( `${ $mol_state_arg.value( "examples_products_edititem" ) }` )
					let p = this.srv().byIdR( this.editKey() )
					this.draftObj( this.editKey(), p )
					return p
				}

				this.editKey( "_" + $mol_guid() )
				const newp = new Product()
				newp.id = this.editKey()
				this.draftObj( this.editKey(), newp )
				this.srv().creatingId( this.editKey() )

				return newp
			} catch( error )
			{
				$mol_fail_catch( error )
				if( error instanceof ErrorResponse )
				{
					const response = error.response ? error.response.json() : null
					this.server_error( this.editKey(), response )
				}
				this.status( ( error as Error ).message )
				return this.draftObj( this.editKey() )
			}
		}
		@$mol_mem
		editKey( val?: string )
		{
			$mol_state_arg.value( "examples_products_edititem" )
			return val ?? `${ $mol_state_arg.value( "examples_products_edititem" ) }`
		}

		draftObj( id: any, val?: any )
		{
			if( undefined !== val )
			{
				this.srv().setCachedObject( id, val )
			}
			return this.srv().getCachedObject( id ) ?? new Product()
		}
		@$mol_mem_key
		server_error( id?: any, val?: any )
		{
			return val ?? null
		}
		@$mol_mem_key
		validation_error( field: string )
		{
			const err = this.server_error( this.editKey() )?.error?.details?.errors

			if( !err )
			{
				return ""
			}
			for( const error of err )
			{
				if( error?.path && error?.path[ 0 ] === field )
				{
					return error.message
				}
			}
			return ""
		}
		@$mol_action
		closepage( val?: any )
		{
			const prev = { ...$mol_state_arg.dict() }
			delete prev[ "examples_products_edititem" ]
			delete prev[ "examples_products_viewpage" ]
			$mol_state_arg.go( prev )
		}
		@$mol_mem
		price_bid(): string
		{
			return !parseFloat( this.draft( "price" ) ) || parseFloat( this.draft( "price" ) ) < 0 ? this.message().positive : ""
		}
		@$mol_mem
		name_bid(): string
		{
			return ( !this.draft( "title" ) ? this.message().required : "" ) && this.validation_error( "title" )
		}
		@$mol_mem_key
		draft( key: any, val?: any ):any
		{
			if( val !== undefined )
			{
				const d = { ...this.draftObj( this.editKey() ) }
				d[ key ] = val
				this.draftObj( this.editKey(), d )
			}
			return val ?? (this.model() as any)[ key ] as any
		}
		@$mol_mem_key
		draftNum( key: any, val?: any ):any
		{
			return this.draft(key, val)
		}
		@$mol_mem
		formData()
		{
			return {
				title: this.draft( "title" ),
				price: this.draft( "price" ),
			}
		}
		@$mol_action
		event_submit( val?: any )
		{
			try
			{
				const kid = this.editKey()
				const isUnsavedItem = kid.indexOf( "_" ) === 0
				if( this.srv().creatingId() === kid || isUnsavedItem )
				{
					const toCreate = { ...this.draftObj( kid ) }
					const toPrepend = { id: kid, ...this.draftObj( kid ) }
					delete toCreate[ "id" ]

					if( !this.isEdit() )
					{
						this.srv().prependToList( toPrepend )
						this.editKey( $mol_guid() )
					}
					//

					if( !this.isEdit() )
					{
						$mol_wire_fiber.sync()
						setTimeout( () =>
						{
							const s = this.srv().create( toCreate, kid )
						}, 0 )
					} else
					{
						const s = this.srv().create( toCreate, kid )
						$mol_state_arg.value( "examples_products_edititem", `${s.id}`)
					}
				} else
				{
					const saved = this.srv().replaceOne( this.draftObj( this.editKey() ).id, this.formData() )
				}
			} catch( error )
			{
				$mol_fail_catch( error )
			}
		}

		@$mol_mem_key
		clearStatusTimeout( id: any, val?: $mol_after_timeout )
		{
			return val
		}
		@$mol_mem
		status( val?: any )
		{
			this.draftObj( this.editKey() )
			let status = ""

			switch( this.srv().trackEventChannel( this.editKey() ) )
			{
				case $milkywaystd_crud_events.ONE_REPLACE_ERROR:
				case $milkywaystd_crud_events.ONE_UPDATE_ERROR:
				case $milkywaystd_crud_events.CREATE_ERROR:
					//status = 'Ошибка'

					break
				case $milkywaystd_crud_events.ONE_FETCH_ERROR:
					break

				case $milkywaystd_crud_events.ONE_UPDATE_END:
				case $milkywaystd_crud_events.ONE_REPLACE_END:
				case $milkywaystd_crud_events.CREATE_END:
					status = "Сохранено"
					break

				default:
					break
			}
			if( status )
				this.clearStatusTimeout(
					this.editKey(),
					new $mol_after_timeout( 2000, () =>
					{
						this.srv().trackEvent( this.editKey(), "" )
					} )
				)
			return val ?? status
		}
		@$mol_mem
		isEdit()
		{
			return !!$mol_state_arg.value( "examples_products_edititem" )
		}
		@$mol_mem
		formtitle()
		{
			return this.isEdit() ? "Редактирование товара" : "Создание товара"
		}
	}
}
