# Реактивная система $mol (Pull-based reactivity)

## Ключевая идея

$mol использует **pull-based** (ленивую) реактивность. Вычисления происходят **только когда результат запрашивается потребителем**. Нет подписок, нет событий, нет ручного управления обновлениями. Граф зависимостей строится автоматически при вызовах.

**Главное правило:** В view.tree компонентах только **рендеринг** вызывает вычисления. Пока свойство не запрошено при рендере — оно не вычисляется. Когда зависимость внутри свойства меняется — свойство помечается как грязное и **перевычисляется при следующем запросе**.

## Архитектура

```
┌─────────────────────────────────────────────────┐
│                   Рендеринг                     │
│          (единственный потребитель)              │
│                                                 │
│   render() ──► sub() ──► filtered_items()       │
│                              │                  │
│                    ┌─────────┴──────────┐       │
│                    ▼                    ▼       │
│              items()             filter()       │
│                │                                │
│                ▼                                │
│         fetch('/api')                           │
│         (suspend → resume)                      │
└─────────────────────────────────────────────────┘

  Pull: рендер тянет данные ──► данные не тянут рендер
```

Реактивность построена на библиотеке `$mol_wire`. Каждое реактивное свойство — это **канал** (wire), который:
1. **Кэширует** результат вычисления
2. **Отслеживает** зависимости автоматически при выполнении
3. **Инвалидируется** при изменении любой зависимости
4. **Перевычисляется лениво** — только при следующем запросе

## Декораторы

### @$mol_mem — мемоизированный канал (без ключа)

Создаёт кэшируемое реактивное свойство. Является одновременно геттером и сеттером.

```typescript
// Вычисляемое свойство (только чтение)
@$mol_mem
full_name(): string {
    // Автоматически отслеживает зависимости:
    // при изменении first_name() или last_name() — full_name инвалидируется
    return this.first_name() + ' ' + this.last_name()
}

// Свойство-состояние (чтение и запись)
@$mol_mem
query(next?: string): string {
    // next !== undefined → запись (сеттер)
    // next === undefined → чтение (геттер)
    return next ?? ''
}
```

**Как использовать:**
```typescript
// Чтение — вызов без аргументов
const name = this.full_name()

// Запись — вызов с аргументом
this.query('new value')
```

### @$mol_mem_key — мемоизированный канал с ключом

То же что `@$mol_mem`, но создаёт отдельный кэш для каждого значения ключа. Используется для коллекций и параметризованных свойств.

```typescript
@$mol_mem_key
item_title(id: string, next?: string): string {
    if (next !== undefined) {
        // Запись: сохраняем значение для конкретного id
        this.save_item(id, next)
    }
    return next ?? this.load_item(id).title
}

// Фабрика компонентов — создаёт компонент для каждого ключа
@$mol_mem_key
Task_row(id: string) {
    const row = new this.$.$my_task_row()
    row.title = () => this.item_title(id)
    return row
}
```

**Как использовать:**
```typescript
const title = this.item_title('abc')      // чтение
this.item_title('abc', 'New title')       // запись
const row = this.Task_row('abc')          // получить/создать компонент
```

### @$mol_action — действие без реактивных зависимостей

Выполняет побочные эффекты (HTTP-запросы, навигация, мутации) **без создания зависимостей** в реактивном графе. Код внутри `@$mol_action` **не отслеживается** — чтение реактивных свойств внутри не создаёт подписку.

```typescript
@$mol_action
save() {
    const data = {
        name: this.full_name(),   // чтение НЕ создаёт зависимость
        email: this.email()
    }
    // Синхронный вызов — НЕ async/await!
    this.$.$mol_fetch.json('/api/save', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}
```

**Когда использовать `@$mol_action` вместо `@$mol_mem`:**
- HTTP POST/PUT/DELETE запросы
- Навигация, роутинг
- Любой побочный эффект, результат которого не нужно кэшировать
- Обработчики событий (клик, сабмит)

### Неймспейсы и override

