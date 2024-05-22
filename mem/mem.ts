namespace $
{

	/** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
	export function $mws_mem<Args extends any[]>(
		host: object,
		field: string,
		descr?: TypedPropertyDescriptor<( ...args: Args ) => any>
	)
	{

		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( host, field )
		const orig = descr?.value! ?? ( host as any )[ field ]

		const sup = Reflect.getPrototypeOf( host )!
		if( typeof ( sup as any )[ field ] === 'function' )
		{
			Object.defineProperty( orig, 'name', { value: ( sup as any )[ field ].name } )
		}

		const descr2 = {
			...descr,
			value: function( this: typeof host, ...args: Args )
			{

				let atom = $mol_wire_atom.solo( this, orig )
				try
				{
					if( ( args.length === 0 ) || ( args[ 0 ] === undefined ) )
					{

						if( !$mol_wire_fiber.warm ) return atom.result()

						if( $mol_wire_auto()?.temp )
						{
							return atom.once()
						} else
						{
							return atom.sync()
						}

					}

					return atom.resync( args )

				} catch( error )
				{
					if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					if(error instanceof $mol_error_mix)
					{
						error.cause.retry = atom.refresh()
					}
					else
					throw new $mol_error_mix(
						( error as Error ).message,
						{
							retry: () =>
							{

								atom.refresh()

							}
						},
						error as Error
					)
				}
			}
		}

		Reflect.defineProperty( descr2.value, 'name', { value: orig.name + ' ' } )
		Reflect.defineProperty( descr2.value, 'length', { value: orig.length } )
		Object.assign( descr2.value, { orig } )

		Reflect.defineProperty( host, field, descr2 )

		return descr2 as any as TypedPropertyDescriptor<( ...args: First_optional<Args> ) => any>
	}

	type First_optional<Args extends any[]> = Args extends []
		? []
		: [ Args[ 0 ] | undefined, ...$mol_type_tail<Args> ]
	/** Reactive memoizing multiplexed property decorator. */
	export function $mws_mem_key<Args extends [ any, ... any[] ]>(
		host: object,
		field: string,
		descr?: TypedPropertyDescriptor<( ...args: Args ) => any>
	)
	{

		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( host, field )
		const orig = descr?.value! ?? ( host as any )[ field ]

		const sup = Reflect.getPrototypeOf( host )!
		if( typeof ( sup as any )[ field ] === 'function' )
		{
			Object.defineProperty( orig, 'name', { value: ( sup as any )[ field ].name } )
		}


		const descr2 = {
			...descr,
			value: function( this: typeof host, ...args: Args )
			{

				let atom = $mol_wire_atom.plex( this, orig, args[ 0 ] )

				try
				{




					if( ( args.length === 1 ) || ( args[ 1 ] === undefined ) )
					{

						if( !$mol_wire_fiber.warm ) return atom.result()

						if( $mol_wire_auto()?.temp )
						{
							return atom.once()
						} else
						{
							return atom.sync()
						}

					}


					return atom.resync( args )
				} catch( error )
				{
					if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					if(error instanceof $mol_error_mix)
					{
						error.cause.retry = atom.refresh()
					}
					else
					throw new $mol_error_mix(
						( error as Error ).message,
						{
							retry: () =>
							{

								atom.refresh()

							}
						},
						error as Error
					)
				}

			}
		}



		Reflect.defineProperty( descr2.value, 'name', { value: orig.name + ' ' } )
		Reflect.defineProperty( descr2.value, 'length', { value: orig.length } )
		Object.assign( descr2.value, { orig } )

		Reflect.defineProperty( host, field, descr2 )

		return descr2
	}

}
