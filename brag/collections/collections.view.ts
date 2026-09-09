namespace $.$$ {
	export class $mws_brag_collections extends $.$mws_brag_collections {

		bind_cell_render_logic(col: $mws_data_column_config<any>, item: $mws_brag_collections_row) {
			this.Edit_btn(item.id).arg = () => this.table_row_arg(item.id)
			this.Delete_btn(item.id).click = $mol_wire_sync( () => {
				(this as unknown as $mws_data_book).delete(item.id)
			} )
		}

	}
}
