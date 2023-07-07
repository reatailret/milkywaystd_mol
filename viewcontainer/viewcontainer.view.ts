namespace $ {

	const error_showed = new WeakMap< Error, $mol_view >()
	export class $milkywaystd_viewcontainer extends $mol_view {

		loaderElement:any = null;
		addLoaderElement(){
			if(!this.loaderElement){
				this.loaderElement = this.getLoaderElement();
			}
			
			this.dom_node().parentNode?.insertBefore(this.loaderElement,this.dom_node());
			this.loaderElement.appendChild(this.dom_node());
		}
		removeLoaderElement(){
			
			this.dom_node().parentNode?.parentNode?.insertBefore(this.dom_node(),this.loaderElement);
			this.loaderElement?.remove();
		}
		getLoaderElement()
		{
			const templateInner = $mol_dom_context.document.querySelector("#loader-container");
			
			return templateInner?templateInner.children.item(0)?.cloneNode(true):null;
		}
		@ $mol_mem
		loading(value?:boolean):boolean {
			if(undefined !== value){
				if(value){
					this.addLoaderElement();
				}
				else {
					this.removeLoaderElement();
				}
				return value
			}
			return false;
		}
		
		@ $mol_mem
		override dom_tree( next? : Element ) : Element {
			const node = this.dom_node( next )
			
			render: try {

				$mol_dom_render_attributes( node , { mol_view_error : null } )
				
				try {
				
					this.render()
					if(this.loading()){
						this.loading(false)
					}
					
					
				} finally {
					
					for( let plugin of this.plugins() ) {
						if( plugin instanceof $mol_plugin ) {
							plugin.dom_tree()
						}
					}
					
				}
				
			} catch( error: any ) {
				
				$mol_fail_log( error )
				
				$mol_dom_render_attributes( node , { mol_view_error : error.name || error.constructor.name } )
				
				if( error instanceof Promise ) {
					if(!this.loading()){
						this.loading(true)
					}
					break render
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
