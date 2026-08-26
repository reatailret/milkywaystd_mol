namespace $.$$ {
	export class $mws_data_demo_rest extends $.$mws_data_demo_rest {
		@$mol_mem_key
		override actions_renderer(item: $mws_data_demo_rest_product) {
			this.Edit_btn(item.id).arg = () => (this.table_row_arg(`${ item.id }`))
			this.Delete_btn(item.id).click = $mol_wire_sync( function(this:$mws_data_book) { this.delete(`${ item.id }`) }.bind(this))
			return this.Actions(item.id)
		}
	}
}
