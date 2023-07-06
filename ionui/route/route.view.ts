namespace $.$$ {
	export class $milkywaystd_ionui_route extends $.$milkywaystd_ionui_route {
		component: $mol_view | typeof $mol_view | null = null;
		url: string | null = null;
		cmp: string | null = null;
		constructor(
			component: $mol_view | null = null,
			url: string | null = null,
			cmp:string|null = null
		) {
			super();
			this.component = component;
			this.url = url;
			this.cmp = cmp;
		}

		@$mol_mem
		attr(): {} {
			return {
				url: this.url,
				id: "route_" + this.component?.toString(),
				component: "component_" + this.component?.toString(),
			};
		}
		auto() {
			(this.dom_node() as any).componentProps = () => ({
				component: this.component,
			});
		}
	}
}
