namespace $ {
	$mol_test({

		'same class and id share entity instance'( $ ) {
			class User extends $mws_data_entity<{ id: string }> {}
			class Post extends $mws_data_entity<{ id: string }> {}

			const a = User.for( '1' )
			const b = User.for( '1' )
			const c = User.for( '2' )
			const d = Post.for( '1' )

			$mol_assert_equal( a, b )
			$mol_assert_unique( a, c )
			$mol_assert_unique( a, d )
		},

		'repos share entity by class and id'( $ ) {
			class User extends $mws_data_entity<{ id: string }> {}
			class Repo extends $mws_data_repo<{ id: string }> {
				override entity_class() {
					return User
				}
			}

			const r1 = new Repo
			const r2 = new Repo
			r1.$ = $
			r2.$ = $

			const e1 = r1.entity( '1' )
			const e2 = r2.entity( '1' )

			$mol_assert_equal( e1, e2 )
			$mol_assert_equal( e1.repo(), r1 )
		},

		'destroy entity when no dependents'( $ ) {
			let destroyed = false

			class User extends $mws_data_entity<{ id: string }> {
				destructor() {
					super.destructor()
					destroyed = true
				}
			}

			class App extends $mol_object {
				@$mol_mem
				showing( next = true ) {
					return next
				}
				@$mol_mem
				current() {
					return this.showing() ? User.for( '1' ) : null
				}
			}

			const app = new App
			app.$ = $

			const entity = app.current()
			$mol_assert_ok( entity )

			app.showing( false )
			$mol_wire_fiber.sync()
			$mol_assert_ok( destroyed )
		},

	})
}
