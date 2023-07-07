namespace $ {
	export class $milkywaystd_ionui_demo_catrotator extends $milkywaystd_viewcontainer {
		
		/**
		 * ```tree
		 * sub / <= IonCard
		 * ```
		 */
		sub() {
			return [
				this.IonCard()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * imgSrc null
		 * ```
		 */
		imgSrc() {
			return null as any
		}
		
		/**
		 * ```tree
		 * IonImg $milkywaystd_ionui_img attr * src <= imgSrc
		 * ```
		 */
		@ $mol_mem
		IonImg() {
			const obj = new this.$.$milkywaystd_ionui_img()
			
			obj.attr = () => ({
				src: this.imgSrc()
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * txt \Awesome images
		 * ```
		 */
		txt() {
			return "Awesome images"
		}
		
		/**
		 * ```tree
		 * IonCardSubitle $milkywaystd_ionui_cardsubtitle sub / <= txt
		 * ```
		 */
		@ $mol_mem
		IonCardSubitle() {
			const obj = new this.$.$milkywaystd_ionui_cardsubtitle()
			
			obj.sub = () => [
				this.txt()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonCardHeader $milkywaystd_ionui_cardheader sub / <= IonCardSubitle
		 * ```
		 */
		@ $mol_mem
		IonCardHeader() {
			const obj = new this.$.$milkywaystd_ionui_cardheader()
			
			obj.sub = () => [
				this.IonCardSubitle()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * idx 0
		 * ```
		 */
		idx() {
			return 0
		}
		
		/**
		 * ```tree
		 * txt2 \Vote
		 * ```
		 */
		txt2() {
			return "Vote"
		}
		
		/**
		 * ```tree
		 * rotate?val null
		 * ```
		 */
		@ $mol_mem
		rotate(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * btn $milkywaystd_ionui_button
		 * 	sub / <= txt2
		 * 	event * click?val <=> rotate?val
		 * ```
		 */
		@ $mol_mem
		btn() {
			const obj = new this.$.$milkywaystd_ionui_button()
			
			obj.sub = () => [
				this.txt2()
			] as readonly any[]
			obj.event = () => ({
				click: (val?: any) => this.rotate(val)
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonCardcontent $milkywaystd_ionui_cardcontent sub /
		 * 	<= idx
		 * 	<= btn
		 * ```
		 */
		@ $mol_mem
		IonCardcontent() {
			const obj = new this.$.$milkywaystd_ionui_cardcontent()
			
			obj.sub = () => [
				this.idx(),
				this.btn()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * IonCard $milkywaystd_ionui_card sub /
		 * 	<= IonImg
		 * 	<= IonCardHeader
		 * 	<= IonCardcontent
		 * ```
		 */
		@ $mol_mem
		IonCard() {
			const obj = new this.$.$milkywaystd_ionui_card()
			
			obj.sub = () => [
				this.IonImg(),
				this.IonCardHeader(),
				this.IonCardcontent()
			] as readonly any[]
			
			return obj
		}
	}
	
}

