namespace $.$$ {
	
	export class $mws_data_renderer_table extends $.$mws_data_renderer_table {
		
		@$mol_mem_key
		column( id: string ) {
			return this.Datasource().columns().find( col => col.id === id )
		}
		
		column_layout_key() {
			return `$mws_data_renderer_table.column_layout.${ this.Datasource().entity_name() }`
		}
		
		@$mol_mem
		column_layout( next?: readonly { id: string, visible: boolean }[] ) {
			const key = this.column_layout_key()
			if( next !== undefined ) {
				this.$.$mol_state_local.value( key, next )
				return next
			}
			
			const cols = this.Datasource().columns()
			const stored = this.$.$mol_state_local.value<readonly { id: string, visible: boolean }[]>( key )
			const known = new Set( cols.map( col => col.id ) )
			const merged = [] as { id: string, visible: boolean }[]
			const seen = new Set<string>()
			
			if( stored ) {
				for( const item of stored ) {
					if( !known.has( item.id ) ) continue
					merged.push({ id: item.id, visible: item.visible })
					seen.add( item.id )
				}
			}
			
			for( const col of cols ) {
				if( seen.has( col.id ) ) continue
				merged.push({ id: col.id, visible: true })
			}
			
			return merged
		}
		
		@$mol_mem
		override col_ids() {
			return this.column_layout().filter( col => col.visible ).map( col => col.id )
		}
		
		@$mol_mem
		override column_config_rows() {
			return this.column_layout().map( col => this.Column_row( col.id ) )
		}
		
		@$mol_mem_key
		override column_visible_value( id: string, next?: string ) {
			if( next !== undefined ) {
				const visible = next !== 'off'
				if( !visible ) {
					const shown = this.column_layout().filter( col => col.visible )
					if( shown.length <= 1 ) return 'on'
				}
				this.column_layout( this.column_layout().map( col => col.id === id ? { ...col, visible } : col ) )
				return visible ? 'on' : 'off'
			}
			return this.column_layout().find( col => col.id === id )?.visible === false ? 'off' : 'on'
		}
		
		column_index( id: string ) {
			return this.column_layout().findIndex( col => col.id === id )
		}
		
		override column_move_up_enabled( id: string ) {
			return this.column_index( id ) > 0
		}
		
		override column_move_down_enabled( id: string ) {
			const index = this.column_index( id )
			return index >= 0 && index < this.column_layout().length - 1
		}
		
		@$mol_action
		override column_move_up( id: string ) {
			const list = [ ...this.column_layout() ]
			const index = list.findIndex( col => col.id === id )
			if( index <= 0 ) return
			const [ item ] = list.splice( index, 1 )
			list.splice( index - 1, 0, item )
			this.column_layout( list )
		}
		
		@$mol_action
		override column_move_down( id: string ) {
			const list = [ ...this.column_layout() ]
			const index = list.findIndex( col => col.id === id )
			if( index < 0 || index >= list.length - 1 ) return
			const [ item ] = list.splice( index, 1 )
			list.splice( index + 1, 0, item )
			this.column_layout( list )
		}
		
		@$mol_mem
		override records() {
			return this.data_map()
		}
		
		@$mol_mem
		data_map() {
			const map = {} as Record< string, any >
			const key = this.Datasource().repo().id_key()
			for( const row of this.Datasource().list() ) {
				map[ String( row[ key ] ) ] = row
			}
			return map
		}
		
		@$mol_mem_key
		item( id: string ): Record< string, any > {
			return this.data_map()[ id ] ?? {}
		}
		
		override header_cell_title( id: string ): string {
			return this.column( id )?.title ?? ''
		}
		
		override header_sort_icon( id: string ): string {
			const col = this.column( id )
			if( !col?.sortable ) return ''
			
			const sort = this.Datasource().sort()
			if( sort?.field === col.field ) {
				return sort?.order === 'asc' ? '▲' : '▼'
			}
			
			return '⇅'
		}
		
		@$mol_action
		override header_sort_toggle( id: string ) {
			const col = this.column( id )
			if( !col?.sortable || !col.field ) return
			
			this.Datasource().sort_toggle( String( col.field ) )
		}
		
		header_filter_enabled( id: string ): boolean {
			const col = this.column( id )
			return !!( col?.filterable && col.field )
		}
		
		@$mol_mem_key
		override header_filter_display( id: string ): string {
			return this.header_filter_enabled( id ) ? '' : 'none'
		}
		
		@$mol_mem_key
		override header_filter_query( id: string, next?: string ): string {
			const col = this.column( id )
			const field = col?.field != null ? String( col.field ) : ''
			if( next !== undefined ) {
				if( field ) {
					if( next === '' ) this.Datasource().filter_remove( field )
					else this.Datasource().filter_set( field, next )
					this.Datasource().offset( 0 )
				}
				return next
			}
			if( !field ) return ''
			const value = this.Datasource().filters()[ field ]
			return value == null ? '' : String( value )
		}
		
		@$mol_mem_key
		override cell_content( id: { row: string[], col: string } ) {
			const col = this.column( id.col )
			const field = col?.field != null ? String( col.field ) : id.col
			const rec = this.item( String( id.row[ id.row.length - 1 ] ) )
			return [ rec?.[ field ] ]
		}
		
		@$mol_mem_key
		override Cell( id: { row: string[], col: string } ): $mol_view {
			const col = this.column( id.col )
			if( col?.renderer ) {
				const rec = this.item( String( id.row[ id.row.length - 1 ] ) )
				const item_id = rec?.[ this.Datasource().repo().id_key() ]
				const cell = col.renderer( item_id )
				cell.bind_cell_render_logic( col, rec )
				return cell
			}
			
			const grid = this.Table()
			const value = this.cell_content( id )[ 0 ]
			if( typeof value === 'number' ) return grid.Cell_number( id )
			return grid.Cell_text( id )
		}
		
		override page_text(): string {
			const page = this.Datasource().page() + 1
			const total = this.Datasource().page_count()
			const count = this.Datasource().total()
			return `Page ${page} of ${total} (${count} items)`
		}
		
		override page_prev_enabled(): boolean {
			return this.Datasource().page() > 0
		}
		
		override page_next_enabled(): boolean {
			return this.Datasource().page() < this.Datasource().page_count() - 1
		}
		
		override page_prev() {
			this.Datasource().page_prev()
		}
		
		override page_next() {
			this.Datasource().page_next()
		}
		
	}
	
}
