namespace $.$$ {
	export class $mws_ionui_page extends $.$mws_ionui_page {
		
		@ $mol_mem
		classes(next?:Array<string>){
			if(next !== undefined) return next;
			return [];
		}
		/*
		attr(){
			
			const attr = super.attr();
			attr['class'] = this.dom_node().classList.toString();
			return attr;
		}
		*/
	}
}
