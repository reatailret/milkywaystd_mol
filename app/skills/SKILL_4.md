# Шаблоны View.Tree в $mol

## Что такое View.Tree

View.Tree — декларативный язык описания компонентов $mol. Файлы `*.view.tree` компилируются в TypeScript (`*.view.tree.ts`). Шаблон описывает **структуру** компонента (какие подкомпоненты, как связаны свойства), а поведение пишется в `*.view.ts`.

Каждое свойство в view.tree компилируется в **метод класса**. Подкомпонент — это свойство, возвращающее экземпляр класса. Связывание свойств — это вызовы методов родителя из переопределённых методов потомка.

## Как компилируется view.tree → TypeScript

### Базовый пример

```tree
$my_hello $mol_view
    sub /
        <= Input $mol_string
            hint \Name
            value? <=> name? \
        <= message \
```

Компилируется в:

```typescript
namespace $ {
    export class $my_hello extends $mol_view {

        sub() {
            return [this.Input(), this.message()] as readonly any[]
        }

        @ $mol_mem
        name(val?: any) {
            if (val !== undefined) return val as never
            return ""
        }

        @ $mol_mem
        Input() {
            const obj = new this.$.$mol_string()
            obj.hint = () => "Name"
            obj.value = (val?: any) => this.name(val)
            return obj
        }

        message() { return "" }
    }
}
```

**Ключевые трансформации:**
- `<= Input $mol_string` → метод `Input()` с `@$mol_mem`, возвращающий `new this.$.$mol_string()`
- `value? <=> name?` → `obj.value = (val?: any) => this.name(val)` (двунаправленная связь)
- `hint \Name` → `obj.hint = () => "Name"` (переопределение свойства подкомпонента)
- `<= message \` → метод `message()`, возвращающий `""`
- `name? \` → `@$mol_mem name(val?)` с сеттером

### Что реально генерируется (JS)

В скомпилированном JS декораторы применяются **не через `@`**, а вызовами функций после определения класса:

```javascript
($.$my_hello) = class $my_hello extends ($.$mol_view) {
    name(val) {
        if (val !== undefined) return val;
        return "";
    }
    Input() {
        const obj = new this.$.$mol_string();
        (obj.hint) = () => ("Name");
        (obj.value) = (val) => ((this.name(val)));
        return obj;
    }
    message() { return ""; }
};
($mol_mem(($.$my_hello.prototype), "name"));
($mol_mem(($.$my_hello.prototype), "Input"));
```

Параметризованные свойства (`*`) получают `$mol_mem_key`:

```javascript
($mol_mem_key(($.$my_form.prototype), "Field"));
```

### Что генерируется (d.ts)

Компилятор генерирует **проверки совместимости типов** через `$mol_type_enforce`. Если тип свойства подкомпонента не совпадает с типом привязанного свойства родителя — ошибка компиляции:

```typescript
type $mol_string__value_my_form_1 = $mol_type_enforce<
    ReturnType< $my_form['field_value'] >,  // тип родительского свойства
    ReturnType< $mol_string['value'] >       // тип свойства подкомпонента
