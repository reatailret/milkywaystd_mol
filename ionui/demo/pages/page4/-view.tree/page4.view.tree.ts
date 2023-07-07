namespace $ {
	export class $milkywaystd_ionui_demo_pages_page4 extends $milkywaystd_ionui_component {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= IonHeader
		 * 	<= IonContent
		 * ```
		 */
		sub() {
			return [
				this.IonHeader(),
				this.IonContent()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * IonMenuButton $milkywaystd_ionui_menubutton
		 * ```
		 */
		@ $mol_mem
		IonMenuButton() {
			const obj = new this.$.$milkywaystd_ionui_menubutton()
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonButtons $milkywaystd_ionui_buttons
		 * 	attr * slot \start
		 * 	sub / <= IonMenuButton
		 * ```
		 */
		@ $mol_mem
		IonButtons() {
			const obj = new this.$.$milkywaystd_ionui_buttons()
			
			obj.attr = () => ({
				slot: "start"
			} as Record< string, any >)
			obj.sub = () => [
				this.IonMenuButton()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Text \Foto feed
		 * ```
		 */
		Text() {
			return "Foto feed"
		}
		
		/**
		 * ```tree
		 * IonTitle $milkywaystd_ionui_title sub / <= Text
		 * ```
		 */
		@ $mol_mem
		IonTitle() {
			const obj = new this.$.$milkywaystd_ionui_title()
			
			obj.sub = () => [
				this.Text()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonTollbar $milkywaystd_ionui_toolbar sub /
		 * 	<= IonButtons
		 * 	<= IonTitle
		 * ```
		 */
		@ $mol_mem
		IonTollbar() {
			const obj = new this.$.$milkywaystd_ionui_toolbar()
			
			obj.sub = () => [
				this.IonButtons(),
				this.IonTitle()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonHeader $milkywaystd_ionui_header sub / <= IonTollbar
		 * ```
		 */
		@ $mol_mem
		IonHeader() {
			const obj = new this.$.$milkywaystd_ionui_header()
			
			obj.sub = () => [
				this.IonTollbar()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * ionRefresh?val null
		 * ```
		 */
		@ $mol_mem
		ionRefresh(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * getRefersherDisabled true
		 * ```
		 */
		getRefersherDisabled() {
			return true
		}
		
		/**
		 * ```tree
		 * RefresherContent $milkywaystd_ionui_refreshercontent
		 * ```
		 */
		@ $mol_mem
		RefresherContent() {
			const obj = new this.$.$milkywaystd_ionui_refreshercontent()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Refresher $milkywaystd_ionui_refresher
		 * 	event * ionRefresh?val <=> ionRefresh?val
		 * 	attr *
		 * 		slot \fixed
		 * 		disabled <= getRefersherDisabled
		 * 	sub / <= RefresherContent
		 * ```
		 */
		@ $mol_mem
		Refresher() {
			const obj = new this.$.$milkywaystd_ionui_refresher()
			
			obj.event = () => ({
				ionRefresh: (val?: any) => this.ionRefresh(val)
			} as Record< string, any >)
			obj.attr = () => ({
				slot: "fixed",
				disabled: this.getRefersherDisabled()
			} as Record< string, any >)
			obj.sub = () => [
				this.RefresherContent()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * itemRendererFactory null
		 * ```
		 */
		itemRendererFactory() {
			return null as any
		}
		
		/**
		 * ```tree
		 * getSpinnerDisplay \flex
		 * ```
		 */
		getSpinnerDisplay() {
			return "flex"
		}
		
		/**
		 * ```tree
		 * infspin $milkywaystd_ionui_spinner
		 * 	attr * slot \fixed
		 * 	style *
		 * 		width \100%
		 * 		height \32px
		 * 		margin-top \22px
		 * 		display <= getSpinnerDisplay
		 * ```
		 */
		@ $mol_mem
		infspin() {
			const obj = new this.$.$milkywaystd_ionui_spinner()
			
			obj.attr = () => ({
				slot: "fixed"
			} as Record< string, any >)
			obj.style = () => ({
				width: "100%",
				height: "32px",
				"margin-top": "22px",
				display: this.getSpinnerDisplay()
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * viewPort $milkywaystd_scroll_VirtualScrollViewport
		 * 	itemRendererFactory <= itemRendererFactory
		 * 	itemHeight 600
		 * 	minBufferPx 2400
		 * 	maxBufferPx 4800
		 * 	style * height \100%
		 * 	pre_sub /
		 * 	post_sub / <= infspin
		 * ```
		 */
		@ $mol_mem
		viewPort() {
			const obj = new this.$.$milkywaystd_scroll_VirtualScrollViewport()
			
			obj.itemRendererFactory = () => this.itemRendererFactory()
			obj.itemHeight = () => 600
			obj.minBufferPx = () => 2400
			obj.maxBufferPx = () => 4800
			obj.style = () => ({
				height: "100%"
			} as Record< string, any >)
			obj.pre_sub = () => [
			] as readonly any[]
			obj.post_sub = () => [
				this.infspin()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonContent $IC4 sub /
		 * 	<= Refresher
		 * 	<= viewPort
		 * ```
		 */
		@ $mol_mem
		IonContent() {
			const obj = new this.$.$IC4()
			
			obj.sub = () => [
				this.Refresher(),
				this.viewPort()
			] as readonly any[]
			
			return obj
		}
	}
	
	export class $IC4 extends $milkywaystd_ionui_content {
		
		/**
		 * ```tree
		 * attr * scroll-y \false
		 * ```
		 */
		attr() {
			return {
				"scroll-y": "false"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * classes / \ion-padding
		 * ```
		 */
		classes() {
			return [
				"ion-padding"
			] as readonly any[]
		}
	}
	
}

