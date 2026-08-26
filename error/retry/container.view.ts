namespace $.$$
{
	export class $mws_error_retry_container extends $.$mws_error_retry_container
	{

		@$mol_mem
		subs(): $mol_view[]
		{
			return this.error() ? [
				this.retry_block(),

			] : [ this.body() ]
		}

	}
}
