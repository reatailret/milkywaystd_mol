namespace $.$$ {
	
	export class $mws_data_renderer_table extends $.$mws_data_renderer_table {
		
		@$mol_mem
		override header_cells(): readonly any[] {
			const columns = this.Datasource().columns()
			return columns.map((col, idx) => this.Header_cell(idx))
		}
		
		override header_cell_title(idx: number): string {
			const columns = this.Datasource().columns()
			return columns[idx]?.title ?? ''
		}
		
	override header_sort_icon(idx: number): string {
		const columns = this.Datasource().columns()
		const col = columns[idx]
		if (!col?.sortable) return ''
		
		const sort = this.Datasource().sort()
		if (sort?.field === col.field) {
			return sort?.order === 'asc' ? '▲' : '▼'
		}
		
		return '⇅'
	}
		
		override header_sort_toggle(idx: number) {
			const columns = this.Datasource().columns()
			const col = columns[idx]
			if (!col?.sortable || !col.field) return
			
			this.Datasource().sort_toggle(String(col.field))
		}
		
		@$mol_mem
		override data_rows(): readonly any[] {
			
			// Данные
			return  this.Datasource().list().map((item) => 
			{
				return this.Rowrenderer(item)
			})
			
		}
		
		data_row_arg(row_idx: number): Record<string, any> {
			return {}
		}
		
		@$mol_mem
		data_map(){
			const map = {} as Record<string, any>
			const rows = this.Datasource().list()
			for(const row of rows){
				map[row.id] = row
			}
			return map
		}

		@$mol_mem_key
		item(id: string): Record<string, any> {
			return this.data_map()[id]??{}
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

		override Rowrenderer(item) {
			const row = $mws_data_renderer_table_row.make({})
				row.data(item)
				row.Datasource(this.Datasource())
				return row
		}
	}

	export class $mws_data_renderer_table_row extends $.$mws_data_renderer_table_row {
		@$mol_mem
		override cells(): readonly any[] {
			return this.Datasource()?.columns().map((col) =>{ 
				if(col.renderer){
					return col.renderer(this.data())
				}
				return this.Cell(col.id)
			}) ?? []
		}
		@$mol_mem_key
		override cell_text(col_id: string): any {
			if(!this.data()) return ''
			return this.data()[col_id]??''
		}
	}
}

