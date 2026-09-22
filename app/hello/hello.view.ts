namespace $.$$
{
	export class $mws_app_hello extends $.$mws_app_hello
	{

		/** Номер страницы, как аргумент в адресе. */
		@ $mol_mem
		page( next?: number ) {
			return next ?? 1
		}

		@ $mol_action
		next( event?: Event ) {
			this.page( this.page() + 1 )
		}

		/** Адрес запроса строк, как `url_list()` у репозитория. */
		@ $mol_mem
		url() {
			return '/rows?page=' + this.page()
		}

		requests = [] as string[]

		/** Быстрый запрос строк. Адрес снимается внутри задачи. */
		@ $mol_action
		rows_load() {
			const url = this.url()
			this.$.$mol_wait_timeout( 200 )
			this.requests.push( url )
			return 'rows of ' + url
		}

		/** Медленный запрос счётчика. Даёт время нажать кнопку. */
		@ $mol_action
		total_load() {
			this.$.$mol_wait_timeout( 3000 )
			return 25
		}

		@ $mol_mem
		rows() {
			this.page()
			const rows = this.rows_load()
			const total = this.total_load()
			return rows + ', total ' + total
		}

		page_label() {
			return 'Page ' + this.page()
		}

		rows_label() {
			return 'Rows: ' + this.rows()
		}

		requests_label() {
			this.rows()
			return 'Requests: ' + this.requests.join( ' , ' )
		}

		hint() {
			return 'Press Next page, wait until rows appear, then press Next page again while total is still loading. Rows must match Page.'
		}

	}
}
