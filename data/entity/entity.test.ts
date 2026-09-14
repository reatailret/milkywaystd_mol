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

			const e1 = r1.entity({ id: '1', cached: true })
			const e2 = r2.entity({ id: '1', cached: true })

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

		'update in one repo updates other list and entity'( $ ) {
			class User extends $mws_data_entity<{ id: string, name: string }> {}
			class Repo extends $mws_data_repo_memory<{ id: string, name: string }> {
				override entity_class() {
					return User
				}
			}

			const r1 = new Repo
			const r2 = new Repo
			r1.$ = $
			r2.$ = $
			r1.memory( [ { id: '1', name: 'a' } ] )
			r2.memory( [ { id: '1', name: 'a' } ] )

			$mol_assert_equal( r1.list()[0].name, 'a' )
			$mol_assert_equal( r2.list()[0].name, 'a' )

			const entity = r1.entity( '1' )
			$mol_assert_equal( entity.data()?.name, 'a' )
			$mol_assert_unique( r2.entity( '1' ), entity )

			r2.update( '1', { name: 'b' } )

			$mol_assert_equal( r1.list()[0].name, 'b' )
			$mol_assert_equal( r2.list()[0].name, 'b' )
			$mol_assert_equal( entity.data()?.name, 'b' )
			$mol_assert_equal( r1.list()[0], r2.list()[0] )
		},

		'remove entity drops other list and data'( $ ) {
			class User extends $mws_data_entity<{ id: string, name: string }> {}
			class Repo extends $mws_data_repo_memory<{ id: string, name: string }> {
				override entity_class() {
					return User
				}
			}

			const r1 = new Repo
			const r2 = new Repo
			r1.$ = $
			r2.$ = $
			r1.memory( [ { id: '1', name: 'a' }, { id: '2', name: 'b' } ] )
			r2.memory( [ { id: '1', name: 'a' }, { id: '2', name: 'b' } ] )

			$mol_assert_equal( r1.list().length, 2 )
			$mol_assert_equal( r2.list().length, 2 )

			const entity = r1.entity( '1' )
			const other = r2.entity( '1' )
			$mol_assert_equal( entity.data()?.name, 'a' )
			$mol_assert_unique( other, entity )

			entity.remove()

			$mol_assert_equal( r1.list().length, 1 )
			$mol_assert_equal( r2.list().length, 1 )
			$mol_assert_equal( r1.list()[0].name, 'b' )
			$mol_assert_equal( r2.list()[0].name, 'b' )
			$mol_assert_equal( entity.data(), null )
			$mol_assert_equal( other.data(), null )
			$mol_assert_equal( User.item( '1' ), null )
			$mol_assert_equal( r1.item( '1' ), null )
			$mol_assert_equal( r2.item( '1' ), null )
		},

		'entity cached false is unique but shares data'( $ ) {
			class User extends $mws_data_entity<{ id: string, name: string }> {}
			class Repo extends $mws_data_repo_memory<{ id: string, name: string }> {
				override entity_class() {
					return User
				}
			}

			const r1 = new Repo
			const r2 = new Repo
			r1.$ = $
			r2.$ = $
			r1.memory( [ { id: '1', name: 'a' } ] )
			r2.memory( [ { id: '1', name: 'a' } ] )
			r1.list()
			r2.list()

			const e1 = r1.entity( '1' )
			const e2 = r2.entity( '1' )
			$mol_assert_unique( e1, e2 )
			$mol_assert_equal( e1.data()?.name, 'a' )
			$mol_assert_equal( e2.data()?.name, 'a' )

			e1.draft({ name: 'local' })
			$mol_assert_equal( e1.draft()?.name, 'local' )
			$mol_assert_equal( e2.draft(), null )

			r2.update( '1', { name: 'b' } )
			$mol_assert_equal( e1.data()?.name, 'b' )
			$mol_assert_equal( e2.data()?.name, 'b' )
			$mol_assert_equal( e1.draft()?.name, 'local' )
		},

	})
}