>
```

### Поведение в .view.ts

Переопределяем сгенерированные методы в `namespace $.$$`:

```typescript
namespace $.$$ {
    export class $my_hello extends $.$my_hello {
        message() {
            const name = this.name()
            return name && `Hello, ${name}!`
        }
    }
}
```

- `$.$my_hello` (namespace `$`) — сгенерированный из view.tree базовый класс
- `$.$$.my_hello` (namespace `$.$$`) — наследник с поведением, фреймворк автоматически использует `$$` версию
- Используйте `override` для переопределяемых методов: `override message() { ... }`

## Синтаксис

### Спецсимволы

| Символ | Значение | Пример |
|--------|----------|--------|
| `-` | Комментарий (игнорируется) | `- это комментарий` |
| `$` | Имя компонента (глобальное) | `$my_app $mol_view` |
| `/` | Массив (опционально с типом) | `sub /`, `items /number` |
| `*` | Словарь (объект ключ-значение) | `attr *`, `config *` |
| `^` | Наследование от родителя (spread) | `attr * ^` (сохранить родительские атрибуты) |
| `\` | Строковый литерал | `title \Hello world` |
| `@` | Локализованная строка | `title @ \Hello` |
| `<=` | Односторонняя связь (чтение) | `<= name \default` |
| `<=>` | Двунаправленная связь (чтение/запись) | `value? <=> name? \` |
| `=>` | Правосторонняя связь (алиас) | `Title => Page_title` |
| `*` после имени | Параметризованное свойство (ключ) | `Task_row*`, `item_title*` |
| `?` после имени | Мутабельное свойство (сеттер) | `value?`, `name?` |

### Отступы

**Только табуляция.** Уровень вложенности определяет иерархию. Файлы **обязательно LF** (не CRLF).

### Типы данных

```tree
$my_example $mol_view
    - строки
    title \Hello world
    multiline \
        \первая строка
        \вторая строка

    - числа
    count 42
    pi 3.14
    big +Infinity
    small -Infinity
    invalid NaN

    - булевы и null
    enabled true
    disabled false
    nothing null

    - массив
    items /
        \first
        \second
        42

    - массив с типом
    numbers /number
        1
        2
        3

    - словарь (объект)
    config *
        key \value
        nested *
            sub_key \sub_value

    - локализация
    label @ \Default english text
```

## Связывание свойств (bindings)

### `<=` — Односторонняя связь (чтение)

Подкомпонент **читает** свойство родителя.

```tree
$my_app $mol_view
    sub /
        <= Info $mol_label
            title <= info_title \Default
```

Компилируется в:

```typescript
info_title() { return "Default" }

@ $mol_mem
Info() {
    const obj = new this.$.$mol_label()
    obj.title = () => this.info_title()
    return obj
}
```

`<=` можно использовать **инлайн** (объявление + использование одновременно):

```tree
field *
    title <= hint \Default hint
```

Эквивалентно:

```tree
hint \Default hint
field *
    title <= hint
```

### `<=` — Привязка свойства к одному компоненту (без массива)

Свойство подкомпонента можно привязать к компоненту **напрямую**, без оборачивания в массив `/`:

```tree
<= Error_container $mws_error_retry_container
    error? <= fetch_error? null
    body <= Form $mol_form
```

Здесь `body` привязывается к `Form` напрямую (не `body / <= Form`). Компилируется в:

```typescript
Error_container() {
    const obj = new this.$.$mws_error_retry_container()
    obj.error = (next) => (this.fetch_error())
    obj.body = () => (this.Form())
    return obj
}
```

Когда свойство принимает один элемент — используйте `<=` без `/`. Когда массив — `sub /`.

### `<=>` — Двунаправленная связь (чтение + запись)

Свойство подкомпонента **связано** со свойством родителя в обе стороны. Используется с `?`.

```tree
$my_form $mol_view
    sub /
        <= Input $mol_string
            value? <=> name? \
```

Компилируется в:

```typescript
@ $mol_mem
name(val?: any) {
    if (val !== undefined) return val as never
    return ""
}

@ $mol_mem
Input() {
    const obj = new this.$.$mol_string()
    obj.value = (val?: any) => this.name(val)
    return obj
}
```

Изменение `Input.value` → меняет `name` → все зависимые свойства перевычисляются.

### `=>` — Правосторонняя связь (алиас)

Создаёт алиас на свойство подкомпонента в родителе.

```tree
$my_app $mol_scroll
    sub /
        <= Page $mol_page
            Title => Page_title
            head /
                <= Back $mol_button_minor
                    title \Back
                <= Page_title -
```

Компилируется в:

```typescript
Page_title() {
    return this.Page().Title()
}
```

Теперь `this.Page_title()` — это алиас на `this.Page().Title()`.

### `=>` с `*` — параметризованная правосторонняя связь

```tree
$my_form $mol_view
    Validator $mws_form_validator
        bids* => validator_bids*
        model_value* <= field_validator_value*