Код с реактивностью пишется в двух неймспейсах:

```typescript
// namespace $ — базовые классы (генерируются из view.tree)
namespace $ {
    export class $my_app extends $mol_view {
        name() { return "" }
    }
}

// namespace $.$$ — поведение (пишется вручную в .view.ts)
namespace $.$$ {
    export class $my_app extends $.$my_app {

        // override для методов, определённых в view.tree
        @$mol_mem
        override name(next?: string) {
            return next ?? this.load_name()
        }
    }
}
```

- `$.$my_app` — сгенерированный из view.tree базовый класс
- `$$.$my_app` — наследник с поведением (используется фреймворком)
- `override` — обязательно при переопределении методов из базового класса

### КРИТИЧЕСКИ ВАЖНО: override теряет декораторы базового класса

В сгенерированном JS декораторы применяются **после определения класса** вызовами функций на прототипе базового класса:

```javascript
// Сгенерированный код (base class prototype)
$mol_mem($.$my_app.prototype, "increment")
$mol_mem($.$my_app.prototype, "Count")
```

Когда вы делаете `override` в `namespace $.$$`, вы создаёте **новый метод на новом прототипе** (`$.$$.$my_app.prototype`). Этот метод **затеняет** декорированный метод базового класса. Декоратор базового класса **не наследуется**.

```typescript
namespace $.$$ {
    export class $my_app extends $.$my_app {

        // ❌ ОШИБКА: override без декоратора — метод НЕ реактивный
        override count_text(): string {
            return String(this.count())
        }

        // ✅ ПРАВИЛЬНО: декоратор нужен заново
        @$mol_mem
        override count_text(): string {
            return String(this.count())
        }

        // ✅ Для действий-обработчиков — @$mol_action
        @$mol_action
        override increment(): void {
            this.count(this.count() + 1)
        }
    }
}
```

**Правило: при `override` всегда ставьте декоратор:**
- `@$mol_mem` — для вычисляемых свойств и свойств-состояний
- `@$mol_action` — для обработчиков событий и побочных эффектов

Без декоратора метод будет работать как обычная функция (без кэширования, без участия в реактивном графе, без атомарности). Тесты могут проходить (потому что вызывают функции синхронно), но в реактивном рантайме компонент не будет перерисовываться при изменении зависимостей.

## Pull-семантика vs Push-семантика

$mol использует **исключительно pull-семантику**. Это значит:

### Правило 1: Геттеры вместо прямых присвоений

```typescript
// ❌ НЕПРАВИЛЬНО — push, императивно
this.items().splice(index, 1)
this.items_count = this.items().length

// ✅ ПРАВИЛЬНО — pull, декларативно
const filtered = this.items().filter(item => item.id !== id)
this.items(filtered)
// items_count() пересчитается автоматически при следующем запросе
```

### Правило 2: Иммутабельность данных

```typescript
// ❌ НЕПРАВИЛЬНО — мутация массива, реактивность не сработает
this.items().push(newItem)

// ✅ ПРАВИЛЬНО — новый массив через сеттер
this.items([...this.items(), newItem])
```

### Правило 3: Вычисляемые свойства обновляются автоматически

```typescript
@$mol_mem
items(next?: Item[]) {
    return next ?? []
}

// Зависит от items() — пересчитается автоматически при изменении items
@$mol_mem
items_count() {
    return this.items().length
}

// Зависит от items() — пересчитается автоматически
@$mol_mem
filtered_items() {
    return this.items().filter(item => item.active)
}
```

### Полный пример pull-семантики

```typescript
namespace $.$$ {
    export class $my_app extends $.$my_app {

        @$mol_mem
        items(next?: Item[]) {
            return next ?? []
        }

        // Pull: пересчитывается при изменении items()
        @$mol_mem
        filtered_items() {
            return this.items().filter(item => item.active)
        }

        // Действие: создаёт новый массив и устанавливает через сеттер
        @$mol_action
        delete_item(id: string) {
            const filtered = this.items().filter(item => item.id !== id)
            this.items(filtered)
            // filtered_items() пересчитается автоматически при рендере
        }

        // Действие: добавление
        @$mol_action
        add_item(item: Item) {
            this.items([...this.items(), item])
        }
    }
}
```

