namespace $.$$ {
	
	$mol_style_define( $mws_data_renderer_table, {
		
		height: '100%',
		minWidth: 0,
		maxWidth: '100%',
		
		Body: {
			minWidth: 0,
			maxWidth: '100%',
			overflow: 'hidden',
		},
		
		Table: {
			flex: {
				grow: 1,
				shrink: 1,
			},
			minWidth: 0,
			maxWidth: '100%',
			overflow: 'auto',
			overscrollBehaviorX: 'contain',
			webkitOverflowScrolling: 'touch',
		},
		
		Header_cell: {
			flex: {
				direction: 'column',
			},
		},
		
		Header_cell_content: {
			display: 'flex',
			alignItems: 'center',
		},
		
		Header_filter: {
			minWidth: '6rem',
		},
		
		Column_row: {
			alignItems: 'center',
			padding: $mol_gap.text,
		},
		
		Column_label: {
			flex: {
				grow: 1,
			},
		},
		
	} )
	
}