```

Компилируется в:

```typescript
validator_bids(id) {
    return this.Validator().bids(id)
}

Validator() {
    const obj = new this.$.$mws_form_validator()
    obj.model_value = (id) => (this.field_validator_value(id))
    return obj
}
```

`bids* => validator_bids*` — параметризованный алиас. Вызов `this.validator_bids(someId)` пробрасывается как `this.Validator().bids(someId)`.

## Компоненты

### Объявление

```tree
$my_button $mol_view
```

→ `class $my_button extends $mol_view {}`

Имя **обязательно** начинается с `$` и глобально уникально.

### Создание подкомпонента

```tree
$my_app $mol_view
    sub /
        <= Button $mol_button_major
            title \Click me
```

Имя подкомпонента с заглавной буквы → `@$mol_mem` фабрика:

```typescript
@ $mol_mem
Button() {
    const obj = new this.$.$mol_button_major()
    obj.title = () => "Click me"
    return obj
}
```

**Важно:** Создание через `new this.$.$mol_button_major()` (а не `new $mol_button_major()`). `this.$` — контекст DI, позволяющий подменять зависимости.

### Создание объекта как свойства

Свойство с типом класса (через табуляцию) создаёт инстанс и возвращает его как `@$mol_mem` метод:

```tree
$my_app $mol_view
	my_obj $mol_object
```

Компилируется в:

```typescript
@ $mol_mem
my_obj() {
    const obj = new this.$.$mol_object()
    return obj
}
```

Вызов `this.my_obj()` возвращает мемоизированный инстанс `$mol_object`. При этом можно переопределять свойства создаваемого объекта:

```tree
$my_app $mol_view
	my_obj $mol_object
		some_prop \hello
		count 42
```

Компилируется в:

```typescript
@ $mol_mem
my_obj() {
    const obj = new this.$.$mol_object()
    obj.some_prop = () => "hello"
    obj.count = () => 42
    return obj
}
```

Это работает для любого класса — `$mol_object`, `$mol_view`, кастомных классов. Имя со строчной буквы — обычное свойство, с заглавной — подкомпонент (семантически то же самое, но по конвенции заглавная = визуальный компонент).

### Параметризованные компоненты (`*`)

Суффикс `*` создаёт `@$mol_mem_key` — фабрику с ключом:

```tree
$my_list $mol_list
    rows <= task_rows /
    Task_row* $mol_view
        sub /
            <= task_title* \
```

Компилируется в:

```typescript
@ $mol_mem_key
Task_row(id: any) {
    const obj = new this.$.$mol_view()
    obj.sub = () => [this.task_title(id)] as readonly any[]
    return obj
}

task_rows() { return [] as readonly any[] }
task_title(id: any) { return "" }
```

### Фабричные компоненты на корневом уровне

Компоненты, определённые на том же уровне что и `sub /` (а не внутри него), — это **фабрики шаблонов**. Они не попадают напрямую в UI-дерево, а используются в TypeScript:

```tree
$my_form $mol_page
    body /
        <= Items $mol_list
            rows <= item_rows /
    Field* $mol_form_field
        name <= field_name* \
        control <= field_control* null
    String_field* $mol_string
        value? <=> field_value*? \
        hint <= field_hint* \
    Check_field* $mol_check
        checked? <=> field_checked*? false
```

`Field*`, `String_field*`, `Check_field*` — не в `body /`, они не рендерятся автоматически. Это фабрики, которые вызываются из TypeScript:

```typescript
@$mol_mem
override item_rows() {
    return this.configs().map((_, idx) => this.Field(idx))
}

override field_control(idx: number) {
    const config = this.configs()[idx]
    switch (config.type) {
        case 'string': return this.String_field(idx)
        case 'check': return this.Check_field(idx)
    }
}
```

Этот паттерн позволяет описать в view.tree все варианты UI-компонентов, а в TypeScript — логику выбора нужного варианта.

### Использование параметризованных компонентов в TypeScript

```typescript
@$mol_mem
task_rows() {
    return this.data().map((_, i) => this.Task_row(i))
}

