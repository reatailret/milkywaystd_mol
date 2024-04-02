namespace $ {
	export type $mws_ollama_ws_command =
		| {
			type: 'auth'
			data: {
				token: string
				db: string
			}
		} | 'ping'
	export class $mws_ollama_client extends $.$gd_core_ws<$mws_ollama_ws_command> {
		
			override on_data( data: unknown ) {
				if (data === 'pong') return this.watchdog(null)
	
				return super.on_data(data)
			}
	
			id_prefix() {
				return ''
			}
	
			url(){
				return 'ws://localhost:9081'
			}
			protected id_create() {
				return this.id_prefix() + '#' + (super.id_create() ?? 'unk')
			}
	
	
			override on_object( raw: Object ) {

				console.log('WS MESSAGE',raw)
				let obj:any
	
				try {
					obj = raw
					this.messages([...this.messages(), raw])
				} catch (e) {
					if ($mol_promise_like(e)) $mol_fail_hidden(e)
	
					return // ignore unknown message
				}
	
				if (! obj || typeof obj === 'string') return
	
				
				if (obj.type === 'error') {
					this.error({ val: $mol_wire_sync($mol_error_mix).make(obj.data, { cause: obj }) })
					if (obj.data === 'auth timeout') this.watchdog(obj.data)
				}
			}
	
			ping_send() {
				this.send('ping', true)
			}
	
			@$mol_mem
			messages(next?:any[]){
				this.ws()
				return next??[]
			}
		}
		
	}
