namespace $.$$ {
	export class $mws_router extends $.$mws_router {
		
		@$mol_mem		
		sub(){
			const current = this.$.$mol_state_arg.dict()
			const pageParamValue = current[this.param()]
			if(pageParamValue) {
				const route = this.routes().find(route => route.param() === pageParamValue)
				if(route) {
					return [route.component()]
				}
			}
			else {
				const route = this.routes().find(route => route.param() === '')
				if(route) {
					return [route.component()]
				}
			}
			return []
		}
		
	}
}