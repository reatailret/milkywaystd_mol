namespace $ {

	$mol_test( {

		'setKey when key is set'() {
			let key = ''
			const sdk = {
				Client: class {
					setEndpoint() { return this }
					setProject() { return this }
					setKey( value: string ) {
						key = value
						return this
					}
				},
			}

			$mws_lib_appwrite_client(
				sdk as unknown as typeof $mws_lib_appwrite_sdk,
				'http://localhost/v1',
				'proj',
				'secret',
			)

			$mol_assert_equal( 'secret', key )
		},

		'skip setKey when key is empty'() {
			let called = false
			const sdk = {
				Client: class {
					setEndpoint() { return this }
					setProject() { return this }
					setKey() {
						called = true
						return this
					}
				},
			}

			$mws_lib_appwrite_client(
				sdk as unknown as typeof $mws_lib_appwrite_sdk,
				'http://localhost/v1',
				'proj',
				'',
			)

			$mol_assert_equal( false, called )
		},

	} )

}
