namespace $
{
	export class $mws_form_rules_email extends $mol_object
	{
		public error_message()
		{
			return 'Value is not email'
		}
		public validate( value: any ): null | string
		{
			try {
				$mol_data_email(value)
				return null	
			} catch (error) {
				return this.error_message()
			}
			
		}
	}
}
