namespace $ {
	
	function $mws_baza_bench_gc() {
		try {
			;( globalThis as any ).gc?.()
		} catch {}
	}
	
	function $mws_baza_bench_sleep( ms: number ) {
		return new Promise< void >( done => setTimeout( done, ms ) )
	}
	
	function $mws_baza_bench_mem() {
		const mem = process.memoryUsage()
		return {
			heapUsedMB: Math.round( mem.heapUsed / 104857.6 ) / 10,
			rssMB: Math.round( mem.rss / 104857.6 ) / 10,
			arrayBuffersMB: Math.round( ( mem.arrayBuffers ?? 0 ) / 104857.6 ) / 10,
			externalMB: Math.round( ( mem.external ?? 0 ) / 104857.6 ) / 10,
		}
	}
	
	function $mws_baza_bench_solid_on() {
		try {
			const src = require( 'fs' ).readFileSync(
				require( 'path' ).join( process.cwd(), 'giper/baza/land/land.ts' ),
				'utf8',
			) as string
			return /^\s*\$mol_wire_solid\(\)/m.test( src )
		} catch {
			return null
		}
	}
	
	function $mws_baza_bench_md_path() {
		return require( 'path' ).join( process.cwd(), 'mws/baza/bench/mem.bench.md' )
	}
	
	function $mws_baza_bench_link() {
		let seed = ( Date.now() % 1_000_000_000 ) + 1
		while( true ) {
			const link = $giper_baza_link.from_int( 1_000_003 * seed + 17 )
			++ seed
			if( link.str && ! /[æÆ]/.test( link.str ) ) return link
		}
	}
	
	function $mws_baza_bench_write_md( row: Record< string, string | number | boolean | null > ) {
		
		const fs = require( 'fs' )
		const path = $mws_baza_bench_md_path()
		
		const header = [
			'| when | mode | via | solid | chunks | payload_B | heap_base | heap_held | heap_drop | leftover | rss_base | rss_held | rss_drop | ab_base | ab_held | ab_drop | expose_gc | total |',
			'|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|',
		]
		
		const line = '| ' + [
			row.when,
			row.mode,
			row.via,
			row.solid,
			row.chunks,
			row.payload_B,
			row.heap_base,
			row.heap_held,
			row.heap_drop,
			row.leftover,
			row.rss_base,
			row.rss_held,
			row.rss_drop,
			row.ab_base,
			row.ab_held,
			row.ab_drop,
			row.expose_gc,
			row.total,
		].join( ' | ' ) + ' |'
		
		let old_rows = [] as string[]
		try {
			const prev = fs.readFileSync( path, 'utf8' ) as string
			old_rows = prev.split( '\n' ).filter( ( l: string )=> /^\| 20\d\d-/.test( l.trim() ) )
		} catch {}
		
		const body = [
			'# Baza land memory bench',
			'',
			'Сценарий как [bog/music YouTube → baza](https://github.com/b-on-g/music/tree/master): один `$giper_baza_file.buffer()` режет файл на чанки 32 КБ (`2**15`) в отдельный land. На сервере `glob.Land()` + `loading()` + `$mol_wire_solid()` оставляют граф в RAM.',
			'',
			'## Как запускать',
			'',
			'Cwd — корень MAM (`/home/reactor/git/mam`). Нужен `mam` на `:9080`.',
			'',
			'```bash',
			'cd /home/reactor/git/mam',
			'curl -s -o /dev/null http://localhost:9080/mws/baza/bench/-/node.js',
			'node --expose-gc --enable-source-maps ./mws/baza/bench/-/node.js bytes=10485760 via=glob',
			'```',
			'',
			'- `bytes` — размер одного файла (по умолчанию 10 MiB).',
			'- `via=glob` — как сервер: `glob.Land(link)` остаётся в `$mol_mem_key` после drop JS-ссылки.',
			'- `via=make` — изолированный `Land.make`, без кэша glob.',
			'- `mode=units` — старый прогон N мелких `post()`.',
			'',
			'Без `--expose-gc` leftover по heap ненадёжен.',
			'',
			'Прогон **дописывает** строку в таблицу ниже.',
			'',
			'## Прогоны',
			'',
			... header,
			... old_rows,
			line,
			'',
		].join( '\n' )
		
		fs.writeFileSync( path, body )
		return path
		
	}
	
