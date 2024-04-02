namespace $.$$ {
    export class $mws_ollama_ui extends $.$mws_ollama_ui {
        auto() {
            console.log('CALL AUTO')
            if (!$mol_state_arg.dict()['page']) {
                $mol_state_arg.dict({ ...$mol_state_arg.dict(), page: 'chat' })
            }
            console.log($lib_ollama.Ollama())
        }

        @$mol_mem
        message_list() {
            console.log('CALL message_list')
            return this.messages().map(el => {
                return this.Item(el)
            })
        }

        @$mol_mem
        messages(next?: string[]) {
            return next ?? []
        }

        @$mol_mem
        system_message(next?: string) {
            return next ?? ''
        }

        wrapSystem(next: string) {
            return `<|im_start|>system\n${next}<|im_end|>`
        }
        wrapUser(next: string) {
            return `<|im_start|>user\n${next}<|im_end|>`
        }
        startAssistant(next: string) {
            return `<|im_start|>assistant\n${next}`
        }
		wrapTool(next: string, name:string) {
            return `<|im_start|>tool\n<tool_response>\n{"name": "${name}", "content":${next}}\n</tool_response><|im_end|>`
        }
        message_text(id: string) {
            return id
        }
        @$mol_action
		event_submit() {
            this.sendMessage()
        }

        contextMessages = [] as string[]
        humanMessages = [] as string[]

        @$mol_action
        reset_submit() {
            this.messages([])
            this.contextMessages = []
            this.humanMessages = []
        }

        composeContext() {
            let s = ''
            s += this.wrapSystem(this.system_message())
            for (const iterator of this.contextMessages) {
                s += iterator
            }
            return s
        }

        @$mol_action
        sendMessage() {
			if(this.messagecontroltext()){
				this.messages([...this.messages(), 'user: ' + this.messagecontroltext()])
				$mol_wire_sync(this.contextMessages).push(this.wrapUser(this.messagecontroltext()))
				this.messagecontroltext('')
			}
            
			
				this.callGenerate()	

            
        }
		@$mol_mem
		ollama(){
			return new ($lib_ollama.Ollama().Ollama)({ host: 'http://192.168.3.24:11434' })
		}
        @$mol_action
		callGenerate() {
			
			
            const resp = $mol_wire_sync(this.ollama()).generate({
                stream: false,
                model: 'm2',
                prompt: this.composeContext()+this.startAssistant(''),
                raw: true,
                // format: 'json',
                options: {
                    stop: [
						"<|im_start|>",
						"<|im_end|>"
					],
					main_gpu:1,
					num_gpu:10,
					num_ctx:32000
                },
            })
            //for await (const part of resp) {
            //console.log(part)
            //}
            //const s = resp.response;

            console.log(resp)
            const s = resp.response as string

            if (s.indexOf('<tool_call>') === -1) {
                this.contextMessages.push(this.startAssistant(s))
				this.messages([...this.messages(), 'AI: ' + s.replace('<|im_end|>','')])
            } else {
                const lines = s.split(`\n`)
				let toPush = '';
                let nextlineisjson = false
                for (const iterator of lines) {
                    if (nextlineisjson) {
                        nextlineisjson = false
                        let ts = iterator.replace(/\'/g, '"')
                        try {
                            let json = JSON.parse(ts)
                            if (!json.name || !this[json.name]) {
								throw new Error("No tool exist.");
                            }
							toPush = this[json.name]();
							
							toPush = JSON.stringify(toPush)
							
							this.contextMessages.push(this.wrapTool(toPush, json.name))
							
                        } catch (error) {
							console.log(error)
						}
                    } else if (iterator.indexOf('<tool_call>')>=0) {
                        nextlineisjson = true
                    }
                }
				if(!toPush){
					this.messages([...this.messages(),'Unknown result. Please modify your question.']) 
				}
				else{
					new $mol_after_frame($mol_wire_async(()=>this.callGenerate()))
				}
				

				
            }
        }
		get_current_date_time(){
			return new Date().toDateString()
		}
		get_stock_fundamentals(symbol: string){
			return {"name": "get_stock_fundamentals", "content": {'symbol': 'TSLA', 'company_name': 'Tesla, Inc.', 'sector': 'Consumer Cyclical', 'industry': 'Auto Manufacturers', 'market_cap': 611384164352, 'pe_ratio': 49.604652, 'pb_ratio': 9.762013, 'dividend_yield': "None", 'eps': 4.3, 'beta': 2.427, '52_week_high': 299.29, '52_week_low': 152.37}}
		}
    }
}
