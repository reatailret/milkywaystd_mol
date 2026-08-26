namespace $ {
	
	// Модель заметки
	export class $mws_app_notes_note extends $giper_baza_entity.with({
		// Title унаследовано от $giper_baza_entity (заголовок)
		Content: $giper_baza_text,        // Текст заметки
		CreatedAt: $giper_baza_atom_time, // Дата создания
		UpdatedAt: $giper_baza_atom_time, // Дата обновления
	}) {
		
		// Геттер/сеттер для текста заметки
		content(next?: string) {
			if (next !== undefined) {
				this.Content(null)?.text(next)
			}
			return this.Content(null)?.text() ?? ''
		}
		
		
		// Геттер/сеттер для даты создания
		created_at(next?: $mol_time_moment) {
			if (next !== undefined) {
				this.CreatedAt(null)?.val(next)
			}
			return this.CreatedAt(null)?.val() ?? new $mol_time_moment()
		}
		
		// Геттер/сеттер для даты обновления
		updated_at(next?: $mol_time_moment) {
			if (next !== undefined) {
				this.UpdatedAt(null)?.val(next)
			}
			return this.UpdatedAt(null)?.val() ?? new $mol_time_moment()
		}
		
	}
	
	// Корневая модель - профиль пользователя с заметками
	export class $mws_app_notes_person extends $giper_baza_home.with({
		Note: $giper_baza_list_link_to(() => $mws_app_notes_note),
	}) {
		
		// Получить список всех заметок
		@$mol_mem
		note_list() {
			return this.Note()?.remote_list() ?? []
		}
		
		// Создать новую заметку
		@$mol_action
		note_make() {
			const note = this.Note(null)!.make(null)
			note.created_at(new $mol_time_moment())
			note.updated_at(new $mol_time_moment())
			return note
		}
		
		// Удалить заметку
		@$mol_action
		note_delete(note: $mws_app_notes_note) {
			this.Note(null)?.cut(note.ref())
		}
		
	}
	
}

