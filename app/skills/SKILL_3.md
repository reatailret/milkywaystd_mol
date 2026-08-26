# Тестирование в $mol

## Ключевая идея

В $mol **UI тестируется как обычные функции**. Каждое свойство компонента — это функция. Состояние компонента полностью определяется возвращаемыми значениями его функций-свойств. Поэтому для проверки UI не нужен DOM и рендеринг — достаточно вызвать функцию и проверить результат.

**Любое состояние — это функция → любое состояние можно проверить вызовом функции.**

## Запуск тестов

Тесты запускаются **прямо в браузере при открытии приложения**. MAM автоматически собирает все `*.test.ts` файлы модуля (и его зависимостей) в `web.test.js`.

### URL для тестов

```
http://localhost:9080/my/app/-/test.html
```

В этом репозитории (MWS data):

```
http://localhost:9080/mws/data/demo/-/test.html
```

Собираются тесты модуля **и его зависимостей** — например, `mws/data/repo/memory/repo.memory.test.ts` попадает в `web.test.js` демо-приложения.

### Что происходит при открытии test.html

1. Загружается `web.js` (всё приложение)
2. Загружается `web.test.js` (все тесты)
3. Через 1 секунду после загрузки `$mol_test_schedule()` запускает все зарегистрированные тесты
4. Результаты выводятся **в консоль браузера**
5. Если все тесты прошли: `All tests passed, count: N`
6. Если тест упал — ошибка в консоли с трейсом

### Структура test.html (генерируется автоматически)

```html
<script src="web.js" charset="utf-8"></script>
<script src="web.test.js" charset="utf-8"></script>
```

## Файлы тестов

Тесты хранятся **рядом с модулем** в файлах `*.test.ts`:

```
mws/crud/
├── crud.ts          # Модуль
├── crud.test.ts     # Тесты модуля
└── web.meta.tree
```

Для view-компонентов допустим также `*.view.test.ts`:

```
hyoo/budget/app/
├── app.view.tree     # Шаблон
├── app.view.ts       # Поведение
└── app.view.test.ts  # Тесты UI
```

### После добавления теста

Dev-сервер на `:9080` пересобирает `web.test.js` автоматически. После нового или изменённого `*.test.ts` достаточно **перезагрузить страницу** `test.html`.

## Базовая структура теста

```typescript
namespace $ {
    $mol_test({

        'название теста'() {
            // тело теста
            $mol_assert_equal(2 ** 3, 8)
        },

        'другой тест'() {
            $mol_assert_equal([1, 2], [1, 2])
        },

    })
}
```

Каждый тест — именованный метод объекта, передаваемого в `$mol_test()`.

## Контекст теста (`$`)

См. также: `mol/ambient/readme.md`, раздел «Ambient-контекст» в `mol-common.md`.

### Как устроен контекст в $mol

`$` — глобальный неймспейс: все модули, `fetch`, `Math`, `$mol_guid` и т.д. — поля одного объекта. Объекты `$mol_object2` берут зависимости через **`this.$`**, а не через `import`.

В тестах контекст — тот же механизм, что и в приложении: подменяете поля в `$` и назначаете контекст объекту.

### Что делает `$mol_test_run`

Для **каждого** теста (см. `mol/test/test.test.ts`):

```typescript
let context = Object.create($$)           // наследует глобальный неймспейс
for (let mock of $mol_test_mocks) await mock(context)  // накладывает моки
test(context)                             // передаёт context первым аргументом
```

- `$$` — глобальный неймспейс со всеми модулями
- `context` — изолированный объект на каждый тест; моки пишутся в него, не в глобальный `$`
- Параметр `($)` в теле теста **опционален** — если не объявлен, тест использует глобальный `$`; для компонентов с `this.$` параметр нужен

### Что мокается по умолчанию

Через `$mol_test_mocks` на `context` накладывается:

- **`Math.random`** — детерминированный `Math.sin(seed++)`, seed=0
- **`XMLHttpRequest`** — любое обращение бросает `"XMLHttpRequest is forbidden in tests"`
- **`fetch`** — любое обращение бросает `"fetch is forbidden in tests"`

Сетевые зависимости подменяйте через `this.$` (см. ниже). `$mol_guid()` в тестах тоже детерминирован за счёт мока `Math.random`.

### Связка теста и компонента

