namespace $ {

	const products: $mws_data_demo_rest_product[] = [
		{ id: 1, title: 'Essence Mascara', price: 10, stock: 5, category: 'beauty' },
		{ id: 2, title: 'Eyeshadow Palette', price: 20, stock: 30, category: 'beauty' },
		{ id: 3, title: 'Powder Canister', price: 15, stock: 89, category: 'beauty' },
		{ id: 4, title: 'Red Lipstick', price: 13, stock: 91, category: 'beauty' },
		{ id: 5, title: 'Red Nail Polish', price: 9, stock: 119, category: 'beauty' },
		{ id: 6, title: 'Calvin Klein CK One', price: 50, stock: 29, category: 'fragrances' },
		{ id: 7, title: 'Chanel Coco Noir', price: 130, stock: 58, category: 'fragrances' },
		{ id: 8, title: 'Dior Jadore', price: 90, stock: 98, category: 'fragrances' },
		{ id: 9, title: 'Dolce Shine', price: 69, stock: 4, category: 'fragrances' },
		{ id: 10, title: 'Gucci Bloom', price: 80, stock: 40, category: 'fragrances' },
		{ id: 11, title: 'Annibale Desk', price: 1600, stock: 2, category: 'furniture' },
		{ id: 12, title: 'Bedside Table', price: 400, stock: 45, category: 'furniture' },
		{ id: 13, title: 'Knoll Saarinen Chair', price: 500, stock: 10, category: 'furniture' },
		{ id: 14, title: 'Wooden Bathroom Sink', price: 800, stock: 7, category: 'furniture' },
		{ id: 15, title: 'Apple MagSafe Charger', price: 50, stock: 80, category: 'electronics' },
		{ id: 16, title: 'Hyaluronic Acid Serum', price: 19, stock: 110, category: 'skincare' },
		{ id: 17, title: 'Tree Oil 30ml', price: 12, stock: 78, category: 'skincare' },
		{ id: 18, title: 'Oil Free Moisturizer', price: 40, stock: 88, category: 'skincare' },
		{ id: 19, title: 'Skin Beauty Serum', price: 46, stock: 54, category: 'skincare' },
		{ id: 20, title: 'Freckle Treatment Cream', price: 70, stock: 140, category: 'skincare' },
		{ id: 21, title: 'Green Tea Extract', price: 25, stock: 60, category: 'skincare' },
		{ id: 22, title: 'Vitamin C Serum', price: 35, stock: 42, category: 'skincare' },
		{ id: 23, title: 'Wireless Mouse', price: 25, stock: 200, category: 'electronics' },
		{ id: 24, title: 'USB-C Hub', price: 45, stock: 75, category: 'electronics' },
		{ id: 25, title: 'Laptop Stand', price: 55, stock: 33, category: 'electronics' },
	]

	let next_id = 1000

	const reserved = new Set( [ 'skip', 'limit', 'sortBy', 'order' ] )

	function list_response( url: string ) {
		const u = new URL( url, 'https://dummyjson.com' )
		const skip = Number( u.searchParams.get( 'skip' ) ?? 0 )
		const limit = Number( u.searchParams.get( 'limit' ) ?? 10 )
		const sortBy = u.searchParams.get( 'sortBy' )
		const order = u.searchParams.get( 'order' ) ?? 'asc'

		let rows = products.slice()

		for( const [ key, value ] of u.searchParams ) {
			if( reserved.has( key ) || value === '' ) continue
			rows = rows.filter( item => String( ( item as any )[ key ] ) === value )
		}

		if( sortBy ) {
			rows.sort( ( a, b ) => {
				const av = ( a as any )[ sortBy ]
				const bv = ( b as any )[ sortBy ]
				const cmp = av < bv ? -1 : av > bv ? 1 : 0
				return order === 'desc' ? -cmp : cmp
			} )
		}

		return {
			products: rows.slice( skip, skip + limit ),
			total: rows.length,
			skip,
			limit,
		}
	}

	function parse_body( init?: RequestInit ): Partial<$mws_data_demo_rest_product> {
		if( !init?.body ) return {}
		return JSON.parse( String( init.body ) )
	}

	function one_id( url: string ): number | null {
		const match = url.match( /\/products\/(\d+)(?:\?|$)/ )
		return match ? Number( match[ 1 ] ) : null
	}

	$.$mol_fetch = Object.assign( {}, $.$mol_fetch, {

		json( request: RequestInfo, init?: RequestInit ) {
			$.$mol_wait_timeout( 400 )

			const url = String( request )
			const method = ( init?.method ?? 'GET' ).toUpperCase()

			if( method === 'POST' ) {
				const data = parse_body( init )
				const item: $mws_data_demo_rest_product = {
					title: '',
					price: 0,
					stock: 0,
					category: '',
					...data,
					id: next_id++,
				}
				products.push( item )
				return { ...item }
			}

			if( method === 'DELETE' ) {
				const id = one_id( url )
				const index = products.findIndex( p => p.id == id )
				if( index >= 0 ) products.splice( index, 1 )
				return { id, isDeleted: true }
			}

			if( method === 'PATCH' || method === 'PUT' ) {
				const id = one_id( url )
				const index = products.findIndex( p => p.id == id )
				if( index < 0 ) $mol_fail( new Error( 'Product not found' ) )
				const updated = { ...products[ index ], ...parse_body( init ), id: products[ index ].id }
				products[ index ] = updated
				return { ...updated }
			}

			const id = one_id( url )
			if( id !== null && !url.includes( '/add' ) ) {
				const item = products.find( p => p.id == id )
				if( !item ) $mol_fail( new Error( 'Product not found' ) )
				return { ...item }
			}

			return list_response( url )
		},

	} )

}
