namespace $.$$
{
	$mol_test( {
		common( $ )
		{
			const menuitems = [
				{
					label: "Item1",
					link: "",
					id: "1",
					expanded: true,
					items: {
						label: "Sub item 1",
						link: { page: "link" },
					},
				},
				{
					label: "Item2 LINK",
					link: { page: "link2" },
				},
			] as $milkywaystd_ui_treemenu_data_item[]
			const treemenu = new $milkywaystd_ui_treemenu()

			treemenu.items( menuitems )
			treemenu.sub()

			$mol_assert_equal( true, treemenu.expanded( "1" ) )


			treemenu.reset()


			$mol_assert_equal( null, treemenu.cache( "1" ) )
			$mol_assert_equal( false, treemenu.expanded( "1" ) )



		},
	} )
}
