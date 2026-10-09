namespace $ {

	$mol_test_mocks.push( $ => {
		$.$giper_baza_land = $mws_baza_land
		$.$giper_baza_file = $mws_baza_file
	} )

	$mol_test({

		async 'parts unloads sands after copy'( $ ) {

			const land = $.$giper_baza_land.make({ $ })
			const file = land.Data( $.$giper_baza_file ) as $mws_baza_file

			const source = new Uint8Array( 2 ** 15 + 100 )
			source[ 2 ** 15 + 50 ] = 255
			file.buffer( source )

			const units = file.chunk_units()
			$mol_assert_equal( units.length, 2 )

			// parts() зовёт sand_open через $mol_wire_sync — только из фибры
			const parts = await $mol_wire_async( file ).parts()
			$mol_assert_equal( parts.length, 2 )

			const joined = new Uint8Array( parts.reduce( ( n, p ) => n + p.byteLength, 0 ) )
			let offset = 0
			for( const part of parts ) {
				joined.set( part, offset )
				offset += part.byteLength
			}
			$mol_assert_equal( joined, source )

			for( const unit of units ) {
				if( !unit.big() ) continue
				$mol_assert_equal( unit._ball, null )
				$mol_assert_equal( unit._open, null )
			}

		},

		async 'read_range returns window and unloads'( $ ) {

			const land = $.$giper_baza_land.make({ $ })
			const file = land.Data( $.$giper_baza_file ) as $mws_baza_file

			const source = new Uint8Array( 2 ** 15 + 100 )
			for( let i = 0; i < source.length; i++ ) source[ i ] = i & 255
			file.buffer( source )

			const slice = await $mol_wire_async( file ).read_range( 100, 200 )
			$mol_assert_equal( slice, source.subarray( 100, 200 ) )

			const total = await $mol_wire_async( file ).byte_length()
			$mol_assert_equal( total, source.byteLength )

			for( const unit of file.chunk_units() ) {
				if( !unit.big() ) continue
				$mol_assert_equal( unit._ball, null )
				$mol_assert_equal( unit._open, null )
			}

		},

	})

}
