namespace $.$$ {
	export class $mws_data_demo_memory extends $.$mws_data_demo_memory {
		bind_cell_render_logic(col: $mws_data_column_config<any>, item: $mws_data_demo_memory_product) {
			this.Edit_btn(item.id).arg = () => (this.table_row_arg(item.id))
			this.Delete_btn(item.id).click = $mol_wire_sync( ()=> { (this as  unknown as $mws_data_book).delete(item.id) })
			
		}
	}
}
