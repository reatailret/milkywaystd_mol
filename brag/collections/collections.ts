namespace $ {
	export interface $mws_brag_collections_row extends Record<string, any> {
		id: string
		name: string
		description: string | null
		created_at: string
		document_count: number
	}

	export class $mws_brag_collections_entity extends $mws_data_entity<$mws_brag_collections_row> {}

	export class $mws_brag_collections_repo extends $mws_data_repo_rest<$mws_brag_collections_row> {

		@$mol_mem
		override uri(next?: string): string {
			return next ?? 'http://localhost:8080'
		}

		@$mol_mem
		override resource(next?: string): string {
			return next ?? 'collections'
		}

		override pack_create(data: Partial<$mws_brag_collections_row>): unknown {
			return {
				name: data.name,
				description: data.description ?? null,
			}
		}

		override pack_update(data: Partial<$mws_brag_collections_row>): unknown {
			const packed: { name?: string, description?: string | null } = {}
			if( data.name !== undefined ) packed.name = data.name
			if( data.description !== undefined ) packed.description = data.description
			return packed
		}

		override entity_factory(): $mws_data_entity<$mws_brag_collections_row> {
			return new $mws_brag_collections_entity()
		}
	}

	export class $mws_brag_collections_source extends $mws_data_source<$mws_brag_collections_row> {
		readonly repo_ = new $mws_brag_collections_repo()

		@$mol_mem
		override repo(next?: $mws_data_repo<$mws_brag_collections_row>): $mws_data_repo<$mws_brag_collections_row> {
			if( next !== undefined ) return next
			return this.repo_
		}
	}
}
