namespace $
{

	export class $mws_viewcontainer extends $mol_view
	{

		public handle_errors = false

		loaderElement: any = null

		addLoaderElement()
		{
			if( !this.loaderElement )
			{
				this.loaderElement = this.getLoaderElement()
			}

			this.dom_node().parentNode?.insertBefore( this.loaderElement, this.dom_node() )
			this.loaderElement.appendChild( this.dom_node() )
		}

		removeLoaderElement()
		{

			this.dom_node().parentNode?.parentNode?.insertBefore( this.dom_node(), this.loaderElement )
			this.loaderElement?.remove()
		}

		getLoaderElement()
		{
			const templateInner = $mol_dom_context.document.querySelector( '#loader-container' )

			return templateInner ? templateInner.children.item( 0 )?.cloneNode( true ) : null
		}

		@ $mol_mem
		loading( value?: boolean ): boolean
		{
			if( undefined !== value )
			{
				if( value )
				{
					this.addLoaderElement()
				} else
				{
					this.removeLoaderElement()
				}
				return value
			}
			return false
		}

		@ $mol_mem
		override dom_tree( next? : Element ) : Element
		{
			return $mws_view_dom_tree_impl( this, next, {
				handle_errors: $mws_view_flag( this, 'handle_errors' ),
				before_render_end: () =>
				{
					if( this.loading() ) this.loading( false )
				},
				on_promise: () =>
				{
					if( !this.loading() ) this.loading( true )
				},
			} )
		}

	}

}
