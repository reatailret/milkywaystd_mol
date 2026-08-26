namespace $ {
	/**
	 * Репозиторий в памяти / кастомные функции (list_fn, one_fn, create_fn и т.д.)
	 */
	export class $mws_data_repo_memory<T extends Record<string, any>> extends $mws_data_repo<T> {

		data = [] as T[]
		@$mol_mem
		memory(next?: T[]): T[] {
			$mol_wire_solid()
			if(next !== undefined) {
				this.data = next
			}
			return this.data
			
		}

		@$mol_action
		override list_fn(): readonly T[] {
			console.log('list_fn', this.memory())
			return this.memory()
		}

		@$mol_mem
		override list_meta(next?: $mws_data_repo_meta): $mws_data_repo_meta {
			return {
				total: this.memory().length,
				offset: this.offset(),
				limit: this.limit()
			}
		}

		@$mol_action
		override one_fn(id: string | number): T {
			const item = this.memory().find(item => this.item_id(item) == id)
			if (!item) throw new Error('Item not found')
			return item
		}

		@$mol_action
		override create_fn(data: Partial<T>): T {
			const item = { ...data, [this.id_key()]: $mol_guid() } as T
			this.memory([...this.memory(), item])
			return item
		}

		@$mol_action
		override update_fn(id: string | number, data: Partial<T>): T {
			
			const item = this.memory().find(item => this.item_id(item) == id)
			if (!item) throw new Error('Item not found')
			const updated = { ...item, ...data } as T
			this.memory(this.memory().map(item => this.item_id(item) == id ? updated : item))
			return updated
			
		}

		@$mol_action
		override remove_fn(id: string | number) {
			this.memory(this.memory().filter(item => this.item_id(item) !== id))
			return id
		}
	}
}
