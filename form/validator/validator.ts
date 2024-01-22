namespace $
{
	type ValidationObject = {
		[ key: string ]: {
			rules: $milkywaystd_form_rules_rule[]
		}
	}
	export class $milkywaystd_form_validator extends $mol_object
	{
		public validators(): $milkywaystd_form_rules_rule[]
		{
			return []
		}
		@$mol_mem_key
		public model_value( next?: any )
		{
			return next ?? null
		}
		@$mol_mem
		public validation( next?: ValidationObject )
		{
			return next ?? {}
		}
		@$mol_mem_key
		public bid( field: string ): null | string
		{
			const o = this.model_value( field )
			const v = this.validation()

			if( !v[ field ] || !v[ field ].rules.length )
				return null

			for( const validator of v[ field ].rules )
			{
				if( !validator.validate( o ) )
				{
					return validator.error_message()
				}
			}

			return null
		}
		@$mol_mem_key
		public bids( field: string ): (string|null)[]
		{
			const o = this.model_value( field )
			const v = this.validation()

			if( !v[ field ] || !v[ field ].rules.length )
				return []


			const result = []

			for( const validator of v[ field ].rules )
			{

				result.push( validator.validate( o ) )
			}
			return result
		}
	}
}
