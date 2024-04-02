namespace $.$$ {
    export class $milkywaystd_llama_ui extends $.$milkywaystd_llama_ui {
        auto() {
            console.log('CALL AUTO')
            if (!$mol_state_arg.dict()['page']) {
                $mol_state_arg.dict({ ...$mol_state_arg.dict(), page: 'chat' })
            }
            $lib_llama.all()
        }
		@$mol_mem
		zod(){
			return $mol_import.module('https://esm.sh/zod')
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
		wrapTool(next: string) {
            return `<|im_start|>tool\n<tool_response>\n${next}}\n</tool_response><|im_end|>`
        }
		wrapToolInner(next: string, name:string) {
            return `{"name": "${name}", "content":${next}}\n`
        }
		wrapToolCall(next: string) {
            return `<|im_start|>assistant\n<tool_call>\n${next}\n</tool_call><|im_end|>`
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
		callLlama(){
			const api = $lib_llama.all().llamacpp.Api({
				baseUrl: {
				 host: "192.168.3.24",
				 //host: "127.0.0.1",
				  port: "8080",
				},
				
			  });
			return $lib_llama.all().generateObject({

				model: $lib_llama.all().llamacpp
				  .CompletionTextGenerator({
					api,
					//promptTemplate: $lib_llama.all().llamacpp.prompt.ChatML, // Choose the prompt template from the model card
					//maxGenerationTokens: 1024, // limit the output size
					
				  }).withSettings({
					contextWindowSize:32000,
					stopSequences:['<|im_start|>','<|im_end|>'],
					
				  }).asObjectGenerationModel($lib_llama.all().jsonObjectPrompt.text()),
				  
			  
				prompt: this.composeContext() + this.startAssistant(''),
				schema: $lib_llama.all().zodSchema(
					this.zod().object({
							answer:this.zod().string().describe('assistant answer').optional(),
							tools:this.zod().array(this.zod().object({
								'name':this.zod().string().describe('<function-name>').optional(),
								arguments:this.zod().object({}).describe('<args-dict>').optional()
							})).describe('<tool_call>').optional(),
							
						})
					  ),
					
				  
			  });
	
		}
        @$mol_action
		callGenerate() {
			
			const respjson = $mol_wire_sync(this).callLlama()
			console.log(respjson)
			if (!respjson.tools || !respjson.tools.length || respjson.answer!='tool') {
                this.contextMessages.push(this.startAssistant(respjson.answer))
				this.messages([...this.messages(), 'AI: ' + respjson.answer.replace('<|im_end|>','')])
            } else {
                
				let toPush = '';
                
                for (const f of respjson.tools) {
                    
                        
                        try {
                            
                            if (!this[f.name]) {
								throw new Error("No tool exist.");
                            }
							this.contextMessages.push(this.wrapToolCall(JSON.stringify(f)))
							const r = $mol_wire_sync(this)[f.name]();
							
							toPush += this.wrapToolInner(JSON.stringify(r),f.name)
							
							
							
                        } catch (error) {
							console.log(error)
						}
                    
                }

				if(!toPush){
					this.messages([...this.messages(),'Unknown result. Please modify your question.']) 
				}
				else{
					this.contextMessages.push(this.wrapTool(toPush))
					new $mol_after_frame($mol_wire_async(()=>this.callGenerate()))
				}
				

				
            }
            
        }
		get_current_date_time(){
			return new Date().toLocaleDateString()
		}
		get_stock_fundamentals(symbol: string){
			return {"name": "get_stock_fundamentals", "content": {'symbol': 'TSLA', 'company_name': 'Tesla, Inc.', 'sector': 'Consumer Cyclical', 'industry': 'Auto Manufacturers', 'market_cap': 611384164352, 'pe_ratio': 49.604652, 'pb_ratio': 9.762013, 'dividend_yield': "None", 'eps': 4.3, 'beta': 2.427, '52_week_high': 299.29, '52_week_low': 152.37}}
		}
    }
}
