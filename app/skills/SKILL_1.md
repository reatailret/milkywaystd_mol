# $mol и MAM: общие концепции

## Обзор

$mol — реактивный компонентный фреймворк. MAM — монорепозиторий-сборщик. Один `package.json` в корне, модули адресуются по путям: `my/app` → `$my_app`.

## Структура проекта

```
mam/                        # Корень MAM
├── .meta.tree              # Глобальные pack-зависимости
├── package.json            # Один на весь проект
├── mol/                    # Фреймворк $mol
├── my/
│   └── app/
│       ├── index.html
│       ├── app.view.tree   # Структура компонента
│       ├── app.view.ts     # Поведение компонента
│       ├── app.view.css    # Стили (CSS)
│       ├── app.view.css.ts # Стили (TypeScript)
│       ├── app.meta.tree   # Конфигурация сборки
│       ├── app.locale=en.json
│       └── -/              # Результат сборки
│           ├── -view.tree/ # Скомпилированные view.tree
│           ├── -css/       # Скомпилированные стили
│           ├── web.js      # JS бандл
│           ├── web.css     # CSS бандл
│           └── index.html
```

**FQN:** путь модуля = имя класса. `my/app` → `$my_app`, `mws/data/form` → `$mws_data_form`.

## Ambient-контекст (`$`)

Подробнее: `mol/ambient/readme.md`.

### Глобальный неймспейс

`$` — единый глобальный контекст, в который MAM складывает все модули, стандартные API и утилиты фреймворка. Зависимости берутся из `$`, а не через `import`:

```typescript
// все глобальные сущности доступны из контекста
Promise === $.Promise === $.$$.Promise
```

В коде пишут `$my_app`, `$mol_fetch` и т.д. — это поля одного объекта-контекста.

### `this.$` у объектов

У `$mol_object2` (и всех наследников — `$mol_object`, `$mol_view`, …) есть свойство `$` — ambient-контекст **этого** экземпляра.

Код обращается к зависимостям через `this.$`:

```typescript
this.$.$mol_locale.text('$my_app_title')
this.$.$mol_state_arg.value('page')
this.$.$mws_fetch.json(url)
```

**Порядок разрешения `this.$`** (см. `mol/object2/object2.ts`):

1. Явно заданный контекст — `obj.$ = context` (один раз, повторная запись бросает ошибку)
2. Контекст **владельца** из owning-дерева — дочерний компонент наследует `$` родителя
3. Статический `Class.$` — контекст по умолчанию для всех экземпляров класса
4. Глобальный `$`

```typescript
class Bar extends $mol_object2 {
    @ $mol_mem
    Foo() { return new Foo }
}

const bar = new Bar
bar.$ = context_mock
bar.Foo().logger.log('noop')  // Foo унаследует context_mock от Bar
```

### `$mol_ambient` — подмена части контекста

```typescript
// mol/ambient/ambient.ts
function $mol_ambient(this: $ | void, overrides: Partial<$>): $ {
    return Object.setPrototypeOf(overrides, this || $)
}
```

Создаёт объект `overrides` с прототипом = родительский контекст (`this` или глобальный `$`). Свои поля — переопределения, остальное — из цепочки прототипов:

```typescript
const context_mock = $mol_ambient({
    console: { log: () => undefined },
})

const foo = new Foo
foo.$ = context_mock

foo.logger.log('...')  // через this.$.console — вызовется мок
```

Подмена работает для обращений **через `this.$`**. Прямой вызов глобальной функции `$mol_guid()` мок не затрагивает.

### `$mol_ambient_make` — объект сразу с контекстом

```typescript
const foo = $.$mol_ambient_make(Foo, {
    console: { log: () => undefined },
})
// эквивалентно: new Foo + назначение $mol_ambient(overrides)
```

### Глобальные функции с `this: $`

Функции в `namespace $` могут принимать контекст как `this`:

```typescript
function $my_hello(this: $, name: string) {
    this.console.log(`Hello, ${name}!`)
}

$.$my_hello('Jin')  // this = глобальный $
```

### Синглтоны и статические классы

Обычный `new MyClass` не подхватывает `this.$` автоматически для синглтонов. Используйте:

- `$mol_one` — context-friendly singleton: `this.$.$mol_one.$my_session`
- `$mol_static` — кэшируемый статический класс с контекстом: `this.$.$mol_static.$my_session`

См. `mol/one/README.md`, `mol/static/README.md`.

## Быстрый старт

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
    <link href="web.css" rel="stylesheet"/>
</head>
<body>
    <div mol_view_root="$my_app"></div>
    <script src="web.js" charset="utf-8"></script>
</body>
</html>
```

`mol_view_root` — указывает корневой компонент.

### Запуск

```bash
npm exec mam@latest          # Dev-сервер на localhost:9080
npm start my/app             # Production сборка
```

Открыть: `http://localhost:9080/my/app/-/test.html`

## Компоненты $mol

### Layout

