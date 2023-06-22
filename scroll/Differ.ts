namespace $.$$ {
	export class $milkywaystd_scroll_Differ {
		private _diff: Array<$milkywaystd_scroll_Diff> = [];
		

		private _map = new Map();

		public create(init: Array<any>) {
			
		}
		public diff(items: Array<any>): Array<$milkywaystd_scroll_Diff> {
			this._diff = [];
			const s = new Set();
			for (let index = 0; index < items.length; index++) {
				const element = items[index];
				const idx = this._map.get(element);
				
				if (idx === undefined) {
					this._map.set(element, index);
					this._diff.push({
						currentIndex: index,
						previousIndex: null,
						item: element,
					});
				} else if (index !== idx) {
					this._map.set(element, index);
					/*this._diff.push({
						currentIndex: index,
						previousIndex: idx,
						item: element,
					});*/
				}
				s.add(element);
			}
			this._map.forEach((value, key, map) => {
				if (!s.has(key)) {
					this._diff.push({
						currentIndex: null,
						previousIndex: value,
						item: key,
					});
					map.delete(key);
					this._diff;
				}
			});

			return this._diff;
		}
	}
	export type $milkywaystd_scroll_Diff = {
		currentIndex: number | null;
		previousIndex: number | null;
		item: any;
	};
}
