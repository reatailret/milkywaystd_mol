namespace $.$$ {
	
	export class $mws_data_renderer_table extends $.$mws_data_renderer_table {

		@$mol_mem_key
		column( id: string ) {
			return this.Datasource().columns().find( col => col.id === id )
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

		header_sort_enabled( id: string ): boolean {
			const col = this.column( id )
			return !!( col?.sortable && col.field )
		}
		
		@$mol_mem_key
		override header_filter_display( id: string ): string {
			return this.header_filter_enabled( id ) ? '' : 'none'
		}
		
		@$mol_mem_key
		override header_sort_display( id: string ): string {
			return this.header_sort_enabled( id ) ? '' : 'none'
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
		
		
		
	}
	
}
