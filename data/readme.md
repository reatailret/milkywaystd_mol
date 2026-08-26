# MWS Data - Универсальная библиотека для работы с данными

Универсальная библиотека для отображения списков и редактирования сущностей в $mol фреймворке.

## 🎯 Возможности

- ✅ **Pluggable Data Sources** - подключаемые источники данных (REST API, custom functions, mocks)
- ✅ **CRUD операции** - LIST, GET, CREATE, UPDATE, REPLACE, DELETE
- ✅ **Reactive DataSource** - реактивный источник данных с фильтрами и пагинацией
- ✅ **Entity Models** - модели сущностей с черновиками и автосохранением
- ✅ **Table Component** - готовый компонент таблицы с сортировкой
- ✅ **Form Component** - готовая форма редактирования
- ✅ **TypeScript Generics** - полная типизация с дженериками
- ✅ **Pull Semantics** - следование $mol спецификации (без async)

## 📁 Структура

```
mws/data/
├── source/              # Источники данных
│   ├── source.ts        # Интерфейс источника данных
│   ├── rest/            # REST API адаптер
│   │   └── rest.ts
│   └── custom/          # Кастомный адаптер
│       └── custom.ts
├── repo/                # Репозиторий данных
│   └── repo.ts
├── datasource/          # Реактивный DataSource
│   └── datasource.ts
├── entity/              # Модель сущности
│   └── entity.ts
├── table/               # Компонент таблицы
│   ├── table.view.tree
│   └── table.view.ts
├── form/                # Компонент формы
│   ├── form.view.tree
│   └── form.view.ts
├── demo/                # Примеры
│   ├── rest/            # Пример с JSONPlaceholder API
│   │   ├── index.html
│   │   └── todos/
│   └── custom/          # Пример с mock данными
│       ├── index.html
│       └── products/
├── data.test.ts         # Тесты
└── readme.md            # Документация
```

## 🚀 Быстрый старт

### 1. REST API источник данных

```typescript
// Создаем REST источник
const source = new $mws_data_source_rest<Todo>()
source.api_url('https://jsonplaceholder.typicode.com')
source.resource('todos')

// Создаем репозиторий
const repo = new $mws_data_repo<Todo>()
repo.source = () => source

// Получаем данные
const list = repo.list()          // Получить список
const item = repo.item(1)         // Получить по ID
repo.create({ title: 'New' })     // Создать
repo.update(1, { title: 'Upd' })  // Обновить
repo.remove(1)                     // Удалить
```

### 2. Кастомный источник данных

```typescript
// Мок хранилище
const storage = new Map()

// Создаем кастомный источник
const source = new $mws_data_source_custom<Product>()

source.list_fn = (params) => Array.from(storage.values())
source.one_fn = (id) => storage.get(id)
source.create_fn = (data) => {
    const item = { id: nextId++, ...data }
    storage.set(item.id, item)
    return item
}
source.update_fn = (id, data) => {
    const item = storage.get(id)
    const updated = { ...item, ...data }
    storage.set(id, updated)
    return updated
}
source.remove_fn = (id) => storage.delete(id)
```

### 3. DataSource с таблицей

```typescript
// Создаем DataSource
const ds = new $mws_data_datasource<Product>()
ds.repo = () => repo

// Настройка колонок
ds.columns([
    { id: 'id', title: 'ID', field: 'id', sortable: true },
    { id: 'name', title: 'Name', field: 'name', sortable: true },
    { id: 'price', title: 'Price', field: 'price', 
      render: (item) => `$${item.price}` }
])

// Настройка пагинации
ds.limit(10)

// Фильтрация
ds.filter_set('category', 'Electronics')

// Сортировка
ds.sort_set('price', 'desc')

// Получение данных
const rows = ds.rows()
const total = ds.total()
```

### 4. Entity модель

```typescript
// Создаем entity
const entity = new $mws_data_entity<Product>()
entity.repo = () => repo
entity.id(1)

// Получаем данные
const data = entity.data()

// Редактирование через поля
entity.field('name', 'New Name')
entity.field('price', 999)

// Проверка изменений
const isDirty = entity.dirty()  // true

// Сохранение
entity.save()

// Отмена
entity.abort()
```

## 📖 Примеры

### Пример 1: REST API (JSONPlaceholder)

```bash
# Запустить dev-сервер
npm start

# Открыть в браузере
http://localhost:9080/mws/data/demo/rest/-/test.html
```

Пример показывает:
- Таблицу todos из JSONPlaceholder API
- Фильтрацию по userId
- Сортировку по полям
- Пагинацию (20 элементов на странице)
- Редактирование элемента

### Пример 2: Custom Data Source (Mocks)

```bash
# Открыть в браузере
http://localhost:9080/mws/data/demo/custom/-/test.html
```

