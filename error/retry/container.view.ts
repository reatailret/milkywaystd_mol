namespace $.$$
{
	export class $mws_error_retry_container extends $.$mws_error_retry_container
	{

		@$mol_mem
		error(): $mws_error_value | null
		{
			return $mws_error_capture( () => this.error_caller() )
		}

		@$mol_mem
		subs(): $mol_view[]
		{
			return this.error() ? [
				this.retry_block(),

			] : [ this.body() ]
		}

		

	}
}
