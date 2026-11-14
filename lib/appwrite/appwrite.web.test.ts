namespace $ {

	$mol_test( {

		'web client does not send the key'() {
			let called = false
			const sdk = {
				Client: class {
					setEndpoint( value: string ) {
						this.endpoint = value
						return this
					}
					setProject( value: string ) {
						this.project = value
						return this
					}
					setKey() {
						called = true
						return this
					}
					endpoint = ''
					project = ''
				},
			}

			const client = $mws_lib_appwrite_client(
				sdk as unknown as typeof $mws_lib_appwrite_sdk,
				'http://localhost/v1',
				'proj',
				'secret',
			) as unknown as { endpoint: string, project: string }

			$mol_assert_equal( false, called )
			$mol_assert_equal( 'http://localhost/v1', client.endpoint )
			$mol_assert_equal( 'proj', client.project )
		},

	} )

}
