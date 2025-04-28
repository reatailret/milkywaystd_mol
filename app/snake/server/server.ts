namespace $
{


	export class $mws_app_snake_server_coords extends $hyoo_crus_dict.with( {
		Coordlist: $hyoo_crus_atom_json,
		Rating:$hyoo_crus_list_json,
		Foods:$hyoo_crus_atom_jsan

	} ) {


		public static get_default_coord()
		{
			return {
				id: '',
				x: 0,
				y: 0,
				dx: 1,
				dy: 0,
				max_cells: 3,
				cells: [] as Array<{ x: number, y: number }>,
				alive: true,
				score: 0
			}
		}
		@$mol_mem
		static coord_node()
		{
			const land_ref = '8SXgaZ3H_AvVLI4ci'

			const node = $hyoo_crus_glob.Node( $hyoo_crus_ref( land_ref ), this.$.$mws_app_snake_server_coords )


			return node
		}

		game_logic()
		{
			this.gcounter++
			//console.log( 'loop_logic', this.gcounter )
			if( !this.state_obj ) return null

			let state = $mol_mutable( this.state_obj )
			// Убедимся что на поле достаточно еды
			while( this.foods.length < 20 )
			{
				this.foods.push( $mws_app_snake_server_coords.get_default_food() )
			}
			let snakes = state.coords
			let commands = $mws_app_snake_server_commands.commands_state
			// Обработка команд
			for( const peer_id in commands )
			{

				while( commands[ peer_id ].length > 0 )
				{

					let com = commands[ peer_id ].shift()!
					
					if( com.resolved ) continue
					
					if(!state.coords[ peer_id ]() && com.d != 'connect') {
						
						continue
					}
					
					switch( com.d )
					{
						case 'up':
							state.coords[ peer_id ].dy( v => -1 )
							state.coords[ peer_id ].dx( v => 0 )
							break
						case 'down':
							state.coords[ peer_id ].dy( v => 1 )
							state.coords[ peer_id ].dx( v => 0 )
							break
						case 'left':
							state.coords[ peer_id ].dy( v => 0 )
							state.coords[ peer_id ].dx( v => -1 )
							break
						case 'right':
							state.coords[ peer_id ].dx( v => 1 )
							state.coords[ peer_id ].dy( v => 0 )
							break
						case 'connect':
							
							const new_snake = $mws_app_snake_server_coords.get_default_coord()
							new_snake.id = peer_id
							new_snake.x = Math.floor( Math.random() * 1600 )
							new_snake.y = Math.floor( Math.random() * 1600 )
							snakes[ peer_id ]( v => new_snake )
							break
					}

				}





			}
			$mws_app_snake_server_commands.commands_state = {}
			if( Object.keys( snakes() ).length === 0 )
			{
				const new_snake = $mws_app_snake_server_coords.get_default_coord()
				const peer_id = 'QKTByhmF_DiO9xyTo'
				new_snake.id = peer_id
				snakes[ peer_id ]( v => new_snake )

			}
			let alive_count = 0
			let dead_count = 0
			// Обновляем позиции змеек
			for( const peer_id in state.coords() )
			{
				
				if( !state.coords[ peer_id ]().alive )
				{
					dead_count++
					continue
				}
				alive_count++
				// Двигаем змейку
				
				state.coords[ peer_id ]( v =>
				{

					let x, y
					x = v.x + v.dx * this.grid
					y = v.y + v.dy * this.grid


					if( x < 0 ) x = this.canvas_size
					if( x > this.canvas_size ) x = 0
					if( y < 0 ) y = this.canvas_size
					if( y > this.canvas_size ) y = 0
					return {
						...v,
						x,
						y
					}

				} )
				// Добавляем новую позицию головы
				state.coords[ peer_id ].cells( v => [ { x: state.coords[ peer_id ].x(), y: state.coords[ peer_id ].y() }, ...( v || [] ) ] )
				// Проверяем столкновение с едой
				this.foods = this.foods.filter( ( food: any ) =>
				{
					const ate = Math.abs( state.coords[ peer_id ].x() - food.x ) < this.grid &&
						Math.abs( state.coords[ peer_id ].y() - food.y ) < this.grid
					if( ate )
					{
						state.coords[ peer_id ].max_cells( v => v < 100 ? v + 1 : v )
						state.coords[ peer_id ].score( v => v + 1 )
					}
					return !ate
				} ) 

				// Удаляем хвост если превышена длина
				while( state.coords[ peer_id ].cells().length > state.coords[ peer_id ].max_cells() )
				{
					state.coords[ peer_id ].cells( v => v.slice( 0, -1 ) )
				}

				// Проверяем столкновения с другими змейками
				for( const other_id in state.coords() )
				{
					
					if( state.coords[ other_id ].id() === state.coords[ peer_id ].id() || !state.coords[ other_id ].alive() ) continue

					for( const cell of state.coords[ other_id ].cells() )
					{
						if( Math.abs( state.coords[ peer_id ].x() - cell.x ) < this.grid &&
							Math.abs( state.coords[ peer_id ].y() - cell.y ) < this.grid )
						{
							state.coords[ peer_id ].alive( v => false )
							break
						}
					}
				}




			}
			if( alive_count !== 0 )
			{
				this.state_obj = state() as any
			}

		}
		grid = 16
		counter = 0
		canvas_size = 1600
		foods:Array<{ x: number, y: number }> = []
		state_obj: {

			coords: Record<string, $mws_app_snake_server_coord_type>,
			

		} = {
				coords: {},
				
			}
		
		
		gcounter = 0


		@$mol_mem
		tick()
		{

			this.counter++
			//console.log( 'game_loop', this.counter )


			$mol_state_time.now( 100 )



			this.game_logic()

			/*for( const peer_id in this.state_obj.coords ) {
				const snake = this.state_obj.coords[ peer_id ]
				this.Rating( null )?.add( {
					peer_id,
					score: snake.score
				} )
			}*/

			
			this.Coordlist( null )?.val( this.state_obj )
			this.Foods( null )?.val( this.foods )

			

		}
		@$mol_action
		send_state()
		{
			
		}
		public static get_default_food()
		{
			return {
				x: Math.floor( Math.random() * 1600 ),
				y: Math.floor( Math.random() * 1600 )
			}
		}
	}
	export type $mws_app_snake_server_coord_type = ReturnType<typeof $mws_app_snake_server_coords.get_default_coord>

	export class $mws_app_snake_server_commands extends $hyoo_crus_entity.with( {

		Commands: $hyoo_crus_list_json,
		SingleCommand: $hyoo_crus_atom_json
	} ) {
		static commands_state: Record<string, Array<$mws_app_snake_command>> = {}
		@$mol_mem
		static command_node()
		{
			const land_ref = 'bt3tPjHP_5okV40qZ'
			const node = $hyoo_crus_glob.Node( $hyoo_crus_ref( land_ref ),
				this.$.$mws_app_snake_server_commands )


			return node

		}
		
		@$mol_mem
		static commands_tick_()
		{
			console.log('commands_tick 1')
			
			const commands = $mws_app_snake_server_commands.command_node()?.Commands( null )?.items() as Array<$mws_app_snake_command>
			let i = 0
			if( commands )
			{
				
				
				for( const command of commands )
				{

					if( !this.commands_state[ command?.id ] )
					{
						this.commands_state[ command?.id ] = []
					}
					this.commands_state[ command?.id ]?.push( command )
					console.log('commands_tick 2');

					
						console.log('commands_tick 3')
					i++
					
				}
			}
			try {
				this.cut_commands(0,i)
			} catch (error) {
				if(!$mol_promise_like(error))
					$mol_fail_log(error)
			}
			
		}
		
		static commands_tick(command:$mws_app_snake_command)
		{
			
			
			
			
			if( command )
			{
				
				
					console.log(command);

					if( !this.commands_state[ command?.id ] )
					{
						this.commands_state[ command?.id ] = []
					}
					this.commands_state[ command?.id ]?.push( command )
				
					
				
			}
			
			
		}
		@$mol_action
		static cut_commands(i:number, j:number)
		{
			console.log('cut_command',i)
			$mws_app_snake_server_commands.command_node()?.Commands( null )?.splice([],i,j)
		}


	}
	export type $mws_app_snake_command =
		{ d: string, params: any, resolved: boolean, id: string, time: number }

}