```typescript
$mol_test({
    'form validation'($) {
        const form = new $my_form()
        form.$ = $   // компонент видит тестовый context (с моками)

        form.name('')
        $mol_assert_equal(form.name_bid(), 'Required')
    },
})
```

`Component.make({ $ })` — то же самое при создании.

**Наследование:** если `parent.$ = $` и `parent.Child()` создаёт дочерний объект, `Child` унаследует `$` от `parent` через owning-дерево — отдельно назначать не нужно.

### Контекст на уровне класса

```typescript
'Context in instance inherits from class'($) {
    const custom = $.$mol_ambient({})
    class X extends $.$mol_object {
        static $ = custom
    }
    $mol_assert_equal(new X().$, custom)
}
```

Полезно, когда все экземпляры класса в тесте должны стартовать с одним контекстом.

## Утилиты assert

### `$mol_assert_equal(a, b, ...)`

Глубокое структурное сравнение (через `$mol_compare_deep`). Все аргументы должны быть равны:

```typescript
$mol_assert_equal(42, 42)
$mol_assert_equal([1, 2], [1, 2])
$mol_assert_equal({ a: 1 }, { a: 1 })
$mol_assert_equal('a', 'a', 'a') // три аргумента — все равны
```

### `$mol_assert_unique(a, b, ...)`

Все аргументы должны быть **различны** друг от друга:

```typescript
$mol_assert_unique([1], [2], [3])
```

### `$mol_assert_fail(handler, ErrorType)`

Проверяет, что функция бросает ошибку:

```typescript
$mol_assert_fail(
    () => { throw new Error('Parse error') },
    'Parse error'  // проверка по тексту
)

$mol_assert_fail(
    () => { throw new Error('fail') },
    Error  // проверка по классу
)
```

### Устаревшие (но работают)

- `$mol_assert_like(a, b)` → используйте `$mol_assert_equal`
- `$mol_assert_ok(value)` → используйте `$mol_assert_equal(value, true)` или подобное
- `$mol_assert_not(value)` → используйте `$mol_assert_equal`

## Мокирование зависимостей через `$mol_ambient`

### Как работает `$mol_ambient`

`$mol_ambient` создаёт **производный контекст** — объект с переопределёнными полями и прототипом = родительский `$`:

```typescript
// mol/ambient/ambient.ts
function $mol_ambient(this: $ | void, overrides: Partial<$>): $ {
    return Object.setPrototypeOf(overrides, this || $)
}
```

- Свои поля `overrides` — подмены (`$mws_fetch`, `console`, …)
- Всё остальное — из прототипа (глобальный `$` или тестовый `context`)

Вызов с `this` привязывает родителя: `test_context.$mol_ambient({ ... })` — мок поверх тестового контекста, а не глобального.

### Паттерн мокирования

```typescript
namespace $.$$ {
    $mol_test({

        'CRUD operations with mocked fetch'() {
            const srv = new $mws_crud<Product>()

            // 1. Создаём мок-контекст, подменяя $mws_fetch
            const context_mock = $mol_ambient({
                $mws_fetch: Object.assign({}, $mws_fetch, {
                    json: (request: RequestInfo, params: RequestInit) => {
                        if (params.method === 'POST') return { ...newItem }
                        if (params.method === 'DELETE') return ''
                        return { ...mockResponse }
                    }
                })
            })

            // 2. Назначаем мок-контекст объекту
            srv.$ = context_mock

            // 3. Теперь srv использует мок вместо реального fetch
            srv.apiResource = "products"
            srv.apiUrl = "https://example.com/"

            $mol_assert_equal(5, srv.list().length)
        },

    })
}
```

### Почему это работает

Компоненты обращаются к зависимостям через `this.$`:
- `this.$.$mws_fetch.json(...)` — если подменили `$mws_fetch` в контексте, вызовется мок
- `this.$.$mol_locale.text(...)` — если не подменяли, берётся из прототипной цепочки

`obj.$ = context_mock` можно назначить **один раз**; повторная запись бросает `'Context already defined'`.

Альтернатива: `$.$mol_ambient_make(Obj, overrides)` — создаёт экземпляр сразу с контекстом.

### Мок поверх тестового `$`

Когда тест уже принимает `($)` и нужна точечная подмена:

