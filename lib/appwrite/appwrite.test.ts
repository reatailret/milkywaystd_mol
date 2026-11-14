namespace $ {

	$mol_test( {

		'defaults'() {
			const lib = new $mws_lib_appwrite()

			$mol_assert_equal( 'http://localhost/v1', lib.endpoint() )
			$mol_assert_equal( '', lib.project() )
			$mol_assert_equal( '', lib.key() )
		},

	} )

}
