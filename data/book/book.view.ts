namespace $.$$
{
	export class $mws_data_book extends $.$mws_data_book
	{

		/**
		 * Переопределяем pages для отображения формы редактирования
		 */
		@$mol_mem
		add_btn_arg(): Record<string, string>
		{
			return {
				[ this.entity_name() + '_edit' ]: 'new'
			}
		}

		@$mol_mem
		override pages()
		{
			const base = [ this.List_page() ]
			const edit_id = this.edit_id()

			if( edit_id )
			{
				return [ ...base, this.Edit_page() ]
			}

			return base
		}
		

		/**
		 * ID редактируемого элемента из URL параметра (пусто = форма закрыта, 'new' = создание нового)
		 */
		@$mol_mem
		edit_id( next?: string ): string
		{
			
			return this.$.$mol_state_arg.value( this.edit_key(), next ) ?? ''
		}
		@$mol_mem
		edit_key(): string {
			return this.entity_name() + '_edit'
		}

		@$mol_action
		override edit_on_saved( id: string )
		{
			this.edit_id( id )
			this.Datasource().reload()
		}

		@$mol_mem
		repo()
		{
			return this.Datasource().repo()
		}



		/**
		 * Возвращает arg для строки таблицы (для $mol_link)
		 */
		@$mol_mem_key
		public table_row_arg( id: string ): Record<string, string>
		{
			return { [this.edit_key()]: id }
		}

		override edit_close()
		{
			this.edit_id( '' )
		}

		@$mol_action
		public delete(id:string){
			if(!this.$.$mol_wire_sync(this.$.$mol_dom_context).confirm('Удалить запись?'))
			{
				return false;
			}
		    this.Datasource().repo().remove(id)
			this.$.$mol_dom_context.alert('Удалено '+id)

		}

		@$mol_mem
		override edit_entity()
		{
			const id_str = this.edit_id()
			if( !id_str ) return null

			let entity = null

			if( id_str === 'new' )
			{
				entity = this.repo().new_entity()
			} else
			{
				const exists = this.repo().dataKeys()[id_str]
				if(exists) {
					// use from list cache
					this.repo().item(id_str,exists)
				}
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
		
	}

	
}
