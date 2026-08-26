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
		reset(next?: number ): number
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

		@$mol_mem
		override form_fields(): readonly any[]
		{
			const configs = this.fields_config()
			return configs.map( ( config, idx ) => this.Field( idx ) )
		}

		override field_name( idx: number ): string
		{
			const config = this.fields_config()[ idx ]
			return config?.name ?? ''
		}

		/**
		 * Конфигурация валидации для полей
		 */
		@$mol_mem
		validation()
		{
			const configs = this.fields_config()
			const result: Record<string, { rules: readonly $mws_form_rules_rule[] }> = {}

			for( const config of configs )
			{
				if( config.rules )
				{
					result[ config.id ] = { rules: config.rules }
				}
			}

			return result
		}

		/**
		 * Значение поля для валидатора
		 * Связано напрямую с entity, чтобы изменения сразу отражались
		 */
		@$mol_mem_key
		field_validator_value( field: string, next?: any ): any
		{
			if( next !== undefined )
			{
				// Если значение устанавливается, записываем в entity
				const configs = this.fields_config()
				const config = configs.find( c => c.id === field )
				if( !config ) return next

				const entity = this.entity_model()
				if( !entity ) return next

				entity.field( config.field, next )
				return next
			}

			// Читаем значение напрямую из entity
			const configs = this.fields_config()
			const config = configs.find( c => c.id === field )
			if( !config ) return null

			const entity = this.entity_model()
			if( !entity ) return null

			return entity.field( config.field )
		}

		/**
		 * Список ошибок валидации для поля
		 */
		override field_bids( idx: number ): readonly string[]
		{
			const config = this.fields_config()[ idx ]
			if( !config ) return []

			return this.validator_bids( config.id )
		}

		override field_hint( idx: number ): string
		{
			const config = this.fields_config()[ idx ]
			return config?.hint ?? ''
		}

		override field_control( idx: number ): any
		{
			const config = this.fields_config()[ idx ]
			if( !config ) return null

			switch( config.type )
			{
				case 'string':
					return this.String_field( idx )
				case 'number':
					return this.Number_field( idx )
				case 'text':
					return this.Text_field( idx )
				case 'check':
					return this.Check_field( idx )
				default:
					return this.String_field( idx )
			}
		}

		@$mol_mem_key
		override field_value( idx: number, next?: string ): string
		{

			const entity = this.entity_model()
			if( !entity ) return ''

			const config = this.fields_config()[ idx ]
			if( !config ) return ''

			if( next !== undefined )
			{
				entity.field( config.field, next )
				return next
			}

			const value = entity.field( config.field )
			return value !== undefined ? String( value ) : ''
		}

		@$mol_mem_key
		override field_number_value( idx: number, next?: number ): number
		{
			const entity = this.entity_model()
			if( !entity ) return 0

			const config = this.fields_config()[ idx ]
			if( !config ) return 0

			if( next !== undefined )
			{
				entity.field( config.field, next )
				return next
			}

			const value = entity.field( config.field )
			return typeof value === 'number' ? value : 0
		}

		@$mol_mem_key
		override field_checked( idx: number, next?: boolean ): boolean
		{
			const entity = this.entity_model()
			if( !entity ) return false

			const config = this.fields_config()[ idx ]
			if( !config ) return false

			if( next !== undefined )
			{
				entity.field( config.field, next )
				return next
			}

			const value = entity.field( config.field )
			return Boolean( value )
		}

		@$mol_mem
		override submit_allowed(): boolean
		{
			const entity = this.entity_model()
			if( !entity ) return false

			// Проверяем валидацию всех полей
			const configs = this.fields_config()
			for( const config of configs )
			{
				const errors = this.validator_bids( config.id )
				if( errors.length > 0 )
				{
					return false
				}
			}


			return true
		}

		override submit()
		{
			const entity = this.entity_model()
			if( !entity ) return

			try
			{
				entity.save()
				
				this.status_message( 'Saved successfully' )
				
				this.on_saved( entity.id() )
				new this.$.$mol_after_timeout( 1000, () => this.status_message( '' ) )
			} catch( error )
			{
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				this.status_message( 'Error: ' + String( error ) )
			}
		}

		override cancel()
		{
			const entity = this.entity_model()
			if( !entity ) return

			entity.abort()
			this.close()
		}

		@$mol_mem
		override status_message( next?: string ): string
		{

			return next ?? ''
		}
	}
}

