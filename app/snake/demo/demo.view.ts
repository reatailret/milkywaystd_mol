namespace $.$$
{

	export class $mws_app_snake_demo extends $.$mws_app_snake_demo
	{

		auto()
		{
			//$hyoo_crus_yard.masters = [ 'http://localhost:9090' ]
			//$hyoo_crus_yard.masters = [ 'http://crus.hyoo.ru:9090' ]
			try
			{
				this.renderg()
			} catch( error )
			{

			}

		}

		@$mol_mem
		canvas_context()
		{
			const canvas = this.Canvas().dom_node() as HTMLCanvasElement
			return canvas.getContext( '2d' )!
		}



		grid = 16
		count = 0
		score_value = 0
		game_running = true
		connected = false
		canvas_size = 1600

		@$mol_mem
		score( next?: number )
		{
			return next ?? this.score_value
		}

		@$mol_mem
		status( next?: string )
		{
			return next ?? 'Press Start to begin'
		}

		@$mol_mem
		snake_id()
		{
			this.snake_id_static = this.$.$hyoo_crus_glob.home().ref().description!
			return this.snake_id_static
		}
		snake_id_static = ''
		snake_id_: string = ''

		@$mol_action
		send_command( command: $mws_app_snake_command )
		{
			
			command.id = this.snake_id_static
			command.time = 0
			const node = $mws_app_snake_server_commands.command_node()?.Commands( null )
			if( !node )
			{
				console.log( 'no command node' )
				return
			}
			console.log( command )
			node.add( command )
		}

		@$mol_action
		start_game()
		{

			this.send_command( {
				d: 'connect',
				params: {
					id: this.snake_id()
				},
				resolved: false,
				id: this.snake_id()!,
				time: 0
			} )

			this.connected = true

		}


		state_obj = {
			coords: [],
			food: []
		} as {
			coords: Array<$mws_app_snake_server_coord_type>,
			food: Array<{ x: number, y: number }>
		}
		@$mol_mem
		game_loop()
		{



			let obj = this.$.$mws_app_snake_server_coords.coord_node().Coordlist()?.val() as {
				coords: Array<$mws_app_snake_server_coord_type>,
				food: Array<{ x: number, y: number }>
			}

			this.state_obj = obj
			this.snake_id()
			return this.state_obj?.coords?.length

		}
		
		coords_list_static = []
		renderg()
		{
			const ctx = this.canvas_context()

			if( !ctx ) return

			const animate = () =>
			{
				$mol_wire_fiber.sync()
				if( ++this.count < 5 )
				{
					requestAnimationFrame( animate )
					return
				}

				this.count = 0
				ctx.clearRect( 0, 0, this.canvas_size, this.canvas_size )

				// Получаем текущее состояние
				const state = this.state_obj

				// Рисуем еду
				ctx.fillStyle = 'red'
				for( const food of( state?.food || [] ) )
				{
					ctx.fillRect( food.x, food.y, this.grid - 1, this.grid - 1 )
				}

				// Рисуем змеек
				for( const peer in state?.coords )
				{
					const snake = state.coords[ peer ]
					// Своя змейка зеленая, чужие синие
					ctx.fillStyle = snake.id === this.snake_id_static ? 'green' : 'blue'
					if(snake.id === this.snake_id_static) {
						// Get snake head position
						this.game_running = true
						this.connected = true
						const head = snake.cells[0]
						if(head && snake.alive) {
							// Get game container
							const gameContainer = this.Body().dom_node()
							
							// Calculate center position
							const centerX = head.x - (gameContainer.clientWidth / 2)
							const centerY = head.y - (gameContainer.clientHeight / 2)
							
							// Smooth scroll to snake
							gameContainer.scrollTo({
								left: centerX,
								top: centerY,
								behavior: 'smooth'
							})
						}
						
					}
					if( !snake.alive )
					{
						ctx.fillStyle = 'gray'
					}

					for( const cell of snake.cells )
					{
						ctx.fillRect( cell.x, cell.y, this.grid - 1, this.grid - 1 )
					}

					// Draw holiday hat on snake head
					if( snake.cells.length > 0 )
					{
						const head = snake.cells[ 0 ]
						ctx.fillStyle = 'red'  // Hat color
						ctx.beginPath()
						ctx.moveTo( head.x + this.grid / 2, head.y - 10 )
						ctx.lineTo( head.x - 5, head.y )
						ctx.lineTo( head.x + this.grid + 5, head.y )
						ctx.fill()

						// White pom-pom on hat
						ctx.fillStyle = 'white'
						ctx.beginPath()
						ctx.arc( head.x + this.grid / 2, head.y - 12, 4, 0, Math.PI * 2 )
						ctx.fill()
					}

					// Draw score with white color
					ctx.fillStyle = 'white'
					ctx.font = '12px Arial'
					ctx.fillText( `${ snake.score }`, snake.x, snake.y - 5 )
				}

				if( this.game_running )
				{
					requestAnimationFrame( animate )
				}
			}

			requestAnimationFrame( animate )
		}
		@$mol_action
		move( e: Event )
		{
			
			e.preventDefault()
			if( !this.game_running || !this.connected ) return

			

			const ke = e as KeyboardEvent

			let coomand = ''
			// Left arrow
			if( ke.code === 'ArrowLeft' )
			{
				coomand = 'left'
			}
			// Up arrow 
			else if( ke.code === 'ArrowUp' )
			{
				coomand = 'up'
			}

				
			// Right arrow
			else if( ke.code === 'ArrowRight' )
			{
				coomand = 'right'
			}
			// Down arrow
			else if( ke.code === 'ArrowDown' )
			{
				coomand = 'down'
			}
		
					
			
			// Down arrow
			else if( ke.code === 'ArrowDown' )
			{
				coomand = 'down'
			}
			
			this.send_command( {
				id: '',
				d: coomand,
				params: {

				},
				resolved: false,
				time: 0
			} )
		}
		override event()
		{
			return {
				...super.event(),
				keydown: this.move.bind( this )

			}
		}
	}
}