task_title(id: any) {
    return this.data()[id]?.title ?? ''
}
```

## Словари и атрибуты

### `attr *` — HTML атрибуты

```tree
$my_input $mol_view
    dom_name \input
    attr *
        ^
        type \number
        min \0
        max \100
```

`^` — spread родительских атрибутов (`...super.attr()`):

```typescript
attr() {
    return {
        ...super.attr(),
        "type": "number",
        "min": "0",
        "max": "100",
    }
}
```

### `style *` — инлайн-стили

```tree
$my_box $mol_view
    style *
        ^
        transform \rotate(45deg)
```

### `event *` — обработчики событий

```tree
$my_clicker $mol_view
    event *
        ^
        click? <=> on_click? null
```

### `field *` — DOM-свойства

```tree
$my_scroll $mol_view
    field *
        ^
        scrollTop 0
```

## Свойства без дефолтного значения

```tree
$my_comp $mol_view
    my_func           - ❌ НЕ создаётся в JS!
    my_func \default  - ✅ создаётся с дефолтом
    my_func /         - ✅ создаётся (пустой массив)
    my_func null      - ✅ создаётся (null)
```

Свойство **без значения** не генерирует метод — будет использована родительская реализация или `undefined`. Всегда указывайте дефолт.

## Наследование и `^`

`^` вставляет результат одноимённого свойства из родительского класса.

### В массивах — вставка элементов родителя

```tree
$my_page $mol_page
    body /
        ^
        <= Extra $mol_view
```

→ `body() { return [...super.body(), this.Extra()] }`

### В словарях — merge с родителем

```tree
$my_styled $mol_view
    attr *
        ^
        role \button
```

→ `attr() { return { ...super.attr(), role: "button" } }`

### В массивах с именованной вставкой

```tree
foot /
    \item1
    ^ insert /
        \inserted1
        \inserted2
    \item2
```

→ `foot() { return ["item1", ...this.insert(), "item2"] }`

## Локализация (`@`)

```tree
$my_app $mol_view
    title @ \My Application
```

Компилируется в:

```typescript
title() {
    return this.$.$mol_locale.text('$my_app_title')
}
```

Ключ формируется автоматически: `$<класс>_<свойство>`. Текст после `\` — дефолтное значение, извлекается в `*.locale=en.json`.

## Паттерны

### Страница с формой

```tree
$my_form $mol_page
    title \Registration
    body /
        <= Name_field $mol_labeler
            title \Name
            content /
                <= Name $mol_string
                    value? <=> name? \
                    hint \Enter name
        <= Submit $mol_button_major
            title \Save
            click? <=> submit? null
```

### Список с динамическими элементами

```tree
$my_list $mol_page
    title \Items
    body /
        <= Items $mol_list
            rows <= item_rows /
    Item* $mol_row
        sub /
            <= Item_title* $mol_dimmer
                needle <= search_query \
                haystack <= item_title* \
```

TypeScript:

```typescript
@$mol_mem
item_rows() {
    return this.items().map((_, i) => this.Item(i))
}

item_title(id: number) {
    return this.items()[id]?.title ?? ''
}
```

### Двунаправленное связывание между компонентами

```tree
$my_sync $mol_view
    sub /
        <= Input $mol_string
            value? <=> shared? \
        <= Output $mol_view
            sub /
                <= shared? \
```

`Input` и `Output` связаны через `shared` — ввод в Input обновляет Output.

### Плагины

```tree
$my_app $mol_view
    plugins /
        <= Theme $mol_theme_auto
        <= Nav $mol_nav
            keys_y <= options /