| Компонент | Назначение | Ключевые свойства |
|-----------|-----------|-------------------|
| `$mol_view` | Базовый компонент | `sub /`, `attr *`, `minimal_height` |
| `$mol_page` | Страница | `title`, `body /`, `head /`, `tools /` |
| `$mol_book2` | Книжный layout | `pages /` |
| `$mol_book2_catalog` | Каталог с меню | `param`, `spreads *` |
| `$mol_list` | Список с виртуализацией | `rows /`, `Empty` |
| `$mol_row` | Горизонтальный ряд | `sub /` |
| `$mol_bar` | Панель кнопок | `sub /` |
| `$mol_labeler` | Метка + контент | `title`, `content /` |
| `$mol_section` | Секция с заголовком | `title`, `body /` |
| `$mol_card` | Карточка | `sub /` |
| `$mol_filler` | Распорка | — |

### Формы ввода

| Компонент | Назначение | Ключевые свойства |
|-----------|-----------|-------------------|
| `$mol_string` | Текстовое поле | `value?`, `hint`, `type`, `enabled` |
| `$mol_textarea` | Многострочное поле | `value?`, `hint` |
| `$mol_number` | Числовое поле | `value?`, `hint_text` |
| `$mol_check` | Чекбокс | `checked?`, `title` |
| `$mol_switch` | Переключатель | `checked?`, `title` |
| `$mol_select` | Выпадающий список | `value?`, `dictionary *`, `options /` |
| `$mol_search` | Поле поиска | `query?`, `submit?` |
| `$mol_date` | Выбор даты | `value?` |

### Кнопки и ссылки

| Компонент | Назначение | Ключевые свойства |
|-----------|-----------|-------------------|
| `$mol_button` | Кнопка | `title`, `click?`, `enabled`, `hint` |
| `$mol_button_minor` | Неакцентная кнопка | — (те же) |
| `$mol_button_major` | Акцентная кнопка | — (те же) |
| `$mol_link` | Ссылка / навигация | `title`, `uri`, `arg *` |

### Текст

| Компонент | Назначение |
|-----------|-----------|
| `$mol_paragraph` | Параграф (`title`) |
| `$mol_text` | Многострочный текст (`text`) |
| `$mol_heading` | Заголовок (`title`, `level`) |
| `$mol_dimmer` | Подсветка совпадений (`needle`, `haystack`) |

### Диалоги и индикаторы

| Компонент | Назначение |
|-----------|-----------|
| `$mol_pop` | Всплывающее окно (`trigger`, `bubble`) |
| `$mol_speck` | Индикатор загрузки |
| `$mol_status` | Статусное сообщение (`message`) |
| `$mol_portion` | Прогресс-бар (`portion`) |

### Плагины

| Компонент | Назначение |
|-----------|-----------|
| `$mol_theme_auto` | Авто-тема (свет/темнота) |
| `$mol_scroll` | Скроллинг (`scroll_top?`) |
| `$mol_nav` | Клавиатурная навигация |
| `$mol_hotkey` | Горячие клавиши |
| `$mol_touch` | Touch-жесты |

## Стилизация

### CSS (файл `.view.css`)

Селекторы — атрибутные, повторяют FQN компонента:

```css
[my_app] {
    display: flex;
    gap: 1rem;
}

[my_app_header] {
    font-size: 1.5rem;
}
```

### TypeScript стили (`$mol_style_define`)

Предпочтительный способ — типизация, автодополнение, вложенность:

```typescript
namespace $.$$ {
    $mol_style_define($my_app, {
        display: 'flex',
        gap: '1rem',

        Header: {
            fontSize: '1.5rem',
            $mol_button: {
                margin: '0 .5rem',
            },
        },

        Card: {
            border: { radius: '8px', width: '1px', style: 'solid' },
            padding: { top: '1rem', bottom: '1rem' },
            '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            },
        },
    })
}
```

Генерируется в CSS с правильными атрибутными селекторами:
- `Header` → `[my_app_header]`
- `$mol_button` → `[mol_button]`
- `border: { radius: '8px' }` → `border-radius: 8px`

**Файлы:** `.view.css` для простых стилей, `.view.css.ts` для сложных.

## Навигация и роутинг

### $mol_state_arg — работа с URL

```typescript
// Чтение
const page = this.$.$mol_state_arg.value('page') ?? 'main'

// Запись одного параметра
this.$.$mol_state_arg.value('page', 'tasks')

// Запись нескольких
this.$.$mol_state_arg.go({ page: 'tasks', task: '123' })

// Удаление параметра
this.$.$mol_state_arg.go({ task: null })
```

### $mol_link — навигационные ссылки

```tree
<= Tasks_link $mol_link
    arg * page \tasks
    title \Tasks
```

### $mol_book2_catalog — приложение с каталогом

```tree
$my_app $mol_book2_catalog
    param \page
    spreads *
        \ <= Home_page $mol_page
            title \Home
        tasks <= Tasks_page $mol_page
            title \Tasks
        settings <= Settings_page $mol_page
            title \Settings
```

