namespace $ {

	type testItem = { id: number | string, title: string, price: number }

	const sample: testItem[] = [
		{ id: 1, title: 'Alpha', price: 10 },
		{ id: 2, title: 'Beta', price: 20 },
		{ id: 3, title: 'Gamma', price: 30 },
	]

	$mol_test({

		'list from memory'() {
			const repo = new $mws_data_repo_memory<testItem>()
			repo.memory([ ...sample ])

			$mol_assert_equal(3, repo.list().length)
			$mol_assert_equal(sample, repo.list())
		},

		'list meta'() {
			const repo = new $mws_data_repo_memory<testItem>()
			repo.memory([ ...sample ])
			repo.offset(5)
			repo.limit(2)

			$mol_assert_equal({
				total: 3,
				offset: 5,
				limit: 2,
			}, repo.list_meta())
		},

		'one by id'() {
			const repo = new $mws_data_repo_memory<testItem>()
			repo.memory([ ...sample ])

			$mol_assert_equal(sample[ 1 ], repo.item('2'))
			$mol_assert_equal(sample[ 1 ], repo.one_fn(2))
		},

		'one not found'() {
			const repo = new $mws_data_repo_memory<testItem>()
			repo.memory([ ...sample ])

			$mol_assert_fail(
				() => repo.one_fn(999),
				'Item not found',
			)
		},

		'create'() {
			const repo = new $mws_data_repo_memory<testItem>()
			repo.memory([ ...sample ])

			const created = repo.create({ title: 'Delta', price: 40 })

			$mol_assert_equal(4, repo.list().length)
			$mol_assert_equal('Delta', created.title)
			$mol_assert_equal(40, created.price)
			$mol_assert_equal(typeof created.id, 'string')
			$mol_assert_equal(created, repo.item(created.id))
		},

		'update'() {
			const repo = new $mws_data_repo_memory<testItem>()
			repo.memory([ ...sample ])

			const updated = repo.update(2, { price: 25 })

			$mol_assert_equal({
				id: 2,
				title: 'Beta',
				price: 25,
			}, updated)
			$mol_assert_equal(25, repo.item('2').price)
		},

		'update not found'() {
			const repo = new $mws_data_repo_memory<testItem>()
			repo.memory([ ...sample ])

			$mol_assert_fail(
				() => repo.update_fn(999, { price: 1 }),
				'Item not found',
			)
		},

		'remove'() {
			const repo = new $mws_data_repo_memory<testItem>()
			repo.memory([ ...sample ])

			repo.remove(2)

			$mol_assert_equal(2, repo.list().length)
			$mol_assert_fail(
				() => repo.item('2'),
				'Item not found',
			)
		},

		'list reload'() {
			const repo = new $mws_data_repo_memory<testItem>()
			repo.memory([ ...sample ])
			$mol_assert_equal(3, repo.list().length)

			repo.memory([ sample[ 0 ] ])
			$mol_assert_equal(3, repo.list().length)

			repo.list_reload()
			$mol_assert_equal(1, repo.list().length)
			$mol_assert_equal(sample[ 0 ], repo.list()[ 0 ])
		},

	})
}
