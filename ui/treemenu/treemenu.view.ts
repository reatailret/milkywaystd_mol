namespace $.$$
{

	export type $milkywaystd_ui_treemenu_data_item = { expanded?: boolean, id?: string, label: string, link: string | Record<string, string>, items?: Array<$milkywaystd_ui_treemenu_data_item>, parent?: $milkywaystd_ui_treemenu_data_item | undefined | null }
	export class $milkywaystd_ui_treemenu extends $.$milkywaystd_ui_treemenu
	{

		@$mol_mem
		items( val?: $milkywaystd_ui_treemenu_data_item[] ): readonly $milkywaystd_ui_treemenu_data_item[] 
		{
			return val ?? []
		}
		@$mol_mem
		sub(): readonly $mol_view[]
		{
			const subs = [] as $mol_view[]

			return this.fill( subs, this.items() )
		}
		@$mol_mem_key
		rows_list( id: string )
		{
			return [
				this.Label( id ),
				... this.expanded( id ) ? [ this.Content( id ) ] : []
			]
		}
		@$mol_mem_key
		itemtitle( id: string )
		{
			return this.cache( id ).link ? '' : this.cache( id ).label
		}
		@$mol_mem_key
		linktitle( id: string )
		{
			return this.cache( id ).label
		}

		@$mol_mem_key
		itemexpandable( id: string )
		{
			return this.container( id ).sub().length > 0
		}
		@$mol_mem_key
		linkarg( id: string ):any
		{
			return this.cache( id ).link
		}
		@$mol_mem_key
		Tools( id: string )
		{
			return this.cache( id ).link ? this.subitem_link( id ) : null
		}
		@$mol_mem_key
		TriggerOrLink( id: string )
		{

			return ( ( this.cache( id ).items && this.cache( id ).items?.length ) || !this.cache( id ).link ) ? [ this.Trigger( id ), this.Tools( id ) ] : [ this.subitem_link( id ) ]
		}
		@$mol_action
		reset()
		{
			this.items([]);
			this._idsCache.forEach( ( id ) =>
			{
				this.cache( id, null! )
				this.expanded( id, false )
			} )
			this._idsCache.clear()
		}
		_idsCache = new Set<string>();
		@$mol_mem_key
		cache( id: string, value?: $milkywaystd_ui_treemenu_data_item )
		{
			if( value !== undefined )
			{
				if( value !== null )
				{
					this._idsCache.add( id )
				}
				return value
			}
			return value ?? {} as $milkywaystd_ui_treemenu_data_item
		}

		fill( subs: $.$mol_view[], input: readonly $milkywaystd_ui_treemenu_data_item[] )
		{

			let stack = [ ...input ] as $milkywaystd_ui_treemenu_data_item[]
			let index = 0
			while( stack.length )
			{
				const element = stack.shift()!

				if( element.id === undefined )
				{
					let keyobj = { ...element }
					delete keyobj.parent
					element.id = $mol_key( keyobj )
				}
				let level = element.id
				this.cache( level, { ...element } )
				const item = this.subitem( level )
				if( element.parent )
				{
					this.subcontent( element.parent.id!, [ ...this.subcontent( element.parent.id! ), item ] )
				}
				else
				{
					subs.push( item )
				}
				if( element.items && element.items.length )
				{
					for( let child of element.items )
					{
						( child as $milkywaystd_ui_treemenu_data_item ).parent = element
					}

					stack.push( ...element.items as $milkywaystd_ui_treemenu_data_item[] )
				}
				++index
			}


			return subs
		}
		@$mol_mem_key
		subcontent( id: string, val?: $mol_view[] )
		{
			return val ?? []
		}
		@$mol_mem_key
		expanded( id: string, val?: boolean ): boolean
		{
			$mol_wire_solid()
			if( val !== undefined )
			{
				if( this.cache( id ) )
					this.cache( id ).expanded = val

				return val
			}
			return !!( this.cache( id )?.link && this.subitem_link( id )?.current() ) || !!$mol_mem_cached( () => this.expanded( id ) ) || !!this.cache( id )?.expanded

		}


	}

}

