namespace $ {
	export class $milkywaystd_ionui_demo_pages_page2 extends $milkywaystd_ionui_component {
		
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
		 * Text \Main
		 * ```
		 */
		Text() {
			return "Main"
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
		 * IonContent $IC2
		 * ```
		 */
		@ $mol_mem
		IonContent() {
			const obj = new this.$.$IC2()
			
			return obj
		}
	}
	
	export class $IC2 extends $milkywaystd_ionui_content {
		
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
		
		/**
		 * ```tree
		 * sub / <= titleel
		 * ```
		 */
		sub() {
			return [
				this.titleel()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * text1 \Hello $mol!
		 * ```
		 */
		text1() {
			return "Hello $mol!"
		}
		
		/**
		 * ```tree
		 * titleel $milkywaystd_ionui_title sub / <= text1
		 * ```
		 */
		@ $mol_mem
		titleel() {
			const obj = new this.$.$milkywaystd_ionui_title()
			
			obj.sub = () => [
				this.text1()
			] as readonly any[]
			
			return obj
		}
	}
	
}

