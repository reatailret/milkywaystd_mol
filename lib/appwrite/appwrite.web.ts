namespace $ {

	const sdk = require( 'appwrite' ) as typeof import( 'appwrite' )

	$.$mws_lib_appwrite_sdk = sdk

	function $mws_lib_appwrite_client_web(
		sdk: typeof import( 'appwrite' ),
		endpoint: string,
		project: string,
		key: string,
	) {
		void key

		return new sdk.Client()
			.setEndpoint( endpoint )
			.setProject( project )
	}

	$.$mws_lib_appwrite_client = $mws_lib_appwrite_client_web

}
