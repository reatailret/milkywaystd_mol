namespace $
{
    export class $mws_data_renderer_row extends $.$mol_row
    {

        @$mol_mem
        data( next?: $mws_data_source_item ): $mws_data_source_item | null
        {
            return next ?? null!
        }

    }
    export class $mws_data_renderer_cell extends $.$mol_view
    {
        bind_cell_render_logic( col: $mws_data_column_config<any>, data: $mws_data_source_item )
        {
            console.log( 'bind_row_render_logic root', col, data )
        }
    }
}