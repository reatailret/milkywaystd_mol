namespace $.$$ {
	export class $milkywaystd_scroll_VirtualScrollViewport extends $.$milkywaystd_scroll_VirtualScrollViewport {
		
		protected forOf:null|$milkywaystd_scroll_VirtualForOf = null;
		public forOfCtl:null|$milkywaystd_scroll_VirtualScrollViewportController = null;
		getForOf(){

			if(!this.forOf){

				this.forOfCtl = new $milkywaystd_scroll_VirtualScrollViewportController(
					this.dom_node(),
					new $milkywaystd_scroll_strategy_FixedSizeVirtualScrollStrategy(
						this.itemHeight(),
						this.minBufferPx(),
						this.maxBufferPx()
					),
					null,
					new $milkywaystd_scroll_ScrollDispatcher(window.document)
				);

				this.forOfCtl.Init();
			
				this.forOf = new $milkywaystd_scroll_VirtualForOf();
				this.forOf.cdkVirtualForTemplate = this.itemRendererFactory

				this.forOfCtl._contentWrapper = this.forOf.dom_node();
				this.forOf._viewport = this.forOfCtl;
				this.forOf.init();
			}
			
			return this.forOf

		}
		itemHeight(){
			return 50
		}
		itemRendererFactory(){
			throw new Error("Need to override this function");
		}

		setData(data){
			this.forOf?.dataStream(data)
		}
		@$mol_mem
		totalContentWidth(){
			return this.forOfCtl?._totalContentWidth()
		}
		@$mol_mem
		totalContentHeight(){
			return this.forOfCtl?._totalContentHeight()
		}
		minBufferPx(){
			return 100;
		}
		maxBufferPx(){
			return 200;
		}
		sub(): readonly any[]
		{
			return [...this.pre_sub(),...super.sub(),...this.post_sub()]	
		}
	}
	
}