- `param` — имя URL-параметра
- `spreads *` — словарь страниц (ключ → компонент)
- Пустой ключ `\` — дефолтная страница
- Меню генерируется автоматически

```typescript
// Динамические spreads
@$mol_mem
override spreads() {
    return {
        '': this.Home_page(),
        'tasks': this.Tasks_page(),
    }
}

// Программная навигация
@$mol_action
open_tasks() {
    this.$.$mol_state_arg.value(this.param(), 'tasks')
}
```

### $mol_book2 — многостраничный layout

```typescript
@$mol_mem
pages() {
    const pages = [this.Home_page()]
    const taskId = this.$.$mol_state_arg.value('task')
    if (taskId) pages.push(this.Task_page())
    return pages
}
```

## Формы

### $mol_form — простая форма

```tree
$my_form $mol_form
    submit? <=> save? null
    body /
        <= Name_field $mol_form_field
            name \Name
            bid <= name_bid \
            Content <= Name $mol_string
                value? <=> name? \
    buttons /
        <= Submit $mol_button_major
            title \Save
            click? <=> save? null
            enabled <= submit_allowed
```

```typescript
name_bid() {
    const value = this.name()
    if (!value) return 'Required'
    if (value.length < 3) return 'Too short'
    return ''  // пустая строка = валидно
}
```

**Как работает:**
- `$mol_form_field` — поле с меткой и валидацией
- `bid` — строка с ошибкой (пустая = валидно)
- `submit_allowed` — `true` если все `bid` пустые (автоматически)
- `buttons /` — кнопки формы

### $mol_form_draft — форма с моделью

Работает с объектом-моделью, хранит промежуточное состояние:

```tree
$my_edit $mol_form_draft
    model <= article $my_article
    submit? => publish?
    changed => has_changes
    form_fields /
        <= Title_field $mol_form_field
            name \Title
            bids /
                <= bid_required*title
            Content <= Title $mol_string
                value? <=> value_str*title?
```

- `model` — объект-источник данных
- `value_str*field?` — двунаправленная связь с полем модели
- `changed` — есть ли несохранённые изменения
- `bid_required*field` — параметризованная валидация

## Система сборки (.meta.tree)

### deploy — статические файлы

```tree
deploy \/my/app/readme.md
```

Копирует файл в `-/` с полным путём. `index.html` копируется автоматически.

### pack — внешние зависимости

```tree
pack apxu git \https://github.com/ApxuTechTop/apxu
```

MAM клонирует репо при первом обращении к `$apxu_*` классам.

### require / include — дополнительные модули

```tree
require \mol/offline/install    # До кода модуля
include \my/examples/all        # После кода модуля
```

**Где размещать:**
- Корневой `.meta.tree` — глобальные `pack`
- Модульный `app.meta.tree` — `deploy`, `require`, `include`

## Локализация

Файлы: `component.locale=en.json`, `component.locale=ru.json`

```json
{
    "$my_app_title": "My Application",
    "$my_app_greeting": "Hello!"
}
```

В view.tree:

```tree
title @ \My Application
```

Компилируется в `this.$.$mol_locale.text('$my_app_title')`. Ключ: `$<класс>_<свойство>`.

## Тестирование

См. отдельный файл: **`mol-testing.md`** — подробное описание тестирования, моков через `$mol_ambient`, UI-тестирование как функций, assert-утилиты.

## Отладка

### Человеко-читаемые ID

Каждому DOM-элементу автоматически присваивается id:

```
$my_app.root(0).Task_row(3).Title()
```

Это валидный JS — можно выполнить в консоли для доступа к компоненту.

### Типичные проблемы

**UI не обновляется:**
1. Используйте `@$mol_mem` для геттеров
2. Меняйте данные через сеттер: `this.value(newValue)`
3. Побочные эффекты — в `@$mol_action`
4. Не создавайте новые объекты каждый раз в `@$mol_mem`

**async/await не работает:**
- Не используйте `async/await` в `@$mol_mem` и `@$mol_action`
- Пишите синхронно, fiber/suspend работают автоматически

**Паразитные пересчёты:**
- Побочные эффекты не должны быть в `@$mol_mem`
- Проверяйте сгенерированные файлы в `-view.tree/`

## Лучшие практики

1. Зависимости через `this.$.$module`, не `import`; подмена в тестах — `$mol_ambient` → `obj.$ = context`
2. Побочные эффекты только в `@$mol_action`
3. Маленькие `@$mol_mem` свойства, не гигантские методы
4. `.meta.tree` для зависимостей (`pack`) и статики (`deploy`)
5. `pack` в корневом `.meta.tree` для общих зависимостей
6. Один `package.json` в корне MAM
7. `$mol_form` для простых форм, `$mol_form_draft` для редактирования моделей
8. Валидация: `''` = валидно, непустая строка = ошибка
9. Pull-семантика: геттеры, иммутабельность, автоматические перевычисления
10. Синхронный код: `$mol_wire_sync` для внешних async API
