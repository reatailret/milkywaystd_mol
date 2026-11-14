namespace $ {

	const row_id = '$' + 'id'
	const created_at = '$' + 'createdAt'

	type Row = { title: string, price: number } & Record< string, any >

	const rows: Row[] = [
		{ [ row_id ]: 'a', title: 'Alpha', price: 10 },
		{ [ row_id ]: 'b', title: 'Beta', price: 20 },
	]

	function make_repo() {
		const calls: { method: string, params: any }[] = []

		const context = $mol_ambient( {
			$mws_lib_appwrite_sdk: Object.assign( {}, $mws_lib_appwrite_sdk, {
				Client: class {
					setEndpoint() { return this }
					setProject() { return this }
					setKey() { return this }
				},
				TablesDB: class {
					listRows( databaseId: string, tableId: string, queries?: string[] ) {
						calls.push( { method: 'listRows', params: { databaseId, tableId, queries } } )
						return { total: 40, rows }
					}
					getRow( databaseId: string, tableId: string, rowId: string ) {
						calls.push( { method: 'getRow', params: { databaseId, tableId, rowId } } )
						return rows.find( row => row[ row_id ] === rowId ) ?? { [ row_id ]: rowId, title: 'server', price: 1 }
					}
					createRow( databaseId: string, tableId: string, rowId: string, data: Record< string, any > ) {
						calls.push( { method: 'createRow', params: { databaseId, tableId, rowId, data } } )
						return { [ row_id ]: rowId, ...data }
					}
					updateRow( databaseId: string, tableId: string, rowId: string, data: Record< string, any > ) {
						calls.push( { method: 'updateRow', params: { databaseId, tableId, rowId, data } } )
						const base = rows.find( row => row[ row_id ] === rowId ) ?? rows[ 0 ]
						return { ...base, ...data, [ row_id ]: rowId }
					}
					deleteRow( databaseId: string, tableId: string, rowId: string ) {
						calls.push( { method: 'deleteRow', params: { databaseId, tableId, rowId } } )
						return {}
					}
				},
			} ),
		} )

		const repo = new $mws_data_repo_appwrite_tables< Row >()
		repo.$ = context
		repo.database( 'main' )
		repo.table( 'products' )

		return { repo, calls }
	}

	$mol_test( {

		'queries from filters sort and page'() {
			const repo = new $mws_data_repo_appwrite_tables< Row >()
			repo.filters( { category: 'skincare', empty: '' } )
			repo.sort( { field: 'price', order: 'desc' } )
			repo.offset( 5 )
			repo.limit( 5 )

			$mol_assert_equal( [
				'{"method":"equal","attribute":"category","values":["skincare"]}',
				'{"method":"orderDesc","attribute":"price"}',
				'{"method":"offset","values":[5]}',
				'{"method":"limit","values":[5]}',
			], repo.queries() )
		},

		'list and meta'() {
			const { repo, calls } = make_repo()

			$mol_assert_equal( rows, repo.list() )
			$mol_assert_equal( {
				total: 40,
				offset: 0,
				limit: 10,
			}, repo.list_meta() )
			$mol_assert_equal( 'listRows', calls[ 0 ].method )
			$mol_assert_equal( 'main', calls[ 0 ].params.databaseId )
			$mol_assert_equal( 'products', calls[ 0 ].params.tableId )
		},

		'one by id'() {
			const { repo } = make_repo()

			$mol_assert_equal( rows[ 1 ], repo.item( 'b' ) )
			$mol_assert_equal( rows[ 1 ], repo.one_fn( 'b' ) )
		},

		'create strips system fields and keeps given id'() {
			const { repo, calls } = make_repo()
			repo.list()

			const draft: Row = { title: 'Gamma', price: 30 }
			draft[ row_id ] = 'c'
			draft[ created_at ] = 'nope'
			const created = repo.create( draft )

			$mol_assert_equal( 'c', created[ row_id ] )
			$mol_assert_equal( 'Gamma', created.title )
			$mol_assert_equal( {
				databaseId: 'main',
				tableId: 'products',
				rowId: 'c',
				data: { title: 'Gamma', price: 30 },
			}, calls.at( -1 )!.params )
		},

		'create without id asks SDK for one'() {
			const { repo, calls } = make_repo()
			repo.list()

			const created = repo.create( { title: 'Delta', price: 40 } )

			const params = calls.at( -1 )!.params
			$mol_assert_equal( params.rowId, created[ row_id ] )
			$mol_assert_equal( true, params.rowId.length > 0 )
			$mol_assert_equal( { title: 'Delta', price: 40 }, params.data )
		},

		'update'() {
			const { repo, calls } = make_repo()
			repo.list()

			const patch: Partial< Row > = { price: 99 }
			patch[ row_id ] = 'a'
			const updated = repo.update( 'a', patch )

			$mol_assert_equal( 99, updated.price )
			$mol_assert_equal( 99, repo.item( 'a' )!.price )
			$mol_assert_equal( { price: 99 }, calls.at( -1 )!.params.data )
			$mol_assert_equal( 'a', calls.at( -1 )!.params.rowId )
		},

		'remove'() {
			const { repo, calls } = make_repo()
			repo.list()
			$mol_assert_equal( 2, repo.list().length )

			repo.remove( 'a' )

			$mol_assert_equal( 1, repo.list().length )
			$mol_assert_equal( 'a', calls.at( -1 )!.params.rowId )
		},

	} )

}
