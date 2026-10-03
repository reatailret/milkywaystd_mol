namespace $ {

	function source_with_args( $: $, dict: Record<string, string> ) {
		const source = new $mws_data_source()
		source.$ = $.$mol_ambient( {
			$mol_state_arg: Object.assign( {}, $.$mol_state_arg, {
				dict( next?: Record<string, string | null> ) {
					if( next !== undefined ) {
						for( const key in next ) {
							if( next[ key ] == null ) delete dict[ key ]
							else dict[ key ] = String( next[ key ] )
						}
					}
					return dict
				},
				value( key: string, next?: string | null ) {
					if( next !== undefined ) {
						if( next == null ) delete dict[ key ]
						else dict[ key ] = next
					}
					return dict[ key ] ?? null
				},
			} ),
		} )
		source.param_base( 'book' )
		return source
	}

	$mol_test( {

		'filter url keys use q infix not filter infix'( $ ) {
			const dict: Record<string, string> = {}
			const source = source_with_args( $, dict )
			source.filters( { title: 'foo' } )
			$mol_assert_equal( dict[ 'book_q_title' ], 'foo' )
			$mol_assert_equal( 'book_filter_title' in dict, false )
			$mol_assert_equal( source.filter_arg_key( 'title' ), 'book_q_title' )
		},

		'filter window param is not a filter value'( $ ) {
			const dict: Record<string, string> = {
				book_filter: '',
				book_filter_title: 'stale',
				book_q_title: 'foo',
			}
			const source = source_with_args( $, dict )
			$mol_assert_equal( source.filters(), { title: 'foo' } )
		},

	} )
}
