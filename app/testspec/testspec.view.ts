namespace $.$$ {
	
	export class $mws_app_testspec extends $.$mws_app_testspec {
		
		// Загрузить содержимое spec.md
		@$mol_mem
		spec_content() {
			
				// Загружаем файл с полным путём (deploy сохраняет структуру)
				const response = $.$mol_fetch.text('mws/app/testspec/spec.md')
				return response
			
		}
		
	}
	
}

