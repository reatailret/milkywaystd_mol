namespace $.$$
{
	export class $mws_data_book extends $.$mws_data_book
	{
		
		auto()
		{
			
			this.Datasource().param_base( this.param_base() )
		}
		@$mol_mem
		override list_tools() {
			return [
				... this.show_column_config() ? [ this.Columns_enable() ] : [],
				this.Filter_enable(),
				this.Add_btn(),
			]
		}
		
		@$mol_mem
		add_btn_arg(): Record<string, string>
		{
			return {
				[ this.selected_key() ]: 'new',
				[this.param()]: 'edit'
			}
		}
		override param() {
			return `${this.param_base()}_${super.param()}`
		}
		override filter_param_name() {
			return this.param_base() + '_' + super.filter_param_name()
		}

		override columns_param_name() {
			return this.param_base() + '_' + super.columns_param_name()
		}
		filter_enabled() {
			return this.$.$mol_state_arg.value(this.filter_param_name()) !== null
		}
		columns_enabled() {
			return this.$.$mol_state_arg.value(this.columns_param_name()) !== null
		}
		/**
		 * Переопределяем pages для отображения формы редактирования
		 */
		@$mol_mem
		override pages()
		{
			const base = [ this.List_page() ]
			
			
			const pages = []
			
			if( this.show_column_config() && this.columns_enabled() )
				{
					pages.push( this.Columns_page() )
				}
			if( this.filter_enabled() )
			{
				pages.push( this.Filter_page() )
			}
			
			
			
			return [ ...base, ...pages, ...super.pages().slice(1) ]
		}
		
		
		
		
		edit_arg(id: string): Record<string, string> {
			return {
				[ this.selected_key() ]: id,
				[this.param()]: 'edit'
			}
		}
		details_arg(id: string): Record<string, string> {
			return {
				[ this.selected_key() ]: id,
				[this.param()]: 'details'
			}
		}
		@$mol_mem
		selected_id( next?: string ): string
		{
			
			const value = this.$.$mol_state_arg.value( this.selected_key(), next ) ?? ''
			
			return value
		}
		@$mol_mem
		selected_key(): string {
			return this.param()+'_selected'
		}

		

		@$mol_action
		override edit_on_saved( id: string )
		{
			this.selected_id( id )
			this.Datasource().reload()
		}

		@$mol_mem
		repo()
		{
			return this.Datasource().repo()
		}



		
		

		column_layout_key() {
			return `$mws_data_book.column_layout.${ this.Datasource().storage_key() }`
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
		col_ids() {
			return this.column_layout().filter( col => col.visible ).map( col => col.id )
		}

		@$mol_mem
		override column_config_rows() {
			return this.column_layout().map( col => this.Column_row( col.id ) )
		}

		@$mol_mem_key
		column( id: string ) {
			return this.Datasource().columns().find( col => col.id === id )
		}

		override column_title( id: string ): string {
			return this.column( id )?.title ?? ''
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
		filter_temp_bootstrap(): number {
			const open = this.$.$mol_state_arg.value( this.param_base() + '_filter' )
			if( open ) {
				this.temp_filters({ ...this.Datasource().filters() } as Record<string, string>)
				return 1
			}
			this.temp_filters({})
			return 0
		}

		@$mol_mem
		temp_filters( next?: Record<string, string> ): Record<string, string> {
			return next ?? {}
		}

		@$mol_mem_key
		override filter_value( id: string, next?: string ): string {
			this.filter_temp_bootstrap()
			if( next === undefined ) {
				return this.temp_filters()[ id ] ?? ''
			}
			const mut = this.$.$mol_mutable( this.temp_filters() )
			mut[ id ]( () => next )
			this.temp_filters( mut() )
			return this.temp_filters()[ id ]
		}

		@$mol_action
		override filter_apply() {
			this.Datasource().filters( this.temp_filters() )
		}

		@$mol_action
		override filter_clear() {
			this.temp_filters({})
			this.Datasource().filters({})
		}
		@$mol_action
		public delete(id:string){
			if(!this.$.$mol_wire_sync(this.$.$mol_dom_context).confirm('Удалить запись?'))
			{
				return false;
			}
		    this.Datasource().repo().remove(id)
			if( this.selected_id() == id ) this.selected_id( '' )
			
			this.$.$mol_dom_context.alert('Удалено '+id)

		}

		@$mol_mem
		override edit_entity()
		{
			const id_str = this.selected_id()
			if( !id_str ) return null

			let entity = null

			if( id_str === 'new' )
			{
				entity = this.repo().new_entity()
			} else
			{
				entity = this.repo().entity(id_str)
				
				
				entity.id( id_str )
				const data = entity.data()
				if( data )
				{
					entity.draft( data )
				}
			}

			

			return entity
		}

		@$mol_mem
		override details_entity()
		{
			const id_str = this.selected_id()
			if( !id_str ) return null

			let entity = null

			
			entity = this.repo().entity(id_str)
				

			return entity
		}
		@$mol_mem_key
		details_entity_field( field: string )
		{
			const entity = this.details_entity()
			if( !entity ) return null
			return entity.field( field )
		}

		override bind_cell_render_logic(col: $mws_data_column_config<any>, item: $mws_data_demo_memory_product) {
			
			this.Delete_btn(item.id).click = $mol_wire_sync( ()=> { (this as  unknown as $mws_data_book).delete(item.id) })
			
		}
		@$mol_mem
		override page_text(): string {
			this.limit()
			this.offset1()
			const page = this.Datasource().page()
			const total = this.Datasource().page_count()
			const count = this.Datasource().total()
			
			return `Page ${page} of ${total} (${count} items)`
		}
		@$mol_mem
		offset_param_name() {
			return this.param_base() + '_offset'
		}
		@$mol_mem
		override offset(next?: number): number {
			
			return parseInt(this.$.$mol_state_arg.value( this.offset_param_name(), next === undefined ? undefined : next.toString() ) as string | null | undefined ?? '0')
		}
		@$mol_mem
		offset1(next?: number): number {
			
			return this.Datasource().offset(parseInt(this.$.$mol_state_arg.value( this.offset_param_name(), next === undefined ? undefined : next.toString() ) as string | null | undefined ?? '0'))
		}
		limit_param_name() {
			return this.param_base() + '_limit'
		}
		@$mol_mem
		override limit(next?: number): number {
			
			if(next !== undefined) {
				this.offset(0)
			}

			return parseInt(this.$.$mol_state_arg.value( this.limit_param_name(),next === undefined ? undefined : next.toString() ) as string | null | undefined ?? '10')
		}
		@$mol_mem
		page_prev_arg(): Record<string, string> {
			return {
				[this.offset_param_name()]: (this.offset() - this.limit()).toString()
			}
		}
		@$mol_mem
		page_next_arg(): Record<string, string> {
			return {
				[this.offset_param_name()]: (this.offset() + this.limit()).toString()
			}
		}
		@$mol_mem
		override page_prev_enabled(): boolean {
			return this.Datasource().page() > 1
		}
		@$mol_mem
		override page_next_enabled(): boolean {
			return this.Datasource().page() < this.Datasource().page_count()
		}
		
		

		
		
	}

	

	
}
