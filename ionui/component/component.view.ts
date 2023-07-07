namespace $ {
	export class $milkywaystd_ionui_component extends $milkywaystd_viewcontainer {
		
		@ $mol_mem
		classes(next?:Array<string>) : any{
			if(next !== undefined) return next;
			return [];
		}
		
		attr(){

			const attr = super.attr();
			this.dom_node().classList.remove(...this.classes());
			this.dom_node().classList.add(...this.classes());
			(attr as any)['class'] = this.dom_node().classList.toString();
			return attr;
		}
		style_size() {
			return {
		
			} as {
				[key: string]: string | number;
			}
		}
		
	}
}
