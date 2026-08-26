namespace $
{
	export class $mws_app_snake_server_node extends $giper_baza_app_node
	{
		_auto()
		{
			
			this.clear()
			this._game_update()
			//this._stat_update()

			

		}
		POST( msg: $mol_rest_message ) {
			try {
				
				const json = JSON.parse( msg.text() )
				if(json.pathname){
					const newm = msg.route(new URL(json.pathname,'http://localhost'))
					newm.port = $mol_rest_port.make({})
					console.log('PATHNAME',newm.uri().pathname)
					this.REQUEST(newm)
				}
				

			} catch (error:any) {
				
				this._yard().port_income( msg.port, msg.bin() )	
			}
			
		}
		@$mol_action
		clear()
		{

			$mws_app_snake_server_coords.coord_node()?.Coordlist( null )?.val( {} )
			
		}
		@$mol_mem
		_game_update()
		{

				
				const state = $mws_app_snake_server_coords.coord_node()
				state.tick()
			
			
		}

		@ $mol_memo.method api() { return $mws_snake_server_api.make({}) }
		
	}

	export class $mws_snake_server_api extends $mol_rest_resource {
		
		POST( msg: $mol_rest_message ) {

			msg.reply( {result: 'ok'}, { type: msg.type() } )
			$mws_app_snake_server_commands.commands_tick( JSON.parse( msg.text() as string ) as $mws_app_snake_command )

		}

	}


	



	

}

