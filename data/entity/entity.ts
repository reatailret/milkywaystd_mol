namespace $ {
	/**
	 * Базовый класс для моделей сущностей
	 * Поддерживает работу с черновиками, сохранение, удаление
	 */
	export class $mws_data_entity<T extends Record<string, any>> extends $mol_object {
		
		/**
		 * Репозиторий данных
		 */
		@$mol_mem
		repo(next?: $mws_data_repo<T>): $mws_data_repo<T> {
			return next ?? null!
		}

		@$mol_action
		reload() {
			this.repo().item_reload(this.id())
		}
		
		/**
		 * Идентификатор сущности
		 */
		@$mol_mem
		id(next?: string | number): string | number {
			return next ?? ''
		}
		
		/**
		 * Значения по умолчанию
		 */
		defaults(): Partial<T> {
			return {}
		}
		
		/**
		 * Данные сущности
		 */
		@$mol_mem
		data(next?: T | null): T | null {
			if (next !== undefined) return next
			
			const id = this.id()
			if (!id) return null
			
			return this.repo().item(id)
		}
		
		/**
		 * Черновик (для редактирования)
		 */
		@$mol_mem
		draft(next?: Partial<T> | null): Partial<T> | null {
			return next ?? null
		}
		
		/**
		 * Получить актуальные данные (черновик или сохраненные)
		 */
		@$mol_mem
		data_actual(): T | Partial<T> | null {
			const draft = this.draft()
			if (draft) return draft
			return this.data()
		}
		
		/**
		 * Получить значение поля
		 */
		@$mol_mem_key
		field<K extends keyof T>(
			key: K,
			next?: T[K]
		): T[K] | undefined {
			this.repo()
			const actual = this.data_actual()
			
			if (next !== undefined) {
				// Записываем в черновик
				const draft = { ...actual, [key]: next } as Partial<T>
				this.draft(draft)
				return next
			}
			
			return actual?.[key]
		}
		
		/**
		 * Сохранить изменения
		 */
		@$mol_action
		save() {
			
			const draft = this.draft()
			
			if (!draft) return
			
			const id = this.id()
			
			
			if (id) {
				// Обновление существующей сущности
				this.repo().update(id, draft)
			
			} else {
				// Создание новой сущности
				const created = this.repo().create(draft)
				const new_id = (created as any)[this.repo().id_key()]
				this.id(new_id)
			
			}
			// Очистить черновик после сохранения
			new this.$.$mol_after_tick(() => this.draft(null))

			return this.repo().item(this.id())
		}
		
		/**
		 * Отменить изменения
		 */
		@$mol_action
		abort() {
			this.draft(null)
		}
		
		/**
		 * Удалить сущность
		 */
		@$mol_action
		remove() {
			const id = this.id()
			if (!id) return
			
			this.repo().remove(id)
			this.data(null)
		}
		
		/**
		 * Есть ли несохраненные изменения
		 */
		@$mol_mem
		dirty(): boolean {
			const draft = this.draft()
			if (!draft) return false
			
			const data = $mol_wire_probe(() => this.data())
			if (!data) return true
			
			return !$mol_compare_deep(data, { ...data, ...draft })
		}
		
		
		
		
	}
}

