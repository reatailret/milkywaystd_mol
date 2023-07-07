namespace $ {
	export class $milkywaystd_ionui_demo_route extends $mol_view {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= IonRouter
		 * 	<= IonApp
		 * ```
		 */
		sub() {
			return [
				this.IonRouter(),
				this.IonApp()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * getRoutes /
		 * ```
		 */
		getRoutes() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * IonRouter $milkywaystd_ionui_router sub <= getRoutes
		 * ```
		 */
		@ $mol_mem
		IonRouter() {
			const obj = new this.$.$milkywaystd_ionui_router()
			
			obj.sub = () => this.getRoutes()
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonMenuI $IonMenu
		 * ```
		 */
		@ $mol_mem
		IonMenuI() {
			const obj = new this.$.$IonMenu()
			
			return obj
		}
		
		/**
		 * ```tree
		 * RouterOutlet $RouterOutlet
		 * ```
		 */
		@ $mol_mem
		RouterOutlet() {
			const obj = new this.$.$RouterOutlet()
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonApp $milkywaystd_ionui_app sub /
		 * 	<= IonMenuI
		 * 	<= RouterOutlet
		 * ```
		 */
		@ $mol_mem
		IonApp() {
			const obj = new this.$.$milkywaystd_ionui_app()
			
			obj.sub = () => [
				this.IonMenuI(),
				this.RouterOutlet()
			] as readonly any[]
			
			return obj
		}
	}
	
	export class $RouterOutlet extends $milkywaystd_ionui_routeroutlet {
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	id \outlet
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				id: "outlet"
			} as Record< string, any >
		}
	}
	
	export class $IonMenu extends $milkywaystd_ionui_menu {
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	content-id \outlet
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				"content-id": "outlet"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= IonHeader
		 * 	<= MenuContent
		 * ```
		 */
		sub() {
			return [
				this.IonHeader(),
				this.MenuContent()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * MenuTitleText \Menu
		 * ```
		 */
		MenuTitleText() {
			return "Menu"
		}
		
		/**
		 * ```tree
		 * IonTitle $milkywaystd_ionui_title sub / <= MenuTitleText
		 * ```
		 */
		@ $mol_mem
		IonTitle() {
			const obj = new this.$.$milkywaystd_ionui_title()
			
			obj.sub = () => [
				this.MenuTitleText()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonToolbar $milkywaystd_ionui_toolbar sub / <= IonTitle
		 * ```
		 */
		@ $mol_mem
		IonToolbar() {
			const obj = new this.$.$milkywaystd_ionui_toolbar()
			
			obj.sub = () => [
				this.IonTitle()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonHeader $milkywaystd_ionui_header sub / <= IonToolbar
		 * ```
		 */
		@ $mol_mem
		IonHeader() {
			const obj = new this.$.$milkywaystd_ionui_header()
			
			obj.sub = () => [
				this.IonToolbar()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * ilh \Navigation
		 * ```
		 */
		ilh() {
			return "Navigation"
		}
		
		/**
		 * ```tree
		 * IonListHeader $milkywaystd_ionui_listheader sub / <= ilh
		 * ```
		 */
		@ $mol_mem
		IonListHeader() {
			const obj = new this.$.$milkywaystd_ionui_listheader()
			
			obj.sub = () => [
				this.ilh()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * ic1 $milkywaystd_ionui_icon attr *
		 * 	slot \start
		 * 	name \home
		 * ```
		 */
		@ $mol_mem
		ic1() {
			const obj = new this.$.$milkywaystd_ionui_icon()
			
			obj.attr = () => ({
				slot: "start",
				name: "home"
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * hl \Home
		 * ```
		 */
		hl() {
			return "Home"
		}
		
		/**
		 * ```tree
		 * il1 $milkywaystd_ionui_label sub / <= hl
		 * ```
		 */
		@ $mol_mem
		il1() {
			const obj = new this.$.$milkywaystd_ionui_label()
			
			obj.sub = () => [
				this.hl()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonItem $milkywaystd_ionui_item
		 * 	attr *
		 * 		button \true
		 * 		href \/
		 * 	sub /
		 * 		<= ic1
		 * 		<= il1
		 * ```
		 */
		@ $mol_mem
		IonItem() {
			const obj = new this.$.$milkywaystd_ionui_item()
			
			obj.attr = () => ({
				button: "true",
				href: "/"
			} as Record< string, any >)
			obj.sub = () => [
				this.ic1(),
				this.il1()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonMenuToggle $milkywaystd_ionui_menutoggle sub / <= IonItem
		 * ```
		 */
		@ $mol_mem
		IonMenuToggle() {
			const obj = new this.$.$milkywaystd_ionui_menutoggle()
			
			obj.sub = () => [
				this.IonItem()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * ic3 $milkywaystd_ionui_icon attr *
		 * 	slot \start
		 * 	name \logo-octocat
		 * ```
		 */
		@ $mol_mem
		ic3() {
			const obj = new this.$.$milkywaystd_ionui_icon()
			
			obj.attr = () => ({
				slot: "start",
				name: "logo-octocat"
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * hl3 \Foto feed
		 * ```
		 */
		hl3() {
			return "Foto feed"
		}
		
		/**
		 * ```tree
		 * il3 $milkywaystd_ionui_label sub / <= hl3
		 * ```
		 */
		@ $mol_mem
		il3() {
			const obj = new this.$.$milkywaystd_ionui_label()
			
			obj.sub = () => [
				this.hl3()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonItem3 $milkywaystd_ionui_item
		 * 	attr *
		 * 		button \true
		 * 		href \virtual
		 * 	sub /
		 * 		<= ic3
		 * 		<= il3
		 * ```
		 */
		@ $mol_mem
		IonItem3() {
			const obj = new this.$.$milkywaystd_ionui_item()
			
			obj.attr = () => ({
				button: "true",
				href: "virtual"
			} as Record< string, any >)
			obj.sub = () => [
				this.ic3(),
				this.il3()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonMenuToggle3 $milkywaystd_ionui_menutoggle sub / <= IonItem3
		 * ```
		 */
		@ $mol_mem
		IonMenuToggle3() {
			const obj = new this.$.$milkywaystd_ionui_menutoggle()
			
			obj.sub = () => [
				this.IonItem3()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * MenuContent $milkywaystd_ionui_content sub /
		 * 	<= IonListHeader
		 * 	<= IonMenuToggle
		 * 	<= IonMenuToggle3
		 * ```
		 */
		@ $mol_mem
		MenuContent() {
			const obj = new this.$.$milkywaystd_ionui_content()
			
			obj.sub = () => [
				this.IonListHeader(),
				this.IonMenuToggle(),
				this.IonMenuToggle3()
			] as readonly any[]
			
			return obj
		}
	}
	
}