	export function $mws_baza_bench() {
		
		const mode = $mol_state_arg.value( 'mode' ) ?? 'file'
		const via = $mol_state_arg.value( 'via' ) ?? 'glob'
		
		const units_raw = Number( $mol_state_arg.value( 'units' ) ?? $mol_state_arg.value( 'mem_repro_units' ) )
		const units_count = Number.isFinite( units_raw ) && units_raw > 0 ? Math.floor( units_raw ) : ( mode === 'file' ? 1 : 1500 )
		
		const bytes_raw = Number( $mol_state_arg.value( 'bytes' ) ?? $mol_state_arg.value( 'mem_repro_bytes' ) )
		const payload_bytes = Number.isFinite( bytes_raw ) && bytes_raw > 0
			? Math.floor( bytes_raw )
			: ( mode === 'file' ? 10 * 1024 * 1024 : 8192 )
		
		$.$giper_baza_mine = $giper_baza_mine_temp
		
		const solid_on = $mws_baza_bench_solid_on()
		const expose_gc = typeof ( globalThis as any ).gc === 'function'
		
		;( async()=> {
			
			// #region agent log
			$giper_baza_debug_log( 'H20', 'mws/baza/bench/bench.node.ts:start', 'one-file bench start', {
				mode,
				via,
				units_count,
				payload_bytes,
				solid_on,
				expose_gc,
				runId: 'file-bench',
			} )
			// #endregion
			
			$mws_baza_bench_gc()
			await $mws_baza_bench_sleep( 50 )
			const baseline = $mws_baza_bench_mem()
			
			// #region agent log
			$giper_baza_debug_log( 'H20', 'mws/baza/bench/bench.node.ts:baseline', 'one-file bench baseline', {
				runId: 'file-bench',
				... baseline,
			} )
			// #endregion
			
			const link = via === 'glob'
				? $.$giper_baza_auth.current().pass().lord()
				: $mws_baza_bench_link()
			let land: $giper_baza_land | null = via === 'glob'
				? $.$giper_baza_glob.Land( link )
				: $giper_baza_land.make({ $: $ })
			
			await $mol_wire_async( ()=> land!.loading() )()
			
			let chunks = 0
			
			if( mode === 'file' ) {
				
				const file = land.Data( $giper_baza_file )
				const payload = new Uint8Array( payload_bytes )
				const write = $mol_wire_async( ()=> {
					file.type( 'audio/mp4' )
					file.buffer( payload )
				} )
				try {
					await write()
				} catch( error: any ) {
					$giper_baza_debug_log( 'H20', 'mws/baza/bench/bench.node.ts:write_fail', 'file.buffer failed', {
						runId: 'file-bench',
						error: String( error?.message ?? error ),
					} )
					process.exit( 1 )
				}
				chunks = file.chunks().length
				if( chunks === 0 ) {
					$giper_baza_debug_log( 'H20', 'mws/baza/bench/bench.node.ts:empty', 'file.buffer wrote zero chunks', {
						runId: 'file-bench',
						payload_bytes,
						land: land.link().str,
					} )
					process.exit( 1 )
				}
				
			} else {
				
				const payload = 'x'.repeat( payload_bytes )
				const post = $mol_wire_async( ( i: number )=> {
					land!.post(
						$giper_baza_link.hole,
						$giper_baza_link.hole,
						null,
						payload + '\n' + i,
					)
				} )
				for( let i = 0; i < units_count; ++ i ) await post( i )
				chunks = units_count
				
			}
			
			const held = $mws_baza_bench_mem()
			const total = land.total()
			
			// #region agent log
			$giper_baza_debug_log( 'H21', 'mws/baza/bench/bench.node.ts:held', 'one-file bench held', {
				runId: 'file-bench',
				mode,
				via,
				land: land.link().str,
				chunks,
				total,
				payload_bytes,
				... held,
			} )
			// #endregion
			
			land = null
			
			for( let i = 0; i < 8; ++ i ) {
				$mws_baza_bench_gc()
				await $mws_baza_bench_sleep( 50 )
			}
			
			const dropped = $mws_baza_bench_mem()
			const leftover = Math.round( ( dropped.heapUsedMB - baseline.heapUsedMB ) * 10 ) / 10
			
			// #region agent log
			$giper_baza_debug_log( 'H22', 'mws/baza/bench/bench.node.ts:dropped', 'one-file bench dropped', {
				runId: 'file-bench',
				via,
				leftover,
				... dropped,
			} )
			// #endregion
			
			const md = $mws_baza_bench_write_md({
				when: new Date().toISOString(),
				mode,
				via,
				solid: solid_on === null ? '?' : solid_on ? 'on' : 'off',
				chunks,
				units: units_count,
				payload_B: payload_bytes,
				heap_base: baseline.heapUsedMB,
				heap_held: held.heapUsedMB,
				heap_drop: dropped.heapUsedMB,
				leftover: leftover >= 0 ? '+' + leftover : leftover,
				rss_base: baseline.rssMB,
				rss_held: held.rssMB,
				rss_drop: dropped.rssMB,
				ab_base: baseline.arrayBuffersMB,
				ab_held: held.arrayBuffersMB,
				ab_drop: dropped.arrayBuffersMB,
				expose_gc,
				total,
			})
			
			// #region agent log
			$giper_baza_debug_log( 'H22', 'mws/baza/bench/bench.node.ts:md', 'one-file bench wrote md', {
				runId: 'file-bench',
				md,
				leftover,
				chunks,
			} )
			// #endregion
			
			process.stdout.write( md + '\n' )
			process.exit( 0 )
			
		} )()
		
	}
	
	$mws_baza_bench()
	
}