## Жизненный цикл реактивных каналов

Каналы `@$mol_mem` / `@$mol_mem_key` **автоматически уничтожаются**, если у них нет потребителей:

- Если свойство не используется в рендере или другими активными каналами — его кэш удаляется
- При повторном обращении — свойство пересчитывается заново
- Волокна без подписчиков автоматически уничтожаются

```typescript
// ✅ Правильно: api_url вызывается в list(), который используется в рендере
@$mol_mem
api_url(next?: string): string {
    return next ?? 'https://api.example.com'
}

@$mol_mem
list() {
    const url = this.api_url()  // Зависимость — api_url не будет уничтожен
    return this.$.$mol_fetch.json(`${url}/items`)
}

// ❌ Плохо: api_url нигде не вызывается — может быть уничтожен
@$mol_mem
api_url(): string {
    return 'https://api.example.com'
}
```

**Правило:** убедитесь, что каждое реактивное свойство вызывается (прямо или транзитивно) из метода, участвующего в рендере.

## Ленивость (Laziness)

### Ленивый рендеринг

`$mol_view` реализует lazy rendering:
- `$mol_scroll` отслеживает позицию скролла
- `$mol_list` знает высоту viewport и исключает из рендеринга элементы вне видимости
- Компоненты сообщают `minimal_height` для оценки размеров до рендера

```tree
$my_icon $mol_view
    minimal_height 16
```

**Следствие:** данные, которые не рендерятся, **не запрашиваются**. Если элемент вне viewport — его свойства не вычисляются, его HTTP-запросы не выполняются.

### Ленивые вычисления

Все `@$mol_mem` свойства ленивы:
1. Значение **не вычисляется** при создании компонента
2. Значение вычисляется **при первом обращении**
3. Результат **кэшируется**
4. При изменении зависимости — кэш **инвалидируется** (помечается грязным)
5. Перевычисление — **только при следующем запросе**

## Асинхронность: Fiber и Suspend

$mol **не использует** `async/await`. Вместо этого — механизм **fiber** (волокно) и **suspend** (приостановка).

### Как это работает

```typescript
@$mol_mem
load_data() {
    // Пишем как синхронный код!
    const response = this.$.$mol_fetch.json('/api/data')
    return response
}
```

1. **Первый вызов:** `$mol_fetch.json()` возвращает Promise → `$mol_wire` бросает исключение-промис → функция приостанавливается (suspend) → UI показывает спиннер
2. **После resolve:** функция запускается заново → `$mol_fetch.json()` возвращает данные синхронно (из кэша промиса) → результат мемоизируется
3. **Повторные вызовы:** значение из кэша `@$mol_mem`

### Запрещено: async/await

```typescript
// ❌ НЕ ДЕЛАЙТЕ ТАК — ломает реактивный граф
@$mol_mem
async load_data() {
    const data = await this.$.$mol_fetch.json('/api')
    return data
}

// ✅ ПРАВИЛЬНО — синхронный стиль
@$mol_mem
load_data() {
    const data = this.$.$mol_fetch.json('/api')
    return data
}
```

**Почему:** `async/await` разрывает стек вызовов. `$mol_wire` не может отследить зависимости через `await`. Мемоизация не работает с `async` функциями.

### Цепочка асинхронных вызовов

```typescript
@$mol_mem
user_data() {
    return this.$.$mol_fetch.json('/api/user')  // suspend если загружается
}

@$mol_mem
user_posts() {
    const userId = this.user_data().id           // suspend если user ещё грузится
    return this.$.$mol_fetch.json(`/api/posts?user=${userId}`)
}

@$mol_mem
full_data() {
    const user = this.user_data()     // кэш или suspend
    const posts = this.user_posts()   // кэш или suspend
    return { user, posts }
}
```

