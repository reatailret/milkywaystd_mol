namespace $.$$ {
	
	export class $mws_app_notes extends $.$mws_app_notes {
		
		// Доступ к базе данных через CRUS
		@$mol_mem
		person() {
			return this.$.$giper_baza_glob.home($mws_app_notes_person)
		}
		
		// Поисковый запрос
		@$mol_mem
		search_query(next?: string) {
			return next ?? ''
		}
		
		// Получить все заметки, отсортированные по дате создания
		@$mol_mem
		notes_all() {
			const notes = this.person().note_list()
			return [...notes].sort((a: $mws_app_notes_note, b: $mws_app_notes_note) => {
				const timeA = a.created_at().valueOf()
				const timeB = b.created_at().valueOf()
				return timeB - timeA // Сортировка от новых к старым
			})
		}
		
		// Отфильтрованные заметки по поисковому запросу
		@$mol_mem
		notes_filtered() {
			const query = this.search_query().toLowerCase().trim()
			
			if (!query) {
				return this.notes_all()
			}
			
			return this.notes_all().filter((note: $mws_app_notes_note) => {
				const title = note.title().toLowerCase()
				const content = note.content().toLowerCase()
				return title.includes(query) || content.includes(query)
			})
		}
		
		// Получить ID заметки по индексу
		@$mol_mem_key
		note_id(index: number) {
			const note = this.notes_filtered()[index]
			return note ? note.link().toString()! : ''
		}
		
		// Получить заметку по ID
		@$mol_mem_key
		note_by_id(id: string) {
			return this.$.$giper_baza_glob.Node(
				new $giper_baza_link(id),
				$mws_app_notes_note
			)
		}
		
		// Строки для отображения в списке
		@$mol_mem
		note_rows() {
			const notes = this.notes_filtered()
			const rows = []
			
			for (let i = 0; i < notes.length; i++) {
				rows.push((this as any).Note_row(i))
			}
			
			return rows
		}
		
		// Создать новую заметку
		@$mol_action
		note_add() {
			const note = this.person().note_make()
			note.title('Новая заметка')
			note.content('')
		}
		
		// Заголовок заметки для редактирования
		@$mol_mem_key
		note_title(index: number, next?: string) {
			const id = this.note_id(index)
			if (!id) return ''
			
			const note = this.note_by_id(id)
			
			if (next !== undefined) {
				note.title(next)
			}
			
			return note.title()
		}
		
		// Текст заметки
		@$mol_mem_key
		note_text(index: number, next?: string) {
			const id = this.note_id(index)
			if (!id) return ''
			
			const note = this.note_by_id(id)
			
			if (next !== undefined) {
				note.content(next)
			}
			
			return note.content()
		}
		
		// Дата создания
		@$mol_mem_key
		Note_created_date(index: number) {
			const id = this.note_id(index)
			if (!id) return ''
			
			const note = this.note_by_id(id)
			const created = note.created_at()
			return created.toString('YYYY-MM-DD HH:mm')
		}
		
		// Дата обновления
		@$mol_mem_key
		Note_updated_date(index: number) {
			const id = this.note_id(index)
			if (!id) return ''
			
			const note = this.note_by_id(id)
			const updated = note.updated_at()
			return updated.toString('YYYY-MM-DD HH:mm')
		}
		
		// Удалить заметку
		@$mol_action
		note_delete(index: number) {
			const id = this.note_id(index)
			if (!id) return
			
			const note = this.note_by_id(id)
			const person = this.person()
			person.note_delete(note)
		}
		
	}
	
}
