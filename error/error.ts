namespace $
{

	export type $mws_error_atom = {
		atom?: $mol_wire_atom<any, any, any>
	}

	export class $mws_error extends $mol_error_mix< $mws_error_atom > {}

	export type $mws_error_value = {
		value: $mws_error | Error
	}

	export function $mws_error_with_atom(
		error: Error,
		atom: $mol_wire_atom<any, any, any>,
	): $mws_error
	{

		if( error instanceof $mws_error )
		{
			error.cause.atom = atom
			return error
		}

		return new $mws_error( error.message, { atom }, error )
	}

	export function $mws_error_retry_get(
		error?: Error | null,
	): ( () => void ) | null | undefined | void
	{

		if( !error ) return
		if( error instanceof $mws_error ) return () => error.cause.atom?.refresh()
		if( error instanceof $mol_error_mix ) return () => ( error.cause as $mws_error_atom ).atom?.refresh()
	}

	/** Выполняет task в pull-контексте; при ошибке возвращает значение для error-канала. */
	export function $mws_error_capture( task: () => void ): $mws_error_value | null
	{
		try
		{
			task()
			return null
		} catch( error )
		{
			if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
			return { value: error as Error }
		}
	}

}
