namespace $ {
	
	export class $milkywaystd_ollama_server extends $mol_server {
		port() {
			return 9081
		}

		handleRequest(
			req : typeof $node.express.request ,
			res : typeof $node.express.response ,
			next : () => any
		) {
			this.$.$mol_log3_rise({
				place: this ,
				message: `Request` ,
				req
			})
		}

		@ $mol_mem
		lines( next = new Map< InstanceType<$node['ws']>, string >() ) {
			return next
		}
		
		@ $mol_mem
		socket() {
			
			return super.socket().on( 'connection' , ( line , req )=> {
				
				this.$.$mol_log3_rise({
					place: this ,
					message: `On connect` ,
				
				})

				line.send(JSON.stringify({message:'welcome'}))
				
				const path = req.url!.replace( /\/-.*/ , '' ).substring( 1 )

				this.$.$mol_log3_rise({
					place: this ,
					message: `Connect` ,
					path ,
				})
				
				this.lines( new Map( [ ... this.lines(), [ line, path ] ] ) )
				
				line.on( 'close' , ()=> {
					
					const lines = new Map( this.lines() )
					lines.delete( line )
					this.lines( lines )
					
				} )
				
			} )
			
		}
	}
	$milkywaystd_ollama_server.make({}).socket()
}