Пример показывает:
- Таблицу продуктов из mock данных
- Локальное хранилище в памяти
- CRUD операции
- Фильтрацию по категориям
- Пагинацию (5 элементов на странице)

## 🧪 Тестирование

```bash
# Открыть браузер для тестов
http://localhost:9080/
```

Тесты включают:
- ✅ REST source - basic operations
- ✅ Custom source - with mock functions
- ✅ Repository - list and item operations
- ✅ DataSource - filters and pagination
- ✅ Entity - draft and save

## 🏗️ Архитектура

### Паттерны

#### Adapter Pattern
Различные источники данных (REST, custom) реализуют общий интерфейс `$mws_data_source`:

```typescript
interface $mws_data_source<T> {
    list(params?: Record<string, any>): readonly T[]
    one(id: string | number): T
    create(data: Partial<T>): T
    update(id: string | number, data: Partial<T>): T
    remove(id: string | number): void
}
```

#### Repository Pattern
Репозиторий инкапсулирует логику работы с данными:

```typescript
class $mws_data_repo<T> {
    source(): $mws_data_source<T>
    list(): readonly T[]
    item(id): T
    create(data): T
    update(id, data): T
    remove(id): void
}
```

#### Entity Pattern
Entity представляет одну сущность с черновиками:

```typescript
class $mws_data_entity<T> {
    data(): T              // Сохраненные данные
    draft(): Partial<T>    // Черновик
    field(key, value?)     // Работа с полями
    save()                 // Сохранить
    abort()                // Отменить
    dirty()                // Есть изменения?
}
```

### Pull Semantics ($mol)

Библиотека следует принципам $mol:
- ✅ Нет `async/await` - используется pull-семантика
- ✅ `@$mol_mem` для мемоизации
- ✅ `@$mol_action` для действий
- ✅ `$mol_fail_hidden` для обработки ошибок
- ✅ Реактивность через $mol_wire

## 🔧 API Reference

### $mws_data_source_rest

```typescript
class $mws_data_source_rest<T> {
    api_url(url?: string): string
    resource(name?: string): string
    headers(headers?: Record<string, string>): Record<string, string>
    
    // Кастомизация обработки ответов
    list_data_extract(response: any): readonly T[]
    list_meta_extract(response: any): Record<string, any>
    one_data_extract(response: any): T
    
    // Кастомизация отправки данных
    create_data_pack(data: Partial<T>): any
    update_data_pack(data: Partial<T>): any
}
```

### $mws_data_source_custom

```typescript
class $mws_data_source_custom<T> {
    list_fn: (params?) => readonly T[]
    list_meta_fn: (params?) => Record<string, any>
    one_fn: (id) => T
    create_fn: (data) => T
    update_fn: (id, data) => T
    replace_fn: (id, data) => T
    remove_fn: (id) => void
}
```

### $mws_data_datasource

```typescript
class $mws_data_datasource<T> {
    columns(config?: ColumnConfig[]): ColumnConfig[]
    filters(filters?: Record<string, any>): Record<string, any>
    sort(sort?: {field, order}): {field, order}
    limit(n?: number): number
    offset(n?: number): number
    
    rows(): readonly T[]
    total(): number
    
    filter_set(field, value)
    filter_clear()
    sort_set(field, order)
    sort_toggle(field)
    page_go(page)
    page_next()
    page_prev()
}
```

### Конфигурация колонок

```typescript
type $mws_data_column_config<T> = {
    id: string
    title: string
    field?: keyof T
    width?: number
    sortable?: boolean
    filterable?: boolean
    render?: (item: T) => any
}
```

### Конфигурация полей формы

```typescript
type $mws_data_form_field_config<T> = {
    id: string
    name: string
    field: keyof T
    type: 'string' | 'number' | 'text' | 'check'
    hint?: string
    required?: boolean
}
```

## 🎨 Кастомизация

### Кастомная обработка REST ответов

```typescript
const source = new $mws_data_source_rest<Todo>()

// Если API возвращает { data: [...], meta: {...} }
source.list_data_extract = (response) => response.data
source.list_meta_extract = (response) => response.meta
```

### Кастомная отправка данных

```typescript
source.create_data_pack = (data) => ({
    todo: data,
    timestamp: Date.now()
})
```

### Переопределение DataSource

```typescript
class MyDataSource extends $mws_data_datasource<Product> {
    // Своя логика применения параметров
    override apply_params() {
        const params = {
            _start: this.offset(),
            _limit: this.limit()
        }
        this.repo().params(params)
    }
}
```

## 📝 Лицензия

MIT

## 🤝 Вклад

Contributions welcome! Следуйте спецификации в `mws/app/spec/spec.md`.

