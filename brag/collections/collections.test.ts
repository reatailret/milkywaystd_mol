namespace $ {

	type testCollection = {
		id: string
		name: string
		description: string | null
		created_at: string
		document_count: number
	}

	const items: readonly testCollection[] = [
		{
			id: '11111111-1111-1111-1111-111111111111',
			name: 'Philosophy',
			description: 'Books',
			created_at: '2026-01-01T00:00:00Z',
			document_count: 2,
		},
		{
			id: '22222222-2222-2222-2222-222222222222',
			name: 'History',
			description: null,
			created_at: '2026-01-02T00:00:00Z',
			document_count: 0,
		},
	]

	const page = {
		items,
		total: 2,
		limit: 10,
		offset: 0,
	}

	const created: testCollection = {
		id: '33333333-3333-3333-3333-333333333333',
		name: 'New',
		description: 'Fresh',
		created_at: '2026-01-03T00:00:00Z',
		document_count: 0,
	}

	function make_repo() {
		const repo = new $mws_brag_collections_repo()

		repo.$ = $mol_ambient( {
			$mol_fetch: Object.assign( {}, $mol_fetch, {
				success: ( request: RequestInfo, init?: RequestInit ) => {
					const method = ( init?.method ?? 'GET' ).toUpperCase()
					if( method === 'DELETE' ) {
						return {
							status: (): 'success' => 'success',
							code: (): number => 204,
						}
					}
					return $mol_fetch.success( request, init )
				},
				json: ( request: RequestInfo, init?: RequestInit ) => {
					const url = String( request )
					const method = ( init?.method ?? 'GET' ).toUpperCase()

					if( method === 'POST' ) {
						return { ...created, ...JSON.parse( String( init?.body ) ) }
					}
					if( method === 'PATCH' ) {
						const id = url.split( '/' ).pop()!
						const base = items.find( c => c.id === id ) ?? items[ 0 ]
						return { ...base, ...JSON.parse( String( init?.body ) ) }
					}

					const one = url.match( /\/collections\/([0-9a-f-]+)$/i )
					if( one ) {
						return items.find( c => c.id === one[ 1 ] ) ?? created
					}
					return { ...page }
				},
			} ),
		} )

		return repo
	}

	$mol_test( {

		'url list with filters and sort'() {
			const repo = new $mws_brag_collections_repo()
			repo.offset( 0 )
			repo.limit( 10 )
			repo.filters( { name: 'Phil', q: 'book' } )
			repo.sort( { field: 'name', order: 'asc' } )

			$mol_assert_equal(
				'http://localhost:8080/collections?name=Phil&q=book&sort=name&order=asc&offset=0&limit=10',
				repo.url_list(),
			)
		},

		'pack create and update omit readonly fields'() {
			const repo = new $mws_brag_collections_repo()
			$mol_assert_equal(
				{ name: 'A', description: 'B' },
				repo.pack_create( {
					id: 'x',
					name: 'A',
					description: 'B',
					created_at: 'now',
					document_count: 9,
				} ),
			)
			$mol_assert_equal(
				{ name: 'A' },
				repo.pack_update( { name: 'A', document_count: 3 } ),
			)
		},

		'list unpacks page items'() {
			const repo = make_repo()
			$mol_assert_equal( items, repo.list() )
			$mol_assert_equal( {
				total: 2,
				offset: 0,
				limit: 10,
			}, repo.list_meta() )
		},

		'one by id'() {
			const repo = make_repo()
			$mol_assert_equal( items[ 0 ], repo.item( items[ 0 ].id ) )
		},

		'create'() {
			const repo = make_repo()
			repo.list()
			const item = repo.create( { name: 'New', description: 'Fresh' } )
			$mol_assert_equal( 'New', item.name )
			$mol_assert_equal( created.id, item.id )
		},

		'update'() {
			const repo = make_repo()
			repo.list()
			const updated = repo.update( items[ 0 ].id, { name: 'Renamed' } )
			$mol_assert_equal( 'Renamed', updated.name )
		},

		'remove 204'() {
			const repo = make_repo()
			repo.list()
			$mol_assert_equal( 2, repo.list().length )
			repo.remove( items[ 0 ].id )
			$mol_assert_equal( 1, repo.list().length )
		},

	} )
}
