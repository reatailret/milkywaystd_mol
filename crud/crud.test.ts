namespace $.$$
{
	
	type testProduct = { id: number, title: string, price: number }

	$mol_test( {
		"common"()
		{


			const srv = new $milkywaystd_crud<testProduct>()
			
			const context_mock = $mol_ambient( {
				// ambient context override
				$milkywaystd_fetch: Object.assign({},$milkywaystd_fetch,{
					json: ( request:RequestInfo, params: RequestInit ) =>
					{
						if( params.method === 'PATCH' || params.method === 'PUT' )
						{
							
							return { ...item, ...JSON.parse( params.body as string ) }
						}
						else if( params.method === 'POST' )
						{
							return {...newItem}
						}
						else if( params.method === 'DELETE' )
						{
							return ''
						}
						else
						{
							if( ( request as string ).indexOf( '/21' ) !== -1)
							{
								return {...serverItem}
							}
							else
							{
								return {...resp}
							}
						}
					}
				})
			} )
			srv.$ = context_mock

			srv.apiResource = "products" 
			srv.apiUrl = "https://dummyjson.com/" 
			srv.listDataFunc = ( data ) => data.products
			srv.listMetaFunc = ( data ) => ( {
				total: data.total,
				skip: data.skip,
				limit: data.limit,
			} )
			srv.params( { skip: "5", limit: "5" } )

			$mol_assert_equal(
				"https://dummyjson.com/products?skip=5&limit=5",
				srv.urlList()
			)
			$mol_assert_equal( resp.products, srv.list() )
			$mol_assert_equal( 5, srv.list().length )
			$mol_assert_like(
				{ total: resp.total, skip: resp.skip, limit: resp.limit },
				srv.metaInfo()
			)

			$mol_assert_equal( resp.products[ 0 ], srv.byId( "16" ) )

			// update replace
			srv.updateOne( item.id!, { price: 20 } )
			$mol_assert_equal( 20, srv.byId( `${item.id}`).price )
			$mol_assert_like( {...item, price:555}, srv.replaceOne( item.id!, {...item, price:555} ) )
			$mol_assert_equal( 555, srv.byId( `${item.id}` ).price )

			
			// create
			$mol_assert_like( newItem, srv.create(newItem) )
			$mol_assert_like( serverItem, srv.byServerId(`${serverItem.id}`) )

			// delete
			srv.deleteOne(16)
			$mol_assert_equal(undefined, srv.byId('16'))
			$mol_assert_equal(4, srv.list().length)
			
			// reload
			srv.listReload();
			$mol_assert_equal(5, srv.list().length)

			// set list
			srv.list([{...serverItem}])
			$mol_assert_equal(1, srv.list().length)
			$mol_assert_equal( serverItem.price, srv.byId( `${serverItem.id}` ).price )

			
		},


	} )
	const resp = {
		products: [
			{
				id: 16,
				title: "Hyaluronic Acid Serum",
				description:
					"L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
				price: 19,
				discountPercentage: 13.31,
				rating: 4.83,
				stock: 110,
				brand: "L'Oreal Paris",
				category: "skincare",
				thumbnail:
					"https://i.dummyjson.com/data/products/16/thumbnail.jpg",
				images: [
					"https://i.dummyjson.com/data/products/16/1.png",
					"https://i.dummyjson.com/data/products/16/2.webp",
					"https://i.dummyjson.com/data/products/16/3.jpg",
					"https://i.dummyjson.com/data/products/16/4.jpg",
					"https://i.dummyjson.com/data/products/16/thumbnail.jpg",
				],
			},
			{
				id: 17,
				title: "Tree Oil 30ml",
				description:
					"Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
				price: 12,
				discountPercentage: 4.09,
				rating: 4.52,
				stock: 78,
				brand: "Hemani Tea",
				category: "skincare",
				thumbnail:
					"https://i.dummyjson.com/data/products/17/thumbnail.jpg",
				images: [
					"https://i.dummyjson.com/data/products/17/1.jpg",
					"https://i.dummyjson.com/data/products/17/2.jpg",
					"https://i.dummyjson.com/data/products/17/3.jpg",
					"https://i.dummyjson.com/data/products/17/thumbnail.jpg",
				],
			},
			{
				id: 18,
				title: "Oil Free Moisturizer 100ml",
				description:
					"Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
				price: 40,
				discountPercentage: 13.1,
				rating: 4.56,
				stock: 88,
				brand: "Dermive",
				category: "skincare",
				thumbnail:
					"https://i.dummyjson.com/data/products/18/thumbnail.jpg",
				images: [
					"https://i.dummyjson.com/data/products/18/1.jpg",
					"https://i.dummyjson.com/data/products/18/2.jpg",
					"https://i.dummyjson.com/data/products/18/3.jpg",
					"https://i.dummyjson.com/data/products/18/4.jpg",
					"https://i.dummyjson.com/data/products/18/thumbnail.jpg",
				],
			},
			{
				id: 19,
				title: "Skin Beauty Serum.",
				description:
					"Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
				price: 46,
				discountPercentage: 10.68,
				rating: 4.42,
				stock: 54,
				brand: "ROREC White Rice",
				category: "skincare",
				thumbnail:
					"https://i.dummyjson.com/data/products/19/thumbnail.jpg",
				images: [
					"https://i.dummyjson.com/data/products/19/1.jpg",
					"https://i.dummyjson.com/data/products/19/2.jpg",
					"https://i.dummyjson.com/data/products/19/3.png",
					"https://i.dummyjson.com/data/products/19/thumbnail.jpg",
				],
			},
			{
				id: 20,
				title: "Freckle Treatment Cream- 15gm",
				description:
					"Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
				price: 70,
				discountPercentage: 16.99,
				rating: 4.06,
				stock: 140,
				brand: "Fair & Clear",
				category: "skincare",
				thumbnail:
					"https://i.dummyjson.com/data/products/20/thumbnail.jpg",
				images: [
					"https://i.dummyjson.com/data/products/20/1.jpg",
					"https://i.dummyjson.com/data/products/20/2.jpg",
					"https://i.dummyjson.com/data/products/20/3.jpg",
					"https://i.dummyjson.com/data/products/20/4.jpg",
					"https://i.dummyjson.com/data/products/20/thumbnail.jpg",
				],
			},
		],
		total: 100,
		skip: 15,
		limit: 5,
	}
	const item: testProduct = {
		id: 16,
		title: "Hyaluronic Acid Serum",
		price: 200,
	}
	const newItem: testProduct = {
		id: 22,
		title: "new item",
		price: 200,
	}
	const serverItem: testProduct = {
		id: 21,
		title: "server item",
		price: 21.13,
	}
}
