namespace $ {

	// package.json main в web-бандл не попадает, require( 'appwrite' ) даёт undefined.
	// IIFE самодостаточный и регистрируется в $node как { Appwrite }.
	const sdk_bundle = require( 'appwrite/dist/iife/sdk.js' ) as {
		Appwrite?: typeof import( 'appwrite' )
	}

	const sdk = sdk_bundle?.Appwrite
		?? ( globalThis as { Appwrite?: typeof import( 'appwrite' ) } ).Appwrite

	if( !sdk ) $mol_fail( new Error( 'Appwrite web SDK was not bundled' ) )

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
