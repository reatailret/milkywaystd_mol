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
		public bid( field: string ): null | string
		{
			const o = this.model_value( field )
			const v = this.validation()

			if( !v[ field ] || !v[ field ].rules.length )
				return null

			for( const validator of v[ field ].rules )
			{
				return validator.validate( o )
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


			const result:string[] = []

			for( const validator of v[ field ].rules )
			{
				const message = validator.validate( o );
				if(message)
				result.push(  )
			}
			return result
		}
	}
}
