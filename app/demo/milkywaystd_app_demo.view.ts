namespace $.$$ {
	export class $milkywaystd_app_demo extends $.$milkywaystd_app_demo {
		
		@$mol_mem
		names_demo_filtered_(){
			return this.names()
		}
		@$mol_mem
		filter_suggests_()
		{
			return (this as any).filter_suggests()
		}
		
	
		@$mol_mem
		tree_menu_items(){
			
			const names = this.names();
	
			let stack = [] as {label:string, tags?:string[], parent?:any, items?:any[]}[];
			const result_items = [];
			if(this.menu_items().length){
				stack.push(...this.menu_items())
			}
			while(stack.length){
				// item to create
				const menu_item:Partial<$milkywaystd_ui_treemenu_data_item> = {label:'',link:'',items:[], parent:null}
				
				// input item
				const item = stack.shift()!

				menu_item.label = item.label;
				menu_item.id = $mol_key(item.label);
				if(item.tags && item.tags.length){
					for (const name of names) {
						
						if(!name) continue
						let title = ''
						if((this as any).Widget( name ).title) title = (this as any).Widget( name ).title()
						const tags = ((this as any).Widget( name ).tags() as string[]).map( tag => tag.toLowerCase().trim() )
						
						const subs = []
						for (const tag of item.tags) {
							if(tags.includes(tag)){
								menu_item.id = $mol_key(item.label+name);
								console.log(item.label,tag,name)
								const menu_item_child:$milkywaystd_ui_treemenu_data_item = {id:$mol_key(item.label+tag+name),label:title?title:name,link:{ 'demo' : name },items:[]}
								menu_item.items!.push(menu_item_child)
								break
							}
						}
						
					}
				}
				if(item.items){
					for (const child of item.items) {
						child.parent = menu_item;
					}
					stack.push(...item.items)
				}
				if(item.parent){
					item.parent.items.push(menu_item)
				}
				else{
					result_items.push(menu_item)
				}
			}
			/*for (const result_item of result_items) {
				if(result_item.items?.length === 1 && result_item.items[0].items?.length === 0){
					result_item.link = result_item.items[0].link
					result_item.items = []
				}
			}*/
			
			return result_items
		}
	}
	export class $milkywaystd_app_demo_menu_tree extends $.$milkywaystd_app_demo_menu_tree {

		@ $mol_mem
		override filter( next?: string ) {
			return this.$.$mol_state_session.value( 'filter' , next === '' ? null : next ) ?? super.filter() as string
		}
		
		
		
	}
}