```

## Полный реальный пример: форма с валидацией

**form.view.tree** — структура:

```tree
$mws_data_form $mol_page
	fields_config /
	entity null
	on_saved? null
	title <= form_title \Edit
	tools /
		<= Close_btn $mol_button_minor
			hint \Close
			click? <=> close? null
	body /
		<= Error_container $mws_error_retry_container
			error? <= fetch_error? null
			body <= Form $mol_form
				submit_allowed <= submit_allowed true
				submit? <=> submit? null
				form_fields <= form_fields /
				buttons /
					<= Save_btn $mol_button_major
						title \Save
						click? <=> submit? null
						enabled <= submit_allowed
					<= Cancel_btn $mol_button_minor
						title \Cancel
						click? <=> cancel? null
	Validator $mws_form_validator
		bids* => validator_bids*
		model_value* <= field_validator_value*
		validation <= validation *
	Field* $mol_form_field
		name <= field_name* \
		bids <= field_bids* /
		control <= field_control* null
	String_field* $mol_string
		value? <=> field_value*? \
	Number_field* $mol_number
		value? <=> field_number_value*? 0
	Check_field* $mol_check
		checked? <=> field_checked*? false
```

**form.view.ts** — поведение:

```typescript
namespace $.$$ {
    export class $mws_data_form extends $.$mws_data_form {

        // Мемоизированный геттер с try/catch + $mol_promise_like
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

        // Генерация списка полей из конфигурации
        @$mol_mem
        override form_fields() {
            return this.fields_config().map((_, idx) => this.Field(idx))
        }

        // Выбор контрола по типу поля
        override field_control(idx: number) {
            const config = this.fields_config()[idx]
            switch (config.type) {
                case 'string': return this.String_field(idx)
                case 'number': return this.Number_field(idx)
                case 'check':  return this.Check_field(idx)
            }
        }

        // Двунаправленная привязка к entity
        @$mol_mem_key
        override field_value(idx: number, next?: string) {
            const entity = this.entity_model()
            const config = this.fields_config()[idx]
            if (next !== undefined) {
                entity.field(config.field, next)
                return next
            }
            return String(entity.field(config.field) ?? '')
        }

        // Сабмит с обработкой промиса
        override submit() {
            try {
                this.entity_model()?.save()
            } catch (error) {
                if ($mol_promise_like(error)) $mol_fail_hidden(error)
                this.status_message('Error: ' + String(error))
            }
        }
    }
}
```

**Что здесь важно:**
- `Validator`, `Field*`, `String_field*` — фабрики на корневом уровне, не в `body /`
- `bids* => validator_bids*` — параметризованный правосторонний алиас
- `body <= Form $mol_form` — свойство напрямую (не массив)
- `validation <= validation *` — привязка к пустому словарю `*`
- В `.view.ts`: `override` для переопределения, `$mol_promise_like` в catch, `@$mol_mem_key` для параметризованных

## Правила для ИИ-ассистента

При генерации view.tree:

1. **Отступы — только табуляция**, LF окончания строк
2. **Имена компонентов** с `$` и глобально уникальны: `$my_app_header`
3. **Подкомпоненты** — с заглавной буквы: `<= Button $mol_button`
4. **Свойства** — со строчной: `title \text`, `value? <=> name?`
5. **Всегда указывай дефолтное значение**: `title \`, `items /`, `enabled true`
6. **Для мутабельных свойств** добавляй `?`: `value?`, `name?`
7. **Параметризованные** — добавляй `*`: `Task_row*`, `item_title*`
8. **`^` в словарях и массивах** — для наследования от родителя: `attr * ^`
9. **`sub /`** — основной способ задать дочерние элементы
10. **Структура в .view.tree**, логика в **.view.ts** — шаблоны должны быть чистыми
11. **Списки генерируй в TypeScript** — `@$mol_mem` метод, возвращающий массив компонентов
12. **`$mol_list` содержит только `$mol_view`** — нельзя класть строки/числа напрямую
13. **Двунаправленная связь** требует `?` на обоих концах: `value? <=> name? \default`
14. **Фабрики-шаблоны** размещай на корневом уровне (не в `sub /`), используй в TS
15. **`override`** для переопределения методов из view.tree в .view.ts
16. **В catch всегда проверяй** `$mol_promise_like(error)` и пробрасывай через `$mol_fail_hidden`
