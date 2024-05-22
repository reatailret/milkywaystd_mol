namespace $
{
	const error_showed = new WeakMap< Error, $mol_view >()
	export class $mws_view extends $mol_view {

		public throwViewErrors = false
		@ $mol_mem
		dom_tree( next? : Element ) : Element {
			const node = this.dom_node( next )
			
			render: try {

				$mol_dom_render_attributes( node , { mol_view_error : null } )

				try {
				
					this.render()
					
				} finally {
					
					for( let plugin of this.plugins() ) {
						if( plugin instanceof $mol_plugin ) {
							plugin.dom_tree()
						}
					}
					
				}
				
			} catch( error: any ) {
				
				$mol_fail_log( error )
				const mol_view_error = $mol_promise_like(error) ? 'Promise' : error.name || error.constructor.name
				$mol_dom_render_attributes( node , { mol_view_error } )
				
				if( $mol_promise_like( error ) ) break render

				if(this.throwViewErrors){
					throw error
				}

				if( ( error_showed.get( error ) ?? this ) !== this ) break render
				
				try {
					const message = error.message || error
					;( node as HTMLElement ).innerText = message.replace( /^|$/mg, '\xA0\xA0' )
				} catch {}
				
				error_showed.set( error, this )
				
			}
			
			try {
				this.auto()
			} catch( error ) {
				$mol_fail_log( error )
			}
				
			return node
		}
	}
}