Порядок: `full_data()` → suspend на `user_data()` → загрузка user → suspend на `user_posts()` → загрузка posts → всё готово. При повторных вызовах — всё из кэша.

### $mol_wire_sync — обёртка async → sync

Для интеграции с внешними асинхронными API:

```typescript
function getData(uri: string) {
    const request = $mol_wire_sync(fetch)         // оборачиваем async fetch
    const response = $mol_wire_sync(request(uri)) // оборачиваем response
    return response.json().data
}

@$mol_mem
data() {
    return getData('/api/data')  // выглядит синхронно, suspend под капотом
}
```

### $mol_wire_async — обёртка sync → async

Для регистрации в библиотеках, ожидающих async-функции:

```typescript
// Синхронная функция в мире $mol
function myHandler() {
    const data = $.$my_fetch_json('/api/data')
    console.log(data)
}

// Регистрация как async для внешней библиотеки
registerHandler($mol_wire_async(myHandler))
```

Также используется для обработчиков DOM-событий с автоматической отменой:

```typescript
// Каждый новый клик отменяет предыдущую задачу
button.onclick = $mol_wire_async(function() {
    counter.sendIncrement()
})
```

### Debounce

```typescript
button.onclick = $mol_wire_async(function() {
    $mol_wait_timeout(300)          // задержка 300мс
    // Сюда дойдём только если не было новых кликов
    this.do_search()
})
```

### Отмена через деструкторы

```typescript
const fetchJSON = $mol_wire_sync(function(
    input: RequestInfo,
    init: RequestInit = {}
) {
    const controller = new AbortController()
    init.signal ||= controller.signal

    const promise = fetch(input, init).then(r => r.json())
    const destructor = () => controller.abort()

    return Object.assign(promise, { destructor })
})
```

При отмене волокна (перезапуск, размонтирование) — вызывается `destructor`, abort отменяет HTTP-запрос.

### Каскадная отмена

Все волокна образуют граф. При размонтировании компонента каскадно отменяются все дочерние волокна и их HTTP-запросы.

```
Компонент (корневое волокно)
    ├── @$mol_mem свойство 1
    │   ├── HTTP запрос 1 → abort()
    │   └── HTTP запрос 2 → abort()
    └── @$mol_action
        └── HTTP запрос 3 → abort()
```

## Обработка ошибок

По умолчанию $mol **автоматически** показывает ошибки в UI. `try/catch` нужен **только** для fallback-логики.

### КРИТИЧЕСКИ ВАЖНО: Промис в catch — это suspend, не ошибка!

При suspend `$mol_wire` бросает **промис как исключение**. Если вы пишете `try/catch`, **необходимо проверять** — не промис ли это. Перехват промиса убьёт механизм suspend.

Проверка выполняется через `$mol_promise_like(error)`:

```typescript
// Реализация в mol/promise/like/like.ts
function $mol_promise_like(val: any): val is Promise<any> {
    try {
        return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function'
    } catch {
        return false
    }
}
```

### Правильный try/catch

Два варианта проброса промиса — оба корректны:

```typescript
// Вариант 1: throw error
@$mol_mem
load_with_fallback() {
    try {
        return this.$.$mol_fetch.json('/api/data')
    } catch (error) {
        if ($mol_promise_like(error)) throw error
        return { items: [] }
    }
}

// Вариант 2: $mol_fail_hidden(error) — предпочтительный в $mol
@$mol_mem
fetch_error() {
    try {
        this.entity()?.data()
        return null
    } catch (error) {
        if ($mol_promise_like(error)) $mol_fail_hidden(error)
        return { value: error }
    }
}
```

`$mol_fail_hidden(error)` — бросает исключение, скрытое от отладчика (не ломает «break on exceptions»). Используйте его вместо `throw` для проброса промисов.

### Retry с $mol_wire_async

Паттерн повторной попытки после ошибки:

