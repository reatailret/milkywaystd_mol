namespace $.$$
{
	export class Product
	{
		id: string| number | null = null;
		title: string | null = '';
		price: number | null = null;
	}
	export class $milkywaystd_crud_demo_products_service extends $milkywaystd_crud<Product> {
		private static _intances = new Map()
		@$mol_mem_key
		static getInstance<T1 extends typeof $milkywaystd_crud<Product>>( this: T1, id: string = 'default' ): InstanceType<T1>
		{
			if( !$milkywaystd_crud_demo_products_service._intances.get( id ) )
			{
				const srv = new this() as InstanceType<T1>
				srv.apiResource = "products" 
				srv.apiUrl = "https://test-rest.milkyway-studio.ru/strapi/api" 
				srv.listDataFunc = ( data ) => (data.data as any[]).map( el => ( { ...el.attributes, id: el.id, } ) )
				srv.listMetaFunc = ( data ) => ( { meta: data.meta, error: data.error } )
				srv.oneItemFunc = ( data ) => ( { id: data.data.id, ...data.data.attributes } )
				srv.processErrorFunc = ( error ) => error
				srv.packPostData = ( data ) => ( { data } )
				srv.packReplaceData = ( data ) => ( { data } )
				srv.packUpdateData = ( data ) => ( { data } )
				srv.headers( {
					'Authorization': 'bearer d07b303a546c3143fa5381c4c0619a832e029c1165d2afcd97f94544e2fb190d2eaf05791513545f8f38960d28f50187b950953ecfec99309a642cd3e0a27e65ad9e73a2d3ff7d7a967f114fca93b7607b7fcec0a5960cb1691ce2b26b28a564c63305931174198d97e8413ef1bb97d9b518337892f61bdbf6360cb0758fe55a'
				} )
				$milkywaystd_crud_demo_products_service._intances.set( id, srv )
			}

			return $milkywaystd_crud_demo_products_service._intances.get( id )
		}
	}
}
