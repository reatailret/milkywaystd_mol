namespace $.$$
{
  export class $milkywaystd_crud_demo_products_tablepage extends $.$milkywaystd_crud_demo_products_tablepage
  {
    @$mol_mem
    service()
    {

      const srv = $milkywaystd_crud_demo_products_service.getInstance()
      const params = $mol_mem_cached( () => srv.params() )
      srv.params( { ...params, 'sort[0]': 'id:desc' } )
      return srv
    }

    @$mol_mem
    rows()
    {
      const r = []
      for( const iterator of this.service().list() )
      {
        r.push( this.Row( iterator.id ) )
      }
      return r
    }
    @$mol_mem_key
    item( id: any )
    {
      return this.service().byIdR( `${ id }` )
    }
    @$mol_mem
    per_page( value?: number ): any
    {
      let p = parseInt( $mol_state_arg.value( "examples_products_per_page" ) as string )
      if( value !== undefined )
      {
        $mol_state_arg.go( { ...$mol_state_arg.dict(), examples_products_per_page: value.toString() } )
        this.service().params( { ...this.service().params(), 'pagination[limit]': value.toString() } )
        return value
      }
      p = p ? p : 5
      const params = this.service().params()

      this.service().params( { ...params, 'pagination[limit]': p.toString() } )

      return p
    }
    @$mol_mem
    page( value?: number )
    {
      let p = parseInt( $mol_state_arg.value( "examples_products_page" ) as string )

      if( value !== undefined )
      {
        if( value < 1 )
        {
          value = 1
        }
        $mol_state_arg.go( { ...$mol_state_arg.dict(), examples_products_page: value.toString() } )
        this.service().params( { ...this.service().params(), 'pagination[start]': ( ( value - 1 ) * this.per_page() ).toString() } )
        return value
      }
      if( !p || p < 1 ) p = 1
      const params = this.service().params()

      this.service().params( { ...params, 'pagination[start]': ( ( p - 1 ) * this.per_page() ).toString() } )

      return p
    }

    @$mol_mem
    attr(): {}
    {
      const classes: Array<string> = []
      if( $mol_state_arg.value( 'examples_products_viewpage' ) === 'edit' || $mol_state_arg.value( 'examples_products_viewpage' ) === 'edit2' )
      {
        classes.push( 'editmode' )
      }
      return { class: classes.join( ' ' ) }
    }

    @$mol_mem
    totalItems()
    {
      return this.service()?.metaInfo()?.meta?.pagination?.total ? `${ this.service()?.metaInfo()?.meta?.pagination?.total }` : ''
    }
    @$mol_action
    refresh()
    {
      this.service().listReload()
    }
    @$mol_action
    goToCreateNew()
    {
      $mol_state_arg.value( 'examples_products_viewpage', 'edit' )
      $mol_state_arg.value( 'examples_products_edititem', null )
    }

    @$mol_action
    deleteCallback( id: string )
    {

      if( `${ id }`.indexOf( '_' ) === 0 )
      {
        this.service().removeFromList( id )
        return
      }
      this.service().deleteOne( id )
      if( $mol_state_arg.value( 'examples_products_edititem' ) === `${ id }` )
      {
        $mol_state_arg.value( 'examples_products_edititem', null )
        $mol_state_arg.value( 'examples_products_viewpage', null )
      }
      this.refresh()



    }
    @$mol_mem
    uiblocker()
    {
		this.service().onePendingChanel()
		this.service().listPendingChanel()
      return  ''
    }
  }
}
