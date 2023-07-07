
namespace $.$$ {
	export class $milkywaystd_ionui_demo_catrotator extends $.$milkywaystd_ionui_demo_catrotator {

		public static cache = new Map();
		@ $mol_mem
		src(){
			
			//if(this.idx() !== null) return 'https://cataas.com/cat/says/meow?height=240' + this.idx();
			if(this.idx() !== null) return 'https://loremflickr.com/360/640?r=' + this.idx();
			return null
		}

		@ $mol_mem
		idx(){
			
			return this.implicit()?this.implicit().id:0
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

		@ $mol_mem
		imgSrc():null|string{
		
			if(!this.src()) return null;
			if($milkywaystd_ionui_demo_catrotator.cache.has(this.src())) return $milkywaystd_ionui_demo_catrotator.cache.get(this.src())

			const buffer = $mol_fetch.buffer(this.src()!);
			//var arrayBufferView = new Uint8Array( this.response );
			const blob = new Blob( [ buffer ], { type: "image/jpeg" } );
			const urlCreator = window.URL || window.webkitURL;
			const imageUrl = urlCreator.createObjectURL( blob );
			$milkywaystd_ionui_demo_catrotator.cache.set(this.src(), imageUrl)
			return imageUrl;
		}
		subsciber:any=null;
		/////////////////////////////////
		rotate(){
			
			//this.src(Math.random());
			$milkywaystd_ionui_demo_pages_page4.alert()
			
		}
		
		
		dom_id(): string
		{
			return '$milkywaystd_ionui_demo_route_catrotator_' + this.idx()
		}


		onData(obj:CdkVirtualForOfContext<any>){
			
			this.context(obj)
		}

		
		
	}
}
