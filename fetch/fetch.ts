namespace $
{
	export class ErrorResponse extends Error
	{
		constructor( message?: string | undefined, options?: ErrorOptions | undefined )
		{
			super( message, options )
		}
		response: $mol_fetch_response | null = null;
	}
	export class $milkywaystd_fetch extends $mol_fetch
	{
		@$mol_action
		static override success( input: RequestInfo, init?: RequestInit )
		{

			const response = this.response( input, init )
			if( response.status() === 'success' ) return response

			const error = new ErrorResponse( response.message() )
			error.response = response

			throw error

		}
		@$mol_action
		static response( input: RequestInfo, init?: RequestInit )
		{
			return new $milkywaystd_fetch_response( $mol_wire_sync( this ).request( input, init ) )
		}
	}
	export class $milkywaystd_fetch_response extends $mol_fetch_response
	{



		json()
		{
			return $mol_wire_sync( $mol_wire_sync( this.native ).clone() ).json() as unknown
		}



	}
}
