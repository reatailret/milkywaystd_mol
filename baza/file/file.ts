namespace $ {

	/**
	 * File с потоковым чтением чанков без `sands_open` на весь список.
	 *
	 * Базовый `chunks()` / `buffer()` по-прежнему открывают все balls сразу —
	 * для CRUD это ок. Play-путь: `read_range` / `readable` / `parts` —
	 * open → copy → unload. Размер сырого чанка при записи — `raw_chunk` (2¹⁵),
	 * как в `$giper_baza_file.buffer()`.
	 */
	export class $mws_baza_file extends $giper_baza_file {

		/** Размер полного сырого чанка при `buffer()` / записи. */
		static raw_chunk = 2 ** 15

		buffer( next?: Uint8Array< ArrayBuffer > ) {
			if( next !== undefined ) this._byte_length = -1
			return super.buffer( next )
		}

		/**
		 * Unit'ы чанков — только заголовки, без `sands_open`.
		 * Трек на 10 МБ ≈ 320 заголовков (~17 КБ), без байта звука в куче.
		 */
		chunk_units(): readonly $giper_baza_unit_sand[] {
			const list = this.Chunks()
			if( !list ) return []
			return list.land()
				.sand_ordered({ head: list.head(), peer: $giper_baza_link.hole })
				.filter( unit => !unit.dead() && unit.self().str !== '' )
		}

		private unpack( open: Uint8Array< ArrayBuffer > ): Uint8Array< ArrayBuffer > {
			const raw = ( $giper_baza_vary.take( open ) as any )[0]
			if( raw instanceof Uint8Array ) {
				return raw.slice() as Uint8Array< ArrayBuffer >
			}
			return new Uint8Array( raw ?? [] ) as Uint8Array< ArrayBuffer >
		}

		/**
		 * Байты одного чанка: open → unpack → unload.
		 * `sand_decode` не зовём — `@$mol_mem_key` держал бы чанк в кеше.
		 */
		async chunk_bytes( unit: $giper_baza_unit_sand ): Promise< Uint8Array< ArrayBuffer > > {
			const land = this.land() as $mws_baza_land
			const open = await land.sand_open( unit )
			try {
				return this.unpack( open )
			} finally {
				land.sand_unload( unit )
			}
		}

		chunk_bytes_sync( unit: $giper_baza_unit_sand ): Uint8Array< ArrayBuffer > {
			const land = this.land() as $mws_baza_land
			const open = $mol_wire_sync( land ).sand_open( unit ) as Uint8Array< ArrayBuffer >
			try {
				return this.unpack( open )
			} finally {
				land.sand_unload( unit )
			}
		}

		private _byte_length = -1

		/**
		 * Длина файла в сырых байтах.
		 * Полные чанки = raw_chunk; длину последнего узнаём одним open
		 * (не поднимая весь файл). Кеш — meta/Range не открывают last снова.
		 */
		byte_length(): number {
			if( this._byte_length >= 0 ) return this._byte_length
			const units = this.chunk_units()
			if( !units.length ) return this._byte_length = 0
			const last = this.chunk_bytes_sync( units[ units.length - 1 ] )
			return this._byte_length =
				( units.length - 1 ) * $mws_baza_file.raw_chunk + last.byteLength
		}

		/**
		 * Полуинтервал [start, end) сырых байт. Открывает только чанки,
		 * пересекающие окно; после каждого — unload.
		 */
		read_range( start: number, end: number ): Uint8Array< ArrayBuffer > {
			const units = this.chunk_units()
			const chunk = $mws_baza_file.raw_chunk
			const from = Math.max( 0, start | 0 )
			const to = Math.max( from, end | 0 )
			if( !units.length || from >= to ) {
				return new Uint8Array( 0 ) as Uint8Array< ArrayBuffer >
			}

			const first = Math.floor( from / chunk )
			const last = Math.min( units.length - 1, Math.floor( ( to - 1 ) / chunk ) )
			const out = new Uint8Array( to - from ) as Uint8Array< ArrayBuffer >
			let offset = 0

			for( let i = first; i <= last; i++ ) {
				const bytes = this.chunk_bytes_sync( units[ i ] )
				const base = i * chunk
				const a = Math.max( 0, from - base )
				const b = Math.min( bytes.byteLength, to - base )
				if( b > a ) {
					out.set( bytes.subarray( a, b ), offset )
					offset += b - a
				}
			}

			return offset === out.byteLength ? out : out.subarray( 0, offset ) as Uint8Array< ArrayBuffer >
		}

		/**
		 * Поток чанков с backpressure. Каждый pull поднимает один sand.
		 */
		readable(): ReadableStream< Uint8Array< ArrayBuffer > > {
			const units = this.chunk_units()
			let i = 0
			const file = this
			return new ReadableStream< Uint8Array< ArrayBuffer > >({
				async pull( controller ) {
					if( i >= units.length ) {
						controller.close()
						return
					}
					controller.enqueue( await file.chunk_bytes( units[ i++ ] ) )
				},
			})
		}

		/**
		 * Все чанки как отдельные буферы — для сборки Blob (LUFS и т.п.).
		 */
		parts(): Uint8Array< ArrayBuffer >[] {
			const units = this.chunk_units()
			const parts = [] as Uint8Array< ArrayBuffer >[]
			for( const unit of units ) {
				parts.push( this.chunk_bytes_sync( unit ) )
			}
			return parts
		}

	}

}
