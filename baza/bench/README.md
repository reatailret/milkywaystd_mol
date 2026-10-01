# Baza land memory bench

Один большой файл, как скачивание YouTube в [bog/music](https://github.com/b-on-g/music/tree/master): `$giper_baza_file.buffer()` → чанки 32 КБ → sync на baza-сервер. Не `*.test.ts`.

## Запуск

Cwd — корень MAM. Нужен `mam` на `:9080`.

```bash
cd /home/reactor/git/mam
curl -s -o /dev/null http://localhost:9080/mws/baza/bench/-/node.js
node --expose-gc --enable-source-maps ./mws/baza/bench/-/node.js bytes=10485760 via=glob
```

- `bytes` — размер файла (по умолчанию 10 MiB).
- `via=glob` — как сервер (`glob.Land` в кэше). `via=make` — без glob.
- `mode=units` — старый N×post.

Результаты: [`mem.bench.md`](mem.bench.md).