```typescript
'fetch mock on test context'($) {
    const srv = new $mws_crud<Product>()
    srv.$ = $.$mol_ambient({
        $mws_fetch: Object.assign({}, $.$mws_fetch, { json: () => mockData }),
    })
    // мок наследует тестовые Math.random, forbidden fetch и т.д.
}
```

## Тестирование UI как функций

### Концепция

В $mol компонент — это набор функций-свойств. `sub()` возвращает дочерние элементы, `title()` — заголовок, `checked()` — состояние чекбокса и т.д. Рендеринг лишь **вызывает** эти функции. Значит, можно проверять UI-логику напрямую:

```
   Вместо:                              Делаем:
   ┌────────────────────┐               ┌────────────────────┐
   │  render → DOM →    │               │  вызываем функцию  │
   │  querySelector →   │               │  → проверяем       │
   │  проверяем         │               │    результат       │
   └────────────────────┘               └────────────────────┘
```

### Пример: тестирование свойств компонента

```typescript
namespace $.$$ {
    $mol_test({

        'form validation'($) {
            const form = new $my_form()
            form.$ = $

            form.name('')
            $mol_assert_equal(form.name_bid(), 'Required')

            form.name('Jo')
            $mol_assert_equal(form.name_bid(), 'Too short')

            form.name('John')
            $mol_assert_equal(form.name_bid(), '')
        },

    })
}
```

Здесь `name_bid()` — функция валидации, вызываемая при рендере формы. Мы тестируем её напрямую, без рендера.

### Пример: тестирование навигации и дочерних компонентов

```typescript
namespace $.$$ {
    $mol_test({

        async "Fund making and hiding"($) {
            // Создаём компонент с тестовым контекстом
            const app = $hyoo_budget_app.make({ $ })

            // Проверяем начальное состояние UI через функции
            $mol_assert_equal(app.menu_links().length, 0)

            // Симулируем клик (через $mol_wire_async для async-события)
            await $mol_wire_async(app.Fund_make()).click(
                new $mol_dom_context.MouseEvent('click')
            )

            // Проверяем, что UI-состояние изменилось
            $mol_assert_equal(app.menu_links().length, 1)

            // Проверяем вложенный компонент
            const fund = app.person().fund_list()[0]
            $mol_assert_equal(fund.title(), '')
            $mol_assert_equal(fund.ballance(), 0)

            // Проверяем навигацию (pages — тоже функция)
            const spread = app.Spread(fund.ref().description)
            $mol_assert_equal(app.pages(), [app.Menu(), spread.Menu()])

            // Проверяем состояние чекбокса (без рендеринга)
            $mol_assert_equal(spread.Visible().checked(), true)

            // Меняем состояние
            spread.Visible().checked(false)

            // Проверяем реакцию UI
            $mol_assert_equal(app.menu_links().length, 0)
        },

    })
}
```

### Пример: тестирование рендеринга DOM

Когда нужно проверить непосредственно DOM-вывод:

```typescript
namespace $ {
    $mol_test({

        'content render'($) {
            class $mol_view_test extends $mol_view {
                sub() { return ['lol', 5] }
            }

            var x = new $mol_view_test()
            x.$ = $

            $mol_assert_equal(x.dom_tree().innerHTML, 'lol5')
        },

        'custom attributes'($) {
            class $mol_view_test extends $mol_view {
                attr() {
                    return { 'href': '#link', 'required': true, 'hidden': false }
                }
            }

            var x = new $mol_view_test()
            x.$ = $
            var node = x.dom_tree()

            $mol_assert_equal(node.getAttribute('href'), '#link')
            $mol_assert_equal(node.getAttribute('required'), 'true')
            $mol_assert_equal(node.getAttribute('hidden'), null)
        },

    })
}
```

### Пример: создание компонента с подменой свойств

Подменяем свойства-функции напрямую при создании:

```typescript
$mol_test({
    'Fuzzy search'() {
        const dimmer = new $mol_dimmer
        dimmer.needle = () => 'foo bar'
        dimmer.haystack = () => ' barfoo '
        $mol_assert_equal(dimmer.strings(), [' ', 'bar', '', 'foo', ' '])
    },
})
```

Поскольку свойства — функции, их можно просто заменить стрелочной функцией с нужным возвращаемым значением.

## Асинхронные тесты

Тесты могут возвращать промис. `$mol_test_run` автоматически определяет это через `$mol_promise_like` и ждёт разрешения (таймаут: 1 секунда):

