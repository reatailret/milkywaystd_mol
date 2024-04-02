namespace $
{
	export class $milkywaystd_form_rules_required extends $mol_object
	{
		public error_message()
		{
			return 'Value is required'
		}
		public validate( value: any ): null | string
		{
				
				return value?null:this.error_message()
			
			
		}
	}
}
