namespace $
{
	type ValidationObject = {
		[ key: string ]: {
			rules: readonly $mws_form_rules_rule[]
		}
	}
	export class $mws_form_validator extends $mol_object
	{
		public validators(): $mws_form_rules_rule[]
		{
			return []
		}
		@$mol_mem_key
		public model_value( field:string, next?: any )
		{
			return next ?? null
		}
		@$mol_mem
		public validation( next?: ValidationObject )
		{
			return next ?? {}
		}
		@$mol_mem_key
		public bid( field: string ): string
		{
			const o = this.model_value( field )
			const v = this.validation()

			if( !v[ field ] || !v[ field ].rules.length )
				return ''

			for( const validator of v[ field ].rules )
			{
				return validator.validate( o )
			}

			return ''
		}
		@$mol_mem_key
		public bids( field: string ): (string)[]
		{
			const o = this.model_value( field )
			const v = this.validation()

			if( !v[ field ] || !v[ field ].rules.length )
				return []


			const result:string[] = []

			for( const validator of v[ field ].rules )
			{
				const message = validator.validate( o );
				if(message)
				result.push(message)
			}
			return result
		}
	}
}