```typescript
@$mol_mem
reset(next?: number): number {
    return next ?? Date.now()
}

@$mol_mem
fetch_error() {
    try {
        this.reset()
        this.entity()?.data()
        return null
    } catch (error) {
        if ($mol_promise_like(error)) $mol_fail_hidden(error)
        const e = new $mol_error_mix(
            (error as Error).message,
            { retry: $mol_wire_async(() => { this.reset(Date.now()) }) },
            error as Error
        )
        return { value: e }
    }
}
```

`this.reset()` создаёт зависимость. При вызове `retry()` меняется `reset` → `fetch_error` инвалидируется → данные перезагружаются.

### Без try/catch (предпочтительно)

```typescript
@$mol_mem
load_data() {
    // Ошибка покажется автоматически в UI, suspend работает из коробки
    return this.$.$mol_fetch.json('/api/data')
}
```

## Краткая шпаргалка

| Что нужно | Декоратор | Пример |
|-----------|-----------|--------|
| Кэшируемое свойство | `@$mol_mem` | `full_name() { return ... }` |
| Свойство-состояние | `@$mol_mem` | `query(next?) { return next ?? '' }` |
| Свойство с ключом | `@$mol_mem_key` | `item(id, next?) { ... }` |
| Фабрика компонентов | `@$mol_mem_key` | `Row(id) { return new ... }` |
| Побочный эффект | `@$mol_action` | `save() { fetch(...) }` |
| Async → Sync обёртка | `$mol_wire_sync()` | `$mol_wire_sync(fetch)` |
| Sync → Async обёртка | `$mol_wire_async()` | `$mol_wire_async(handler)` |
| Задержка/debounce | `$mol_wait_timeout()` | `$mol_wait_timeout(300)` |

## Частые ошибки

1. **Мутация массива** — `this.items().push(x)` не сработает. Нужно `this.items([...this.items(), x])`
2. **async/await в @$mol_mem** — ломает реактивный граф. Пишите синхронно
3. **Push-семантика** — `this.count = items.length` не работает. Нужно `@$mol_mem count() { return this.items().length }`
4. **Promise в реактивной системе** — Promise несовместимы с suspend. Используйте `$mol_wire_sync`
5. **Свойство без потребителей** — если `@$mol_mem` свойство не используется в рендере, его кэш уничтожается
6. **Побочные эффекты в @$mol_mem** — загрязняют граф зависимостей. Используйте `@$mol_action`
7. **Перехват промиса в catch** — при `try/catch` **обязательно** проверяйте `$mol_promise_like(error)` и пробрасывайте промис. Иначе сломается suspend
8. **override без декоратора** — `override` в `namespace $.$$` теряет `$mol_mem`/`$mol_action` базового класса. Всегда ставьте декоратор заново

## Правила для ИИ-ассистента

При генерации кода для $mol:

1. **Все вычисляемые свойства** оборачивай в `@$mol_mem`
2. **Все побочные эффекты** — в `@$mol_action`
3. **Никогда не используй** `async/await` внутри `@$mol_mem` и `@$mol_action`
4. **Данные меняй иммутабельно** — новые массивы/объекты через сеттер
5. **Свойство-состояние** — паттерн `prop(next?) { return next ?? default }`
6. **Фабрика компонентов** — `@$mol_mem_key Component(id) { ... }`
7. **При `override` — всегда ставь декоратор заново** (`@$mol_mem` или `@$mol_action`), иначе метод теряет реактивность
8. **Обработчики событий (click, submit)** — `@$mol_action`, не `@$mol_mem`
9. **HTTP-запросы** — через `this.$.$mol_fetch.json()` синхронно
10. **Внешние async API** — оборачивай через `$mol_wire_sync`
11. **Не создавай подписки** — реактивность pull-based, подписки не нужны
12. **Не используй Promise напрямую** — только через `$mol_wire_sync`
13. **В каждом try/catch** проверяй `if ($mol_promise_like(error)) throw error` — иначе suspend сломается