```typescript
$mol_test({
    async 'async fetch test'($) {
        $mol_assert_equal(
            await $mol_wire_async($mol_fetch).text('data:text/plain,foo'),
            'foo',
        )
    },
})
```

Для симуляции async-событий UI используйте `$mol_wire_async`:

```typescript
await $mol_wire_async(button).click(new $mol_dom_context.MouseEvent('click'))
```

## `.make({ $ })` — создание компонента с контекстом

`$mol_object.make()` создаёт экземпляр класса с переопределёнными свойствами. Удобно для передачи тестового контекста:

```typescript
const app = $my_app.make({ $ })
// Эквивалентно:
// const app = new $my_app()
// app.$ = $
```

Это статический метод `$mol_object`, который создаёт экземпляр и применяет конфигурацию:

```typescript
static make(config: Partial<InstanceType<This>>) {
    return super.create(obj => {
        for (let key in config) obj[key] = config[key]
    })
}
```

## Полный реальный пример: тестирование CRUD-сервиса

```typescript
namespace $.$$ {

    type testProduct = { id: number, title: string, price: number }

    $mol_test({

        "common"() {
            const srv = new $mws_crud<testProduct>()

            // Мок сетевого слоя через $mol_ambient
            const context_mock = $mol_ambient({
                $mws_fetch: Object.assign({}, $mws_fetch, {
                    json: (request: RequestInfo, params: RequestInit) => {
                        if (params.method === 'PATCH' || params.method === 'PUT') {
                            return { ...item, ...JSON.parse(params.body as string) }
                        }
                        if (params.method === 'POST') return { ...newItem }
                        if (params.method === 'DELETE') return ''
                        // GET
                        if ((request as string).indexOf('/21') !== -1) {
                            return { ...serverItem }
                        }
                        return { ...resp }
                    }
                })
            })
            srv.$ = context_mock

            // Настройка сервиса
            srv.apiResource = "products"
            srv.apiUrl = "https://dummyjson.com/"
            srv.listDataFunc = (data) => data.products
            srv.listMetaFunc = (data) => ({
                total: data.total,
                skip: data.skip,
                limit: data.limit,
            })
            srv.params({ skip: "5", limit: "5" })

            // Проверяем URL
            $mol_assert_equal(
                "https://dummyjson.com/products?skip=5&limit=5",
                srv.urlList()
            )

            // Проверяем список
            $mol_assert_equal(resp.products, srv.list())
            $mol_assert_equal(5, srv.list().length)

            // Проверяем мета-информацию
            $mol_assert_equal(
                { total: resp.total, skip: resp.skip, limit: resp.limit },
                srv.metaInfo()
            )

            // Проверяем доступ по ID
            $mol_assert_equal(resp.products[0], srv.byId("16"))

            // Обновление
            srv.updateOne(item.id!, { price: 20 })
            $mol_assert_equal(20, srv.byId(`${item.id}`).price)

            // Создание
            $mol_assert_equal(newItem, srv.create(newItem))

            // Удаление
            srv.deleteOne(16)
            $mol_assert_equal(undefined, srv.byId('16'))
            $mol_assert_equal(4, srv.list().length)

            // Перезагрузка
            srv.listReload()
            $mol_assert_equal(5, srv.list().length)
        },

    })
}
```

## Пример: in-memory репозиторий (`$mws_data_repo_memory`)

Data-слой без сети — моки `fetch` не нужны, `obj.$ = $` тоже не обязателен (репозиторий не тянет зависимости через `this.$`).

Данные меняются **через API репозитория** (`create`, `update`, `remove`), а не прямой записью в `memory()` — репозиторий не рассчитан на внешнее реактивное изменение хранилища.

Тестовые данные удобно вынести в константы рядом с `$mol_test({})` (как в `crud.test.ts`).

