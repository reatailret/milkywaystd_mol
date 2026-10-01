namespace $.$$
{
	export class $mws_error_retry extends $.$mws_error_retry
	{

		@$mol_mem
		message()
		{
			if(super.message()) return super.message()
			if( !this.error()?.value ) return ''
			return `${ this.error()?.value.message }`
		}

		@$mol_action
		retry_handler()
		{
			
			$mws_error_retry_get(this.error()?.value)?.()
		}
	}
}
