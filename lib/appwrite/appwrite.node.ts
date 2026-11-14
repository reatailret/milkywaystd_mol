namespace $ {

	const sdk = require( 'node-appwrite' ) as typeof import( 'node-appwrite' )

	// Пакеты appwrite и node-appwrite не пересекаются по типам. Общий контракт — web SDK.
	$.$mws_lib_appwrite_sdk = sdk as unknown as typeof $mws_lib_appwrite_sdk

	function $mws_lib_appwrite_client_node(
		sdk: typeof import( 'node-appwrite' ),
		endpoint: string,
		project: string,
		key: string,
	) {
		const client = new sdk.Client()
			.setEndpoint( endpoint )
			.setProject( project )

		if( key ) client.setKey( key )

		return client
	}

	$.$mws_lib_appwrite_client = $mws_lib_appwrite_client_node as unknown as typeof $mws_lib_appwrite_client

}
