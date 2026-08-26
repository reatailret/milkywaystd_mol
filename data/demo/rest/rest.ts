namespace $ {
	export interface $mws_data_demo_rest_product extends Record<string, any> {
		id: number | string
		title: string
		price: number
		stock: number
		category: string
	}

	export class $mws_data_demo_rest_entity extends $mws_data_entity<$mws_data_demo_rest_product> {}

	export class $mws_data_demo_rest_repo extends $mws_data_repo_rest<$mws_data_demo_rest_product> {

		@$mol_mem
		override uri(next?: string): string {
			return next ?? 'https://dummyjson.com'
		}

		@$mol_mem
		override resource(next?: string): string {
			return next ?? 'products'
		}

		override list_unpack(data: any): readonly $mws_data_demo_rest_product[] {
			return data.products
		}

		override meta_unpack(data: any): $mws_data_repo_meta {
			return {
				total: data.total,
				offset: data.skip,
				limit: data.limit,
			}
		}

		// dummyjson использует skip вместо offset и sortBy вместо sort
		@$mol_mem
		override query(): Record<string, string> {
			const params = super.query()
			if( 'offset' in params ) {
				params.skip = params.offset
				delete params.offset
			}
			if( 'sort' in params ) {
				params.sortBy = params.sort
				delete params.sort
			}
			return params
		}

		// dummyjson создаёт через /products/add
		@$mol_action
		override create_fn(data: Partial<$mws_data_demo_rest_product>): $mws_data_demo_rest_product {
			const response = this.$.$mol_fetch.json( `${ this.url() }/add`, {
				method: 'POST',
				body: JSON.stringify( this.pack_create( data ) ),
				headers: this.headers() as HeadersInit,
			} )
			return this.one_unpack( response )
		}

		override entity_factory(): $mws_data_entity<$mws_data_demo_rest_product> {
			return new $mws_data_demo_rest_entity()
		}
	}

	export class $mws_data_demo_rest_source extends $mws_data_source<$mws_data_demo_rest_product> {
		readonly repo_ = new $mws_data_demo_rest_repo()

		@$mol_mem
		override repo(next?: $mws_data_repo<$mws_data_demo_rest_product>): $mws_data_repo<$mws_data_demo_rest_product> {
			if( next !== undefined ) return next
			return this.repo_
		}
	}
}
