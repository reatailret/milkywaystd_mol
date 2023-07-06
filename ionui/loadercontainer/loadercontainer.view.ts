namespace $.$$ {
	export class $milkywaystd_ionui_loadercontainer extends $.$milkywaystd_ionui_loadercontainer {
		@ $mol_mem
		component(next?:any){
			if(next !== undefined) return next;
			return null
		}
		
		@ $mol_mem
		loading(next?:any){
			if(next !== undefined) return next;
			return null
		}
		@ $mol_mem
		getSub(){
			return this.loading()?[this.Spinner()]:[this.component()]
		}
		
	}
}