```typescript
namespace $ {

    type testItem = { id: number | string, title: string, price: number }

    const sample: testItem[] = [
        { id: 1, title: 'Alpha', price: 10 },
        { id: 2, title: 'Beta', price: 20 },
    ]

    $mol_test({

        'list from memory'() {
            const repo = new $mws_data_repo_memory<testItem>()
            repo.memory([ ...sample ])

            $mol_assert_equal(2, repo.list().length)
            $mol_assert_equal(sample, repo.list())
        },

        'create'() {
            const repo = new $mws_data_repo_memory<testItem>()
            repo.memory([ ...sample ])

            const created = repo.create({ title: 'Gamma', price: 30 })

            $mol_assert_equal(3, repo.list().length)
            $mol_assert_equal('Gamma', created.title)
            $mol_assert_equal(created, repo.item(created.id))
        },

        'update'() {
            const repo = new $mws_data_repo_memory<testItem>()
            repo.memory([ ...sample ])

            repo.update(2, { price: 25 })

            $mol_assert_equal(25, repo.item('2').price)
        },

        'remove'() {
            const repo = new $mws_data_repo_memory<testItem>()
            repo.memory([ ...sample ])

            repo.remove(2)

            $mol_assert_equal(1, repo.list().length)
            $mol_assert_fail(() => repo.item('2'), 'Item not found')
        },

    })
}
```

Файл: `mws/data/repo/memory/repo.memory.test.ts`.

## Неймспейсы в тестах

- **`namespace $`** — для тестирования базовых утилит и классов из `namespace $`
- **`namespace $.$$`** — для тестирования компонентов из `namespace $.$$` (поведенческих классов с `override`)

Выбирайте namespace в зависимости от того, к каким классам обращается тест.



## Частые ошибки

| Ошибка | Решение |
|--------|---------|
| Используют `jest`, `mocha` и т.д. | В $mol только `$mol_test` |
| Вызывают `fetch`/`XMLHttpRequest` в тесте | Подменяйте через `$mol_ambient` мок |
| Рендерят DOM чтобы проверить логику | Вызывайте функции-свойства напрямую |
| Забывают `x.$ = $` | Компонент возьмёт глобальный `$`, а не тестовый context с моками |
| Повторно пишут `obj.$ = ...` | Контекст задаётся один раз; используйте `$mol_ambient` до назначения |
| Мокают через `repo.$`, а код зовёт `$mol_guid()` | Подмена через `this.$` не влияет на прямые глобальные вызовы |
| Таймаут async-теста (1 сек) | Мокайте сетевые зависимости, уменьшайте работу |
| Используют `async/await` для реактивных вычислений | Реактивные вычисления используют fiber/suspend, `async` нужен только для настоящих async-событий (клик, fetch) |
| `$mol_assert_like` | Устарел, используйте `$mol_assert_equal` |
| Тесты проходят без декораторов | Тесты не проверяют реактивность. Без `@$mol_mem`/`@$mol_action` UI не будет обновляться |
| Новый `*.test.ts` не виден в браузере | Перезагрузите `test.html` (dev-сервер пересоберёт `web.test.js`) |

## Правила для ИИ-ассистента

1. **Тест-файл**: `*.test.ts` рядом с модулем, в `namespace $` или `namespace $.$$`
2. **Функция регистрации**: `$mol_test({ ... })`
3. **Имена тестов**: строковые литералы `'описание теста'`
4. **Контекст**: `$mol_test_run` создаёт `Object.create($$)` на тест; параметр `($)` — передать в `component.$ = $`
5. **Мокирование**: `$mol_ambient({ сервис: мок })` → `obj.$ = context_mock`; или `$.$mol_ambient(...)` поверх тестового `$`
6. **UI = функции**: свойства компонента — функции, тестируйте их напрямую без рендеринга
7. **Assert**: `$mol_assert_equal` для всех проверок (глубокое сравнение)
8. **Сеть запрещена**: `fetch` и `XMLHttpRequest` заблокированы в тестах — мокайте
9. **Async**: возвращайте промис или используйте `async`/`await`; таймаут 1 сек
10. **Создание компонента с контекстом**: `Component.make({ $ })` или `new Component(); comp.$ = $`
11. **Подмена свойств**: `component.property = () => value` — простая замена для теста
12. **Клик**: `await $mol_wire_async(button).click(new $mol_dom_context.MouseEvent('click'))`
13. **НЕ используйте** Jest, Mocha, Vitest — только `$mol_test`
14. **После нового `*.test.ts`**: перезагрузить `test.html`, ручная пересборка не нужна
15. **Data-слой без сети**: `$mws_data_repo_memory` — инициализация через `memory([...])`, CRUD через `create`/`update`/`remove`, ошибки через `$mol_assert_fail`
