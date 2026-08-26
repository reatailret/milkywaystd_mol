namespace $ {

	type testProduct = { id: number, title: string, price: number, category?: string }

	const products: testProduct[] = [
		{ id: 16, title: 'Hyaluronic Acid Serum', price: 19, category: 'skincare' },
		{ id: 17, title: 'Tree Oil 30ml', price: 12, category: 'skincare' },
		{ id: 18, title: 'Oil Free Moisturizer', price: 40, category: 'skincare' },
		{ id: 19, title: 'Skin Beauty Serum', price: 46, category: 'skincare' },
		{ id: 20, title: 'Freckle Treatment Cream', price: 70, category: 'skincare' },
	]

	const resp = {
		products,
		total: 100,
		skip: 15,
		limit: 5,
	}

	const new_item: testProduct = { id: 22, title: 'new item', price: 200 }
	const server_item: testProduct = { id: 21, title: 'server item', price: 21 }

	function make_repo() {
		const repo = new $mws_data_repo_rest<testProduct>()

		const context_mock = $mol_ambient( {
			$mol_fetch: Object.assign( {}, $mol_fetch, {
				json: ( request: RequestInfo, init: RequestInit ) => {
					const url = String( request )
					const method = init?.method ?? 'GET'

					if( method === 'POST' ) return { ...new_item }
					if( method === 'DELETE' ) return ''
					if( method === 'PATCH' || method === 'PUT' ) {
						const id = Number( url.split( '/' ).pop() )
						const base = products.find( p => p.id === id ) ?? products[ 0 ]
						return { ...base, ...JSON.parse( init.body as string ) }
					}

					// GET
					const one = url.match( /\/products\/(\d+)$/ )
					if( one ) {
						const id = Number( one[ 1 ] )
						if( id === 21 ) return { ...server_item }
						return products.find( p => p.id === id )
					}
					return { ...resp }
				},
			} ),
		} )

		repo.$ = context_mock
		repo.uri( 'https://dummyjson.com/' )
		repo.resource( 'products' )
		repo.list_unpack = ( data: any ) => data.products
		repo.meta_unpack = ( data: any ) => ( {
			total: data.total,
			offset: data.skip,
			limit: data.limit,
		} )

		return repo
	}

	$mol_test( {

		'url list with params'() {
			const repo = new $mws_data_repo_rest<testProduct>()
			repo.uri( 'https://dummyjson.com/' )
			repo.resource( '/products/' )
			repo.offset( 5 )
			repo.limit( 5 )
			repo.filters( { category: 'skincare' } )
			repo.sort( { field: 'price', order: 'desc' } )

			$mol_assert_equal(
				'https://dummyjson.com/products?category=skincare&sort=price&order=desc&offset=5&limit=5',
				repo.url_list(),
			)
		},

		'url one'() {
			const repo = new $mws_data_repo_rest<testProduct>()
			repo.uri( 'https://dummyjson.com' )
			repo.resource( 'products' )

			$mol_assert_equal( 'https://dummyjson.com/products/16', repo.url_one( 16 ) )
		},

		'list and meta'() {
			const repo = make_repo()

			$mol_assert_equal( products, repo.list() )
			$mol_assert_equal( 5, repo.list().length )
			$mol_assert_equal( {
				total: 100,
				offset: 15,
				limit: 5,
			}, repo.list_meta() )
		},

		'one by id (fetch)'() {
			const repo = make_repo()

			$mol_assert_equal( server_item, repo.item( 21 ) )
			$mol_assert_equal( server_item, repo.one_fn( 21 ) )
		},

		'update'() {
			const repo = make_repo()
			repo.list()

			const updated = repo.update( 16, { price: 99 } )

			$mol_assert_equal( 99, updated.price )
			$mol_assert_equal( 99, repo.item( 16 ).price )
		},

		'create'() {
			const repo = make_repo()
			repo.list()

			const created = repo.create( { title: 'new item', price: 200 } )

			$mol_assert_equal( new_item, created )
		},

		'remove'() {
			const repo = make_repo()
			repo.list()
			$mol_assert_equal( 5, repo.list().length )

			repo.remove( 16 )

			$mol_assert_equal( 4, repo.list().length )
		},

		'list reload'() {
			const repo = make_repo()
			repo.list()
			repo.remove( 16 )
			$mol_assert_equal( 4, repo.list().length )

			repo.list_reload()
			$mol_assert_equal( 5, repo.list().length )
		},

		'list pending false after load'() {
			const repo = make_repo()
			repo.list()

			$mol_assert_equal( false, repo.list_pending() )
		},

	} )
}
