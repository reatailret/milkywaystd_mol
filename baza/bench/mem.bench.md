# Baza land memory bench

Сценарий как [bog/music YouTube → baza](https://github.com/b-on-g/music/tree/master): один `$giper_baza_file.buffer()` режет файл на чанки 32 КБ (`2**15`) в отдельный land. На сервере `glob.Land()` + `loading()` + `$mol_wire_solid()` оставляют граф в RAM.

## Как запускать

Cwd — корень MAM (`/home/reactor/git/mam`). Нужен `mam` на `:9080`.

```bash
cd /home/reactor/git/mam
curl -s -o /dev/null http://localhost:9080/mws/baza/bench/-/node.js
node --expose-gc --enable-source-maps ./mws/baza/bench/-/node.js bytes=10485760 via=glob
```

- `bytes` — размер одного файла (по умолчанию 10 MiB).
- `via=glob` — как сервер: `glob.Land(link)` остаётся в `$mol_mem_key` после drop JS-ссылки.
- `via=make` — изолированный `Land.make`, без кэша glob.
- `mode=units` — старый прогон N мелких `post()`.

Без `--expose-gc` leftover по heap ненадёжен.

Прогон **дописывает** строку в таблицу ниже.

## Прогоны

| when | mode | via | solid | chunks | payload_B | heap_base | heap_held | heap_drop | leftover | rss_base | rss_held | rss_drop | ab_base | ab_held | ab_drop | expose_gc | total |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|
| 2026-09-30T06:00:15.116Z | file | glob | on | 320 | 10485760 | 45.5 | 60.8 | 47.2 | +1.7 | 180.9 | 219.7 | 221.3 | 0.8 | 50.9 | 40.8 | true | 324 |
