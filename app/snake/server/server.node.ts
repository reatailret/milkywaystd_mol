namespace $
{
	export class $mws_snake_server extends $mol_rest_resource
	{

		_auto()
		{
			this.$.$mol_log3_rise( {
				place: 'server',
				message: 'server started',
			} )
			this.clear()
			this._game_update()


		}
		@$mol_action
		clear()
		{

			$mws_app_snake_server_coords.coord_node()?.Coordlist( null )?.val( {} )
			const commands = $mws_app_snake_server_commands.command_node()?.Commands( null )?.items()
			for( const command of commands ?? [] ) {
				$mws_app_snake_server_commands.command_node()?.Commands( null )?.cut( { ...command } )
			}
		}
		@$mol_mem
		_game_update()
		{


			const state = $mws_app_snake_server_coords.coord_node()
			state.commands_tick()
			state.tick()
		}





	}


	$hyoo_crus_yard.masters = $mol_state_arg.value( 'masters' )?.split( ',' ) ?? []

	$mws_snake_server.serve()





}

