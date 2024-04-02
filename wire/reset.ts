namespace $ {
    export function $mws_wire_reset<Args extends [any, ...any[]]>(
        host: object,
        field: string,
        descr?: TypedPropertyDescriptor<(...args: Args) => any>
    ) {
		
        descr = Reflect.getOwnPropertyDescriptor(host, field)
        const orig = descr?.value! ?? (host as any)[field]
		console.log('host', host)
		console.log('orig descr', orig.name)
        const sup = Reflect.getPrototypeOf( host )!
		if( typeof (sup as any)[ field ] === 'function' ) {
			Object.defineProperty( orig , 'name' , { value : (sup as any)[ field ].name } )
		}
		
        const resetTrigger = orig.name.trim() + 'ResetTrigger'
        // reset func
        const descr3 = {
            value: function (this: typeof host, ...args: Args) {
				
                if (args.length || args[0] !== undefined) {
					console.log("call trigger", args)
                    return args[0]
                }
				else {
					console.log("call trigger empty")
				}
                return false
            },
        }
        Reflect.defineProperty(descr3.value, 'name', { value: resetTrigger })
        Reflect.defineProperty(descr3.value, 'length', { value: resetTrigger.length })
        Reflect.defineProperty(host, resetTrigger+'_', descr3)

		const descr3Atom = {
			...descr3,
            value: function( this: typeof host, ... args: Args ){
			
				let atom = $mol_wire_atom.solo( this, descr3.value )
				
				if(( args.length === 0 )||( args[0] === undefined )) {
					
					if( !$mol_wire_fiber.warm ) return atom.result()
					
					if( $mol_wire_auto()?.temp ) {
						return atom.once()
					} else {
						return atom.sync()
					}
					
				}
				
				return atom.resync( args )	
			}
        }
        Reflect.defineProperty(descr3Atom.value, 'name', { value: resetTrigger + ' ' })
        Reflect.defineProperty(descr3Atom.value, 'length', { value: resetTrigger.length })
		let to = {} as any
		to[resetTrigger] = descr3.value 
		Object.assign( descr3Atom.value,  to)
        Reflect.defineProperty(host, resetTrigger, descr3Atom)
        

        const descr2 = {
            value: function (this: typeof host, ...args: Args) {
				console.log(this)
				console.log('call',`${field}_`)
                ;(host as any)[resetTrigger]()
				
                try {
					
                    return (host as any)[`${field}_`](args[0],args[1])
                } catch (error) {
					console.log("ERR", error)
                    if ($mol_promise_like(error)) $mol_fail_hidden(error)
                    throw new $mol_error_mix(
                        (error as Error).message,
                        { retry: ()=>{
							
							host[resetTrigger](Math.random())
							
						}},
                        error as Error
                    )
                }
            },
        }
		
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' })
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length })
		//Object.assign( descr2.value, { orig } )
		//Reflect.defineProperty(host, field, descr2)
        //Reflect.defineProperty(host, field + '_', {...descr, value:orig})
		

		const descr2atom = {
			... descr2,
			value: function( this: typeof host, ... args: Args ) {
			
				let atom = $mol_wire_atom.plex( this, descr2.value, args[0] )
				
				if(( args.length === 1 )||( args[1] === undefined )) {
					
					if( !$mol_wire_fiber.warm ) return atom.result()
					
					if( $mol_wire_auto()?.temp ) {
						return atom.once()
					} else {
						return atom.sync()
					}
					
				}
				
				return atom.resync( args )		
				
				
			}
		}
		const descr4atom = {
			... descr2,
			value: function( this: typeof host, ... args: Args ) {
			
				let atom = $mol_wire_atom.plex( this, orig, args[0] )
				
				if(( args.length === 1 )||( args[1] === undefined )) {
					
					if( !$mol_wire_fiber.warm ) return atom.result()
					
					if( $mol_wire_auto()?.temp ) {
						return atom.once()
					} else {
						return atom.sync()
					}
					
				}
				
				return atom.resync( args )		
				
				
			}
		}
		
		Reflect.defineProperty(descr2atom.value, 'name', { value: descr2.value.name + '  ' })
        Reflect.defineProperty(descr2atom.value, 'length', { value: descr2.value.length })
		Reflect.defineProperty(descr4atom.value, 'name', { value: orig.name + ' ' })
        Reflect.defineProperty(descr4atom.value, 'length', { value: orig.length })
		
		Object.assign( descr4atom.value, {orig} )
		
		Reflect.defineProperty(host, field, descr2atom)
		Reflect.defineProperty(host, field + '_', descr4atom)
		
		
		
		
		//$mol_wire_plex(host, field)
		$mol_wire_plex(host, field + '_')
		//$mol_wire_solo(host, resetTrigger)
        return descr2atom
    }
}
