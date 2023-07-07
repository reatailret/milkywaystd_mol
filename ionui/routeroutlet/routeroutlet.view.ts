namespace $.$$ {
	export class $milkywaystd_ionui_routeroutlet extends $.$milkywaystd_ionui_routeroutlet {
		auto() {
			
			(this.dom_node() as any).delegate = this.delegate();
			this.dom_node().addEventListener('ionNavWillLoad',this.ionNavWillLoad);
			this.dom_node().addEventListener('ionNavWillChange',this.ionNavWillChange);
			this.dom_node().addEventListener('ionNavDidChange',this.ionNavDidChange);
		}
		delegate() {
			return this;
		}
		ionNavWillChange(ev:any){
			//console.log('ionNavWillChange', ev);
		}
		ionNavWillLoad(ev:any){
			//console.log('ionNavWillLoad', ev);
		}
		ionNavDidChange(ev:any){
			//console.log('ionNavDidChange', ev);
		}
		@$mol_mem
		subelement(next?:any){
			if(next !== undefined) return next;
			return null;
		}
		// sub <=
		@ $mol_mem
		getSubs() {
			return this.subelement()?[this.subelement()]:[];

		}
		attachViewToDom(
			container: any,
			component: any,
			propsOrDataObj?: any,
			cssClasses?: string[]
		) {
			
			let comp = propsOrDataObj().component as any;
			if(!(comp instanceof $mol_view)){
				comp = new comp();
			}
			const el = comp.dom_node();
			el.classList.add(...cssClasses!);	
			el.style.removeProperty('display');
			this.subelement(comp);
			
			return el;
			
		}
		removeViewFromDom(container: any, component: any) {
			return Promise.resolve();
		}
	}
}
