namespace $
{
	
	export class $milkywaystd_view extends $mol_view {

		protected mol_dom_render_children_after(){

		}
		@ $mol_mem
		render() {

			const node = this.dom_node_actual()

			const sub = this.sub_visible()
			if( !sub ) return
			
			const nodes = sub.map( child => {
				if( child == null ) return null
				return ( child instanceof $mol_view )
					? child.dom_node()
					: child instanceof $mol_dom_context.Node
					? child
					: String( child )
			})
			
			$mol_dom_render_children( node , nodes )
			
			for( const el of sub ) if( el && typeof el === 'object' && 'dom_tree' in el ) el['dom_tree']()

			$mol_dom_render_fields( node , this.field() )

			this.mol_dom_render_children_after()
			
		}
	}
}
