namespace $.$$ {
	export class $milkywaystd_ionui_component extends $.$milkywaystd_ionui_component {
		
		@ $mol_mem
		classes(next?:Array<string>){
			if(next !== undefined) return next;
			return [];
		}
		
		attr(){

			const attr = super.attr();
			this.dom_node().classList.remove(...this.classes());
			this.dom_node().classList.add(...this.classes());
			attr['class'] = this.dom_node().classList.toString();
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
