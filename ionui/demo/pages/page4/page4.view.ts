namespace $.$$ {
	export class $milkywaystd_ionui_demo_pages_page4 extends $.$milkywaystd_ionui_demo_pages_page4 {
		ar: any = [];
		static alert(){
			const alert= document.createElement('ion-alert')  as any;
			alert.header = 'Alert';
			alert.subHeader = 'Vote';
			alert.message = 'Accepted';
			alert.buttons = ['OK'];

			document.body.appendChild(alert);
			alert.present();
		}
		
		@$mol_mem
		pending(next?: any) {
			if (undefined !== next) return next;
			return false;
		}
		loadnext() {
			this.pending(true);
			setTimeout(() => {
				this.pending(false);
				const l = this.ar.length + 1;
				for (let index = 0; index < 10; index++) {
					this.ar.push({ id: l + index });
					this.viewPort().setData(this.ar);
				}
			}, 2000);
		}
		loadnew() {
			this.pending(true);
			setTimeout(() => {
				
				$milkywaystd_ionui_demo_catrotator.cache.clear()
				this.ar = [];
				for (let index = 0; index < 10; index++) {
					this.ar.push({ id: index });
				}
				this.viewPort().setData(this.ar);
				(this.Refresher().dom_node() as any).complete()
				this.pending(false);
			}, 2000);
		}
		@$mol_mem
		getRefersherDisabled(next?:boolean){
			if(undefined!== next) return next;
			return false;
		}
		ionRefresh(){
			this.loadnew()
		}
		
		auto() {
			
			this.loadnew()
			this.viewPort()
				.forOfCtl?.elementScrolled()
				?.auditTime(200)
				.subscribe((range) => {
					if (
						this.viewPort()?.forOfCtl?.measureScrollOffset("bottom")! <
							20 &&
						!this.pending()
					) {
						this.loadnext();
					}
					if(this.viewPort()?.forOfCtl?.measureScrollOffset("top")!<50){
						this.getRefersherDisabled(false)
					}else{
						this.getRefersherDisabled(true)
					}
				});
				return null
		}

		itemRendererFactory() {
			return new $milkywaystd_ionui_demo_catrotator();
		}
		@$mol_mem
		getSpinnerDisplay() {
			return this.pending() ? "flex" : "none";
		}
	}
}
