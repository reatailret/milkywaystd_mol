namespace $.$$
{

	export class $mws_data_form extends $.$mws_data_form
	{

		@$mol_mem
		entity_model(): $mws_data_entity<any> | null
		{

			return this.entity()

		}

		/**
		 * Конфигурация полей формы
		 */
		@$mol_mem
		fields_config( next?: readonly $mws_data_column_config[] ): readonly $mws_data_column_config[]
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
			return this.fields_config().filter( config => config.render_in_form ).map( config => this.Field( config.id ) )
		}

		override field_name( id: string ): string
		{
			return this.field_config( id )?.title ?? ''
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

			if( config.form_renderer )
			{
				return config.form_renderer( id )
			}

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

		@$mol_mem_key
		field_value_empty( id: string ): boolean
		{
			const config = this.field_config( id )
			if( !config ) return true

			switch( config.type )
			{
				case 'number':
					return Number.isNaN( this.value_number( id ) )
				case 'check':
					return false
				default:
					return !this.value_str( id ).trim()
			}
		}

		@$mol_mem
		form_has_data(): boolean
		{
			for( const config of this.fields_config() )
			{
				if( !config.render_in_form ) continue
				if( !this.field_value_empty( config.id ) ) return true
			}
			return false
		}

		@$mol_mem
		override submit_allowed()
		{
			if( !this.form_has_data() ) return false

			return this.form_fields().every( field => !field.bid() )
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

	export class $mws_data_form_search extends $.$mws_data_form_search
	{

		@$mol_mem
		fetch_error( next?: $mws_error_value | null ): $mws_error_value | null
		{
			if( next !== undefined ) return next
			const source = this.Datasource()
			if( !source ) return null
			return $mws_error_capture( () => { source.list() } )
		}

		auto(){
			this.temp_filters(this.Datasource()?.filters())
		}
		@$mol_mem
		temp_filters(next?: Record<string, string>): Record<string, string>
		{
			return next ?? {}
		}
		@$mol_mem_key
		filter_value_inner(id:string, next?: string): string
		{
			if(next === undefined) {
				return this.temp_filters()[id] ?? ''
			}
			const mut = this.$.$mol_mutable(this.temp_filters())
			mut[id](old=>next)
			this.temp_filters(mut())
			console.log(this.temp_filters())
			return this.temp_filters()[id]
			
		}
		@$mol_action
		apply_filters() {
			this.Datasource()?.filters(this.temp_filters())
		}
		@$mol_action
		clear_filters() {
			this.temp_filters({})
			this.Datasource()?.filters({})
		}

	}
}
