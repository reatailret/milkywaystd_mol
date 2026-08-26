namespace $ {
	export interface  $mws_data_demo_memory_product extends Record<string, any> {
		id: string
		name: string
		price: number
		stock: number
		category: string
	}
	export class $mws_data_demo_memory_entity extends $mws_data_entity<$mws_data_demo_memory_product> {}

	export class $mws_data_demo_memory_repo extends $mws_data_repo_memory<$mws_data_demo_memory_product> {
		override entity_factory(): $mws_data_entity<$mws_data_demo_memory_product> {
			return new $mws_data_demo_memory_entity()
		}
	}
	export class $mws_data_demo_memory_source extends $mws_data_source<$mws_data_demo_memory_product> {
		readonly repo_ = new $mws_data_demo_memory_repo()

		@$mol_mem
		override repo(next?: $mws_data_repo<$mws_data_demo_memory_product>): $mws_data_repo<$mws_data_demo_memory_product> {
			if(next !== undefined) return next
			return this.repo_
		}
	}
}
