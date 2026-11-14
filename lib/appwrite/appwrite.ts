namespace $ {

	export let $mws_lib_appwrite_sdk = null! as typeof import( 'appwrite' )

	/**
	 * Сборка подменяет эту функцию из appwrite.web.ts или appwrite.node.ts.
	 * Заглушка нужна, чтобы общий файл не тянул ни один из пакетов.
	 */
	export function $mws_lib_appwrite_client(
		sdk: typeof $mws_lib_appwrite_sdk,
		endpoint: string,
		project: string,
		key: string,
	): InstanceType< typeof $mws_lib_appwrite_sdk.Client > {
		return $mol_fail( new Error( 'Appwrite client is provided by appwrite.web.ts or appwrite.node.ts' ) )
	}

	/**
	 * Клиент Appwrite: endpoint, project, key и экземпляр TablesDB.
	 */
	export class $mws_lib_appwrite extends $mol_object {

		@$mol_mem
		endpoint( next?: string ): string {
			return next ?? 'http://localhost/v1'
		}

		@$mol_mem
		project( next?: string ): string {
			return next ?? ''
		}

		@$mol_mem
		key( next?: string ): string {
			return next ?? ''
		}

		@$mol_mem
		sdk_client() {
			return this.$.$mws_lib_appwrite_client(
				this.$.$mws_lib_appwrite_sdk,
				this.endpoint(),
				this.project(),
				this.key(),
			)
		}

		@$mol_mem
		tables() {
			const sdk = this.$.$mws_lib_appwrite_sdk
			return new sdk.TablesDB( this.sdk_client() )
		}

	}

}
