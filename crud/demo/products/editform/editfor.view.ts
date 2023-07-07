namespace $.$$
{
	export class $milkywaystd_crud_demo_products_editform extends $.$milkywaystd_crud_demo_products_editform
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
			return this.srv().listPendingChanel() ? this.srv().listPendingChanel() : ""
		}
		@$mol_mem
		changed( random?: any )
		{
			return random ?? Date.now()
		}

		@$mol_mem
		model(): Product
		{
			try
			{
				if( !!this.isEdit() )
				{
					let p = this.srv().byIdR( this.editKey() )
					this.draftObj( this.editKey(), p )
					this.srv().creatingId( "" )
					return p
				}
				if( this.srv().creatingId() === this.editKey() )
				{
					return this.srv().creatingChannel( this.editKey() )
				}
				const newid = "_" + $mol_guid()
				const newp = new Product()
				newp.id = newid
				this.draftObj( newid, newp )
				this.srv().creatingId( newid )
				this.editKey( newid )
				this.srv().creatingChannel( this.editKey(), newp )
				return this.srv().creatingChannel( this.editKey() )
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
		editKey( val?: string ): string
		{
			return val ?? `${ $mol_state_arg.value( "examples_products_edititem", val ) }`
		}
		@$mol_mem
		modelid()
		{
			return $mol_state_arg.value( "examples_products_edititem" )
		}
		@$mol_mem
		isEdit()
		{
			return !!$mol_state_arg.value( "examples_products_edititem" )
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
			return val ?? (this.model() as any)[ key ]
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
				if( this.srv().creatingId() === this.editKey() )
				{
					const kid = this.editKey()

					const created = this.srv().create( this.formData(), `${ kid }` )

					if( created )
					{
						this.srv().byIdR( `${ kid }`, created )
						this.srv().creatingId( "" )
						this.server_error( this.editKey(), null )

						this.srv().listReload()
						$mol_state_arg.value( "examples_products_edititem", `${ created.id }` )
						this.srv().trackEvent( `${ created.id }`, $milkywaystd_crud_events.CREATE_END )
					}
				} else
				{
					const saved = this.srv().replaceOne( this.draftObj( this.editKey() ).id, this.formData() )
					this.srv().byIdR( this.editKey(), saved )
					this.srv().creatingId( "" )
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
		formtitle()
		{
			return this.isEdit() ? "Редактирование товара" : "Создание товара"
		}
	}
}
