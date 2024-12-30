namespace $
{


	export class $mws_app_snake_server_coords extends $hyoo_crus_dict.with( {
		Coordlist: $hyoo_crus_atom_json,
		Rating:$hyoo_crus_list_json

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
			const land_ref = 'th8ZKhYi_b2RsHRfV'

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
			while( ( state.food() || [] ).length < 20 )
			{
				state.food( v => [ ...( v || [] ), $mws_app_snake_server_coords.get_default_food() ] )
			}
			let snakes = state.coords
			let commands = this.commands_state
			// Обработка команд
			for( const peer_id in commands )
			{

				while( commands[ peer_id ].length > 0 )
				{

					let com = commands[ peer_id ].shift()!
					if( com.resolved ) continue


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
			this.commands_state = {}
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
			for( const peer_id in snakes() )
			{
				const snake = state.coords[ peer_id ]
				if( !snakes()[ peer_id ].alive )
				{
					dead_count++
					continue
				}
				alive_count++
				// Двигаем змейку

				snake( v =>
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
				snake.cells( v => [ { x: snake.x(), y: snake.y() }, ...( v || [] ) ] )
				// Проверяем столкновение с едой
				state.food( v => v.filter( ( food: any ) =>
				{
					const ate = Math.abs( snake.x() - food.x ) < this.grid &&
						Math.abs( snake.y() - food.y ) < this.grid
					if( ate )
					{
						snake.max_cells( v => v < 100 ? v + 1 : v )
						snake.score( v => v + 1 )
					}
					return !ate
				} ) )

				// Удаляем хвост если превышена длина
				while( snake.cells().length > snake.max_cells() )
				{
					snake.cells( v => v.slice( 0, -1 ) )
				}

				// Проверяем столкновения с другими змейками
				for( const other_id in snakes() )
				{
					const other = state.coords[ other_id ]
					if( other.id() === snake.id() || !other.alive() ) continue

					for( const cell of other.cells() )
					{
						if( Math.abs( snake.x() - cell.x ) < this.grid &&
							Math.abs( snake.y() - cell.y ) < this.grid )
						{
							snake.alive( v => false )
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
		state_obj: {

			coords: Record<string, $mws_app_snake_server_coord_type>,
			food: Array<{ x: number, y: number }>,

		} = {
				coords: {},
				food: [],
			}
		@$mol_mem
		commands_tick()
		{
			const commands = $mws_app_snake_server_commands.command_node()?.Commands( null )?.items() as Array<$mws_app_snake_command>
			if( commands )
			{
				let i = 0
				for( const command of commands )
				{


					if( !this.commands_state[ command?.id ] )
					{
						this.commands_state[ command?.id ] = []
					}
					this.commands_state[ command?.id ]?.push( command )
					$mws_app_snake_server_commands.command_node()?.Commands( true )?.cut( { ...command } )
					i++
				}
			}


		}
		commands_state: Record<string, Array<$mws_app_snake_command>> = {}
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

		Commands: $hyoo_crus_list_json
	} ) {
		@$mol_mem
		static command_node()
		{
			const land_ref = 'æo4xT1Ik_051zJHdZ'

			const node = $hyoo_crus_glob.Node( $hyoo_crus_ref( land_ref ),
				this.$.$mws_app_snake_server_commands )


			return node

		}


	}
	export type $mws_app_snake_command =
		{ d: string, params: any, resolved: boolean, id: string, time: number }

}
