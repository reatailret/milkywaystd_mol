namespace $.$$
{

	/**
	 * Конфигурация поля формы
	 */
	export type $mws_data_form_field_config<T = any> = {
		id: string
		name: string
		field: keyof T
		type: 'string' | 'number' | 'text' | 'check'
		hint?: string
		rules?: readonly $mws_form_rules_rule[]

	}

	export class $mws_data_form extends $.$mws_data_form
	{
		@$mol_mem
		reset( next?: number ): number
		{
			return next ?? Date.now()
		}

		@$mol_mem
		fetch_error(): $mws_error_value | null
		{
			
			try
			{
				this.reset()
				this.entity()?.data()
				return null

			} catch( error )
			{
				if( $mol_promise_like( error ) )
				{
					$mol_fail_hidden( error )
				}
				const e = new $mol_error_mix(
					( error as Error ).message,
					{
						retry: $mol_wire_async(() =>
						{
							
							this.reset( Date.now())

						})
					},
					error as Error)

			return {value: e}

			}
		}

		@$mol_mem
		entity_model(): $mws_data_entity<any> | null
		{

			return this.entity()

		}

		/**
		 * Конфигурация полей формы
		 */
		@$mol_mem
		fields_config( next?: readonly $mws_data_form_field_config[] ): readonly $mws_data_form_field_config[]
		{
			return next ?? []
		}

		field_config( id: string )
		{
			return this.fields_config().find( config => config.id === id )
		}

		@$mol_mem
		override form_fields(): readonly any[]
		{
			return this.fields_config().map( config => this.Field( config.id ) )
		}

		override field_name( id: string ): string
		{
			return this.field_config( id )?.name ?? ''
		}

		/**
		 * Конфигурация валидации для полей
		 */
		@$mol_mem
		validation()
		{
			const result: Record<string, { rules: readonly $mws_form_rules_rule[] }> = {}

			for( const config of this.fields_config() )
			{
				if( config.rules )
				{
					result[ config.id ] = { rules: config.rules }
				}
			}

			return result
		}

		/**
		 * Значение поля для валидатора — черновик формы, а не entity
		 */
		@$mol_mem_key
		field_validator_value( field: string, next?: any ): any
		{
			return this.value( field, next )
		}

		/**
		 * Список ошибок валидации для поля
		 */
		override field_bids( id: string ): readonly string[]
		{
			return this.validator_bids( id )
		}

		override field_hint( id: string ): string
		{
			return this.field_config( id )?.hint ?? ''
		}

		override field_control( id: string ): any
		{
			const config = this.field_config( id )
			if( !config ) return null

			switch( config.type )
			{
				case 'string':
					return this.String_field( id )
				case 'number':
					return this.Number_field( id )
				case 'text':
					return this.Text_field( id )
				case 'check':
					return this.Check_field( id )
				default:
					return this.String_field( id )
			}
		}

		model_pick( field: string, next?: $mol_form_draft_state_value | null )
		{
			const entity = this.entity_model()
			if( !entity ) return next ?? null

			const config = this.field_config( field )
			if( !config ) return next ?? null

			return next === undefined
				? entity.field( config.field )
				: entity.field( config.field, next )
		}

		@$mol_mem
		override form_buttons()
		{
			const form = this.Form()
			return [
				this.Save_btn(),
				... form.changed() ? [ form.Reset() ] : [],
				this.Cancel_btn(),
				... form.result() ? [ form.Result() ] : [],
			]
		}

		override done()
		{
			const entity = this.entity_model()
			if( !entity ) return

			entity.save()
			this.on_saved( entity.id() )
			new this.$.$mol_after_timeout( 1000, () => this.Form().result( '' ) )
		}

		override cancel()
		{
			this.Form().reset()
			this.entity_model()?.abort()
			this.close()
		}
	}
}
