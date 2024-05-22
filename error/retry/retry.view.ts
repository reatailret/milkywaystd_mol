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
		@$mol_mem
		buttons()
		{
			const btns = super.buttons()
			if( !btns.length ) return btns
			const retry = ( this.error()?.value.cause as any )?.retry
			btns[ 0 ].click = ( ( this.error()?.value instanceof $mol_error_mix ) && retry ) ? retry : this.retry_handler
			return btns
		}
	}
}
