namespace $.$$ {
	export class $milkywaystd_scroll_demo_testitemrenderer extends $.$milkywaystd_scroll_demo_testitemrenderer {
		onData(obj:CdkVirtualForOfContext<any>){
			
			this.context(obj)
		}
		@$mol_mem
		title() {
			return this.implicit()?.title;
		}
		@ $mol_mem
		context(next?:any):CdkVirtualForOfContext<any>{
			
			if(next !== undefined) {
				this.implicit(next.implicit)
				return next;
			}
			return 	{
					
				} as CdkVirtualForOfContext<any>
			
		}

		@ $mol_mem
		implicit(next?:any):any
		{
			
			if(next !== undefined) {
				
				return next};
			return 	null
			
		}

		@$mol_mem
		dom_id(): string
		{
			return 'milkywaystd_scroll_testitemrenderer_' + this.title()
		}

	}
}
