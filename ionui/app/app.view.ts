namespace $.$$ {
	export class $mws_ionui_app extends $.$mws_ionui_app {
		constructor() {
			super();
			window.document.querySelectorAll("[id^='$mol_style_attach']").forEach(el=>el.remove());
		}
	}
}
