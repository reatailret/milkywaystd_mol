namespace $.$$ {
	export class $mws_scroll_demo extends $.$mws_scroll_demo {
		
		ar: any = [];
		itemRendererFactory() {
			return new $mws_scroll_demo_testitemrenderer()
		}

		auto() {
			this.ar = []
				for (let index = 0; index < 500000; index++) {
					this.ar.push({ title: index });
				}
				this.viewPort().setData(this.ar);
			
			
		}
	}
	
}
