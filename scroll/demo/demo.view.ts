namespace $.$$ {
	export class $milkywaystd_scroll_demo extends $.$milkywaystd_scroll_demo {
		
		ar: any = [];
		itemRendererFactory() {
			return new $milkywaystd_scroll_testitemrenderer()
		}

		auto() {
			if (!this.ar.length) {
				for (let index = 0; index < 1000; index++) {
					this.ar.push({ title: index });
				}
				this.viewPort().setData(this.ar);
			}
			
		}
	}
	
}
