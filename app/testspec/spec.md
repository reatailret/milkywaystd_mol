# Спецификация использования фреймворка $mol и MAM

## Обзор

$mol - это реактивный компонентный фреймворк для создания веб-приложений. 

Полезные вводные материалы по MAM и принципам организации модулей см. в руководстве: [Подробно о MAM](https://mol.hyoo.ru/#!section=docs/=u3t8nj_4kinwo).

## Быстрый старт: Создание первого приложения

### Шаг 1: Инициализация проекта

**Вариант A: Быстрый старт с dev-сервером (рекомендуется для новичков)**

Самый простой способ начать работу - развернуть MAM окружение с нуля. Это делается **один раз** под все проекты.

```bash
# Создайте пустую директорию для MAM окружения
mkdir my-mam-workspace
cd my-mam-workspace

# Запустите MAM-сервер (автоматически склонирует всё необходимое)
npm exec mam@latest
```

**Что происходит:**
1. MAM автоматически склонирует все необходимые репозитории
2. Dev-сервер запустится на `http://localhost:9080`
3. Окружение готово к разработке!

Теперь создайте структуру вашего модуля:
```bash
# В новом терминале (сервер должен работать)
mkdir -p my/app
cd my/app
# Создайте файлы приложения (см. следующие шаги)
```

**Вариант B: Работа внутри существующего MAM репозитория**

Если вы работаете в уже склонированном MAM репозитории:

```bash
# Из корня MAM проекта создайте структуру модуля
mkdir -p my/app
cd my/app
# Создайте файлы приложения (см. следующие шаги)
```

**Вариант C: Новый standalone проект через клонирование**

Для создания проекта через клонирование репозитория:

```bash
# Склонировать MAM
git clone https://github.com/hyoo-ru/mam.git my-project
cd my-project

# Установить зависимости
npm install

# Создать структуру вашего модуля
mkdir -p my/app
```

**Важно:** MAM работает как **монорепозиторий** - один `package.json` в корне управляет всеми модулями.

### Шаг 2: Структура минимального приложения

Создайте следующую структуру файлов в корне MAM проекта:

```
mam/                        # Корень MAM проекта
├── package.json            # Общий для всех модулей (уже есть)
├── node_modules/           # Зависимости (уже есть после npm install)
└── my/
    └── app/
        ├── index.html
        ├── app.view.tree
        ├── app.view.ts
        └── app.locale=en.json
```

**Важно:** 
- Не создавайте отдельный `package.json` для каждого модуля
- Все модули используют общий `package.json` из корня MAM
- FQN (Fully Qualified Name) компонента формируется из пути: `my/app` → `$my_app`

### Шаг 3: Создание index.html

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

**Важно:** 
- `mol_view_root` - атрибут указывает корневой компонент
- `$my_app` - имя компонента соответствует пути `my/app`

### Шаг 4: Создание app.view.tree

```tree
$my_app $mol_book2
	plugins /
		<= Theme $mol_theme_auto
	pages /
		<= Main $mol_page
			title \My First App
			body /
				<= Greeting $mol_view
					sub /
						<= Title $mol_paragraph
							title \Hello, $mol!
				<= Counter_section $mol_view
					sub /
						<= Counter $mol_number
							value? <=> counter? 0
						<= Increment $mol_button_minor
							title \+
							click? <=> increment? null
						<= Decrement $mol_button_minor
							title \-
							click? <=> decrement? null
```

**Разбор структуры:**
- `$my_app $mol_book2` - наш компонент наследуется от `$mol_book2` (книжный layout)
- `plugins /` - плагины для расширения поведения (тема, скролл и т.д.)
- `pages /` - страницы приложения (для $mol_book2)
- `<= Main $mol_page` - создание подкомпонента Main класса $mol_page
- `title \` - строковое свойство
- `value? <=>` - двусторонняя связь (getter и setter)
- `click? <=>` - обработчик события клика

### Шаг 5: Создание app.view.ts

```typescript
namespace $.$$ {
	
	export class $my_app extends $.$my_app {
		
		// Состояние счётчика
		@$mol_mem
		counter(next?: number): number {
			return next ?? 0
		}
		
		// Действие увеличения
		@$mol_action
		increment() {
			this.counter(this.counter() + 1)
		}
		
		// Действие уменьшения
		@$mol_action
		decrement() {
			this.counter(this.counter() - 1)
		}
		
	}
	
}
```

**Важные моменты:**
- `namespace $.$$` - локальное пространство имён приложения
- `extends $.$my_app` - расширяем сгенерированный класс из .view.tree
- `@$mol_mem` - мемоизация (кэширование) значения
- `@$mol_action` - действие с побочными эффектами
- `next?: number` - параметр для установки нового значения

### Шаг 6: Создание файла локализации (опционально)

```json
{
	"$my_app_Main_title": "My First App",
	"$my_app_Title_title": "Hello, $mol!",
	"$my_app_Increment_title": "Increment",
	"$my_app_Decrement_title": "Decrement"
}
```

### Шаг 7: Запуск приложения

**Если использовали Вариант A (npm exec mam@latest):**

Dev-сервер уже запущен! Просто откройте браузер:

```
http://localhost:9080/my/app/-/test.html
```

**Если использовали Вариант B или C:**

Из **корня MAM проекта**:

```bash
# Запустить dev-сервер (если еще не запущен)
npm start
```

Откройте браузер на `http://localhost:9080/my/app/-/test.html`

**Что происходит:**

MAM автоматически скомпилирует ваш модуль при первом обращении к странице.

Вы увидите работающее приложение с счётчиком!

### Шаг 8: Production сборка

Для создания production build:

```bash
# Из корня MAM проекта
npm start my/app
```

Результат сборки появится в `my/app/-/` и будет содержать:
- `web.js` - скомпилированный JavaScript
- `web.css` - стили
- `index.html` - HTML файл
- И другие ресурсы

### Что происходит при сборке

1. MAM компилирует `app.view.tree` → JavaScript класс в `my/app/-view.tree/`
2. Объединяет все зависимости в `my/app/-/web.js`
3. Генерирует стили в `my/app/-/web.css`
4. Запускает dev-сервер с hot-reload на порту 9080

### Минимальный пример без зависимостей

Если нужно простейшее приложение без $mol_book2:

**app.view.tree:**
```tree
$my_app $mol_view
	sub /
		<= Title $mol_paragraph
			title \Hello World
```

**app.view.ts:**
```typescript
namespace $.$$ {
	export class $my_app extends $.$my_app {
		// Логика здесь (если нужна)
	}
}
```

Это минимум для работающего приложения!

## Доступные компоненты $mol

Фреймворк $mol предоставляет богатую библиотеку готовых компонентов.

### Компоновка и Layout

- **`$mol_view`** - базовый компонент, основа для всех остальных
  - Свойства: `sub /` (подкомпоненты), `attr *` (HTML атрибуты)
  
- **`$mol_page`** - страница с заголовком, телом, головой и инструментами
  - `title` - заголовок страницы
  - `body /` - содержимое страницы
  - `head /` - компоненты в шапке
  - `tools /` - инструменты (кнопки) в шапке

- **`$mol_book2`** - книжный layout с навигацией (меню слева, страницы справа)
  - `pages /` - список страниц
  - `menu_title` - заголовок меню
  - Автоматически управляет роутингом

- **`$mol_list`** - список элементов с виртуализацией
  - `rows /` - элементы списка

- **`$mol_row`** - горизонтальный ряд элементов
  - `sub /` - подэлементы

- **`$mol_bar`** - панель/полоса для размещения кнопок и контролов
  - `sub /` - подэлементы

- **`$mol_labeler`** - контейнер с меткой
  - `title` - текст метки
  - `content /` - содержимое

- **`$mol_filler`** - пустой распорка (заполнитель пространства)

### Текст и параграфы

- **`$mol_paragraph`** - параграф текста
  - `title` - текст параграфа
  - `uri` - ссылка (если нужно сделать кликабельным)

- **`$mol_text`** - многострочный текстовый блок
  - `text` - содержимое

- **`$mol_heading`** - заголовок
  - `title` - текст заголовка
  - `level` - уровень (1-6)

### Формы ввода

- **`$mol_string`** - однострочное текстовое поле
  - `value?` - текущее значение (getter/setter)
  - `hint` - placeholder
  - `enabled` - доступность
  - `type` - тип input (text, email, password, url, tel)

- **`$mol_textarea`** - многострочное текстовое поле
  - `value?` - текущее значение
  - `hint` - placeholder

- **`$mol_number`** - поле для ввода числа
  - `value?` - числовое значение
  - `hint_text` - placeholder

- **`$mol_check`** - чекбокс
  - `checked?` - состояние (true/false)
  - `title` - текст рядом

- **`$mol_switch`** - переключатель/свитчер
  - `checked?` - состояние
  - `title` - текст

- **`$mol_select`** - выпадающий список
  - `value?` - выбранное значение
  - `dictionary *` - словарь опций {key: 'Label'}
  - `options /` - список ключей опций

- **`$mol_search`** - поле поиска
  - `query?` - поисковый запрос
  - `submit?` - событие отправки

### Кнопки

- **`$mol_button`** - обычная кнопка
  - `title` - текст кнопки
  - `click?` - обработчик клика
  - `enabled` - доступность
  - `hint` - всплывающая подсказка

- **`$mol_button_minor`** - минорная кнопка (менее заметная)
  - Те же свойства что у `$mol_button`

- **`$mol_button_major`** - важная кнопка (более заметная)
  - Те же свойства что у `$mol_button`

- **`$mol_link`** - ссылка
  - `title` - текст ссылки
  - `uri` - URL
  - `hint` - подсказка
  - `arg *` - аргументы роутинга

### Диалоги и уведомления

- **`$mol_notify`** - всплывающее уведомление
  - `message` - текст сообщения
  - `status` - статус (error, warning, success)

- **`$mol_pop`** - всплывающее окно
  - `trigger` - элемент, по клику на который открывается
  - `bubble` - содержимое всплывашки

- **`$mol_dimmer`** - затемнение фона для модальных окон
  - `content` - содержимое

### Навигация и меню

- **`$mol_nav`** - навигационное меню
  - `links /` - список ссылок

- **`$mol_deck`** - колода карточек (показывается одна)
  - `pages /` - страницы
  - `current` - индекс текущей

- **`$mol_tabs`** - табы/вкладки
  - `tabs /` - список табов

### Индикаторы

- **`$mol_speck`** - индикатор загрузки/спиннер

- **`$mol_portion`** - индикатор прогресса
  - `portion` - доля (0-1)

- **`$mol_status`** - статусное сообщение
  - `message` - текст

### Изображения и медиа

- **`$mol_image`** - изображение
  - `uri` - URL картинки
  - `title` - alt текст

- **`$mol_icon`** - иконка
  - `icon` - имя иконки

### Плагины

- **`$mol_theme_auto`** - автоматическое переключение темы (светлая/тёмная)

- **`$mol_scroll`** - добавляет скроллинг контейнеру
  - `scroll_top?` - позиция скролла сверху
  - `scroll_left?` - позиция скролла слева

- **`$mol_keyboard`** - обработка клавиатурных событий
  - Комбинации клавиш для hotkeys

### Работа с датами

- **`$mol_date`** - выбор даты
  - `value?` - выбранная дата ($mol_time_moment)

- **`$mol_time_moment`** - класс для работы с датой/временем
  ```typescript
  new $mol_time_moment('2025-10-30')
  moment.toString('YYYY-MM-DD')
  ```

### Графики и визуализация

- **`$mol_chart2`** - графики и диаграммы
- **`$mol_plot`** - более сложные графики
- **`$mol_portion_ring`** - круговой прогресс-бар

### Пример использования компонентов

```tree
$my_form $mol_page
	title \Registration Form
	body /
		<= Name_label $mol_labeler
			title \Your Name
			content /
				<= Name $mol_string
					value? <=> name? ''
					hint \Enter your name
		<= Email_label $mol_labeler
			title \Email
			content /
				<= Email $mol_string
					value? <=> email? ''
					type \email
					hint \your@email.com
		<= Age_label $mol_labeler
			title \Age
			content /
				<= Age $mol_number
					value? <=> age? 18
		<= Accept $mol_check
			title \I accept terms
			checked? <=> accepted? false
		<= Actions $mol_bar
			sub /
				<= Filler $mol_filler
				<= Submit $mol_button_major
					title \Submit
					enabled <= can_submit
					click? <=> submit? null
```

**Где найти больше:**
- Исходники компонентов: `mol/`
- Каждый компонент имеет `.view.tree` с описанием интерфейса
- Примеры в demo-приложениях фреймворка

## Основные концепции

### 1. Компонентная архитектура

Компоненты в $mol наследуются от базового класса `$mol_view` и состоят из:
- **View.Tree** - декларативное описание структуры компонента
- **TypeScript** - логика поведения компонента
- **CSS** - стили компонента

### 2. Реактивная система

Фреймворк использует систему реактивности на основе:
- **Мемоизация** (`@$mol_mem`) - кэширование вычисляемых значений
- **Действия** (`@$mol_action`) - побочные эффекты без создания зависимостей
- **Автоматическое отслеживание зависимостей** между свойствами

## Структура файлов

```
component/
├── component.view.tree     # Декларативный шаблон компонента
├── component.view.ts       # Логика компонента
├── component.view.css      # CSS стили
├── component.view.css.ts   # Стили в TypeScript
└── index.html             # HTML-шаблон приложения
```

### Модули и неймспейсы в MAM

- Каждый модуль/пакет работает без явных `import` — доступ к зависимостям идет через глобальный неймспейс `$`/`$$`.
- Файл `mam.ts` экспортирует `$`, чтобы сборщик корректно связал окружение.
- Имена компонентов начинаются с `$` и составляют иерархию (например, `$mws_app_spec`), что облегчает композицию и переиспользование модулей [источник: «Подробно о MAM»](https://mol.hyoo.ru/#!section=docs/=u3t8nj_4kinwo).
- Имена компонентов в FQN отображают структуру папок: символ `_` соответствует разделителю директорий. Пример: `$mws_app_spec` → путь `mws/app/spec`.

### Точка входа HTML и корневой компонент

- В `index.html` используется атрибут `mol_view_root` и указание корневого компонента:

```html
<div mol_view_root='$mws_app_spec'></div>
```

- Сборка генерирует `web.js`, который инициализирует приложение и монтирует корневой компонент.

## Синтаксис View.Tree

### Основные правила

- **Комментарии**: строки начинающиеся с `-`
- **Отступы**: табуляция определяет вложенность компонентов
- **Массивы**: символ `/` обозначает массив
- **Строки**: символ `\` обозначает строковый литерал
- **Объекты**: символ `*` обозначает объект

Дополнительно:
- **Локализация**: `@ key` ссылается на ключ из `*.locale=<lang>.json`.
- **Наследование/слияние**: в объектах `*` символ `^` вставляет результат родительского свойства (аналог `...super.prop()`), см. пример `attr *` и `dictionary *` в `spec.view.tree`.
- **Сеттеры/ивенты**: суффикс `?` у свойства (например, `click?`) обозначает возможность двунаправленной связи `<=>` и сигнатуру метода вида `prop(next?: T)`. Это позволяет и читать, и устанавливать значение.

### Пример базового компонента

```tree
$my_component $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Header $mol_view
			sub /
				- Заголовок компонента
		<= Content $mol_view
			sub /
				<= Button $mol_button
					title \Нажми меня
					click? <=> buttonClick? null
```

### Типы связей между компонентами

1. **Создание подкомпонента** (`<= Name`):
   ```
   <= Button $mol_button
   ```

2. **Двусторонняя связь** (`<=> property?`):
   ```
   value? <=> myValue? \default
   ```

3. **Односторонняя связь на чтение** (`<= property`):
   ```
   title <= myTitle
   ```

4. **Односторонняя связь на запись** (`=> property`):
   ```
   focused => myFocused
   ```

### Типы данных

```tree
- числа
numbers /number
	+5
	+Infinity
	-Infinity
	NaN

- строки
text \
	\многострочный
	\текст

- булевы значения
flags /
	true
	false
	null

- объекты
config *
	^
	key \value
	nested *
		^
		subkey \subvalue
```

### Частые паттерны View.Tree

- **Плагины**: свойство `plugins /` принимает массив инстансов для расширения поведения (например, темы, скролл, хоткеи).
- **Атрибуты DOM**: `attr *` используется для задания HTML-атрибутов конкретного DOM-узла компонента.
- **Композиция**: `sub /` — основной способ собирать интерфейс из подкомпонентов (предпочтительнее сложного наследования).

#### Композиция во View.Tree

- Структура — в `.view.tree`, поведение — в `.view.ts`. Старайтесь держать шаблоны «чистыми», а вычисления/цикл генерации списков — в TS.
- Создание подкомпонентов: `<= Name $Class` и сборка через `sub /`.
- Проброс свойств: связывайте свойства подкомпонента со свойствами родителя (`options <= dictionary`, `value? <=> model_value?`).
- Переопределение: любой подкомпонент — это свойство, которое можно заменить в наследнике/компонозе (FQN позволяет точечно подменять).
- Итерации и списки: формируйте массив подкомпонентов в мемо-свойствах TS и возвращайте его в `sub`.

```tree
$card $mol_view
    sub /
        <= Title $mol_heading
            title <= card_title
        <= Actions $mol_view
            sub <= actions
```

```typescript
@$mol_mem
actions(): $mol_view[] {
    return [ this.EditButton(), this.RemoveButton() ]
}
```

Подробности и примеры композиции см. в материалах: [Композиция во View.Tree](https://github.com/nin-jin/slides/tree/master/mol#%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%B7%D0%B8%D1%86%D0%B8%D1%8F-%D0%B2%D0%BE-viewtree) и соответствующем разделе руководства $mol [источник](https://mol.hyoo.ru/#!section=docs/=cx1tyu_aduyqj).

## Реактивная система в TypeScript

### Декораторы

#### @$mol_mem
Мемоизация свойства - значение вычисляется один раз и кэшируется до изменения зависимостей.

```typescript
@$mol_mem
fullName(): string {
    return this.firstName() + ' ' + this.lastName()
}
```

#### @$mol_action
Действия - выполняют побочные эффекты без создания зависимостей в реактивной системе.

```typescript
@$mol_action
save() {
    const data = {
        name: this.fullName(),
        email: this.email()
    }

    // Fetch вызывается синхронно - НЕ async/await!
    const result = this.$.$mol_fetch.json('/api/save', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    
    // При первом вызове suspend на промисе
    // При повторном - result уже содержит данные
    return result
}
```

### Жизненный цикл свойств

```typescript
@$mol_mem
myProperty(next?: Type): Type {
    // next !== undefined - установка значения
    // next === undefined - получение значения
    return next ?? 'default value'
}
```

### $mol_wire, кеширование и инвалидация

- В основе реактивности — тонкое кеширование вычислений и автоматическая инвалидация зависимостей.
- `@$mol_mem` создает кэшируемые узлы, пересчитываемые только при изменении используемых в них свойств.
- Побочные эффекты следует изолировать в `@$mol_action`, чтобы не засорять граф зависимостей [источник: разделы «$mol_wire» и «Кеширование и реактивная инвалидация»](https://mol.hyoo.ru/#!section=docs/=u3t8nj_4kinwo).

### Fiber и Suspend: асинхронность без async/await

**Важно:** В $mol используется особый подход к асинхронности через механизм **fiber** и **suspend**.

#### ❌ Неправильно - использование async/await

```typescript
// НЕ ДЕЛАЙТЕ ТАК!
@$mol_mem
async loadData() {
    const response = await this.$.$mol_fetch.json('/api/data')
    return response
}
```

#### ✅ Правильно - синхронный стиль с автоматическим suspend

```typescript
// Правильный подход
@$mol_mem
loadData() {
    // Пишем как синхронный код
    const response = this.$.$mol_fetch.json('/api/data')
    return response
}
```

#### Как это работает

1. **Первый вызов** - функция выполняется:
   ```typescript
   const response = this.$.$mol_fetch.json('/api/data') // Возвращает Promise
   ```
   - Встретив промис, $mol_wire автоматически **бросает исключение-промис**
   - Функция **приостанавливается** (suspend)
   - UI автоматически показывает индикатор загрузки (`$mol_speck`)

2. **После resolve промиса** - функция запускается снова:
   ```typescript
   const response = this.$.$mol_fetch.json('/api/data') // Теперь возвращает данные сразу
   return response // ✓ Возвращает результат
   ```
   - Промис уже resolved, значение возвращается **синхронно**
   - UI обновляется с полученными данными

3. **Кэширование**:
   - Результат мемоизируется через `@$mol_mem`
   - При повторных вызовах возвращается из кэша
   - Другие мемоизированные функции в коде тоже возвращают кэш мгновенно

#### Обработка ошибок

Ошибки и отклонённые промисы обрабатываются автоматически:

```typescript
@$mol_mem
loadData() {
    try {
        const response = this.$.$mol_fetch.json('/api/data')
        return response
    } catch (error) {
        // Обработка ошибки (опционально)
        this.$.$mol_fail_hidden(error)
        return null
    }
}
```

**Но обычно try/catch не нужен:**
- $mol автоматически показывает ошибку в UI
- Пользователь видит сообщение об ошибке
- Компонент остаётся в рабочем состоянии

#### Преимущества подхода

✅ **Простота кода** - пишем как синхронный код, без async/await  
✅ **Автоматические индикаторы** - спиннеры и ошибки из коробки  
✅ **Отмена запросов** - при размонтировании компонента запросы отменяются  
✅ **Мемоизация работает** - кэширование асинхронных результатов  
✅ **Композиция** - можно вызывать другие мемо-функции без проблем

#### Пример с несколькими асинхронными вызовами

```typescript
@$mol_mem
userData() {
    // Все вызовы выглядят синхронными
    const user = this.$.$mol_fetch.json('/api/user')
    return user
}

@$mol_mem
userPosts() {
    const userId = this.userData().id // Может suspend если userData ещё загружается
    const posts = this.$.$mol_fetch.json(`/api/posts?user=${userId}`)
    return posts
}

@$mol_mem
fullData() {
    const user = this.userData()      // Вернёт кэш или suspend
    const posts = this.userPosts()    // Вернёт кэш или suspend
    
    return {
        user,
        posts,
        total: posts.length
    }
}
```

**Что происходит:**
1. При первом вызове `fullData()` - suspend на `userData()`
2. После загрузки user - suspend на `userPosts()`
3. После загрузки posts - всё возвращается мгновенно
4. При повторных вызовах - всё из кэша

#### Важные правила

1. **Не используйте `async`** в функциях с `@$mol_mem` или `@$mol_action`
2. **Пишите синхронно** - $mol сам управляет асинхронностью
3. **Промисы suspend автоматически** - не нужен await
4. **UI обновляется сам** - индикаторы и ошибки из коробки
5. **Мемоизация работает** - результаты кэшируются правильно

#### Пример из реального приложения

```typescript
namespace $.$$ {
    export class $my_app extends $.$my_app {
        
        // Загрузка файла - БЕЗ async!
        @$mol_mem
        spec_content() {
            // Выглядит синхронно, работает асинхронно
            const content = this.$.$mol_fetch.text('spec.md')
            return content
        }
        
        // Обработка загруженных данных
        @$mol_mem
        spec_lines() {
            const content = this.spec_content() // Suspend если ещё загружается
            return content.split('\n')
        }
        
        // Вычисления на основе данных
        @$mol_mem
        spec_stats() {
            const lines = this.spec_lines() // Из кэша если уже загружено
            return {
                lines: lines.length,
                chars: lines.join('').length
            }
        }
        
    }
}
```

#### Когда нужен try/catch

```typescript
@$mol_mem
loadWithFallback() {
    try {
        return this.$.$mol_fetch.json('/api/data')
    } catch (error) {
        // Логируем, но не показываем пользователю
        console.error('Failed to load', error)
        // Возвращаем fallback данные
        return { items: [] }
    }
}
```

Используйте try/catch только когда нужна **специальная обработка ошибок**. В остальных случаях $mol сам покажет ошибку пользователю.

### Интеграция с асинхронными API: $mol_wire_sync и $mol_wire_async

Многие нативные API и сторонние библиотеки являются асинхронными. $mol предоставляет механизмы **прозрачной трансформации** синхронного API в асинхронный и обратно.

#### $mol_wire_sync - делаем асинхронное API синхронным

Обёртка `$mol_wire_sync` позволяет работать с любым асинхронным API как с синхронным:

```typescript
// Синхронная функция загрузки JSON
function getData(uri: string): { lucky: number } {
    // Оборачиваем fetch в $mol_wire_sync
    const request = $mol_wire_sync(fetch)
    
    // Теперь можем вызывать синхронно
    const response = $mol_wire_sync(request(uri))
    
    // Работаем с результатом как с синхронным
    return response.json().data
}

// Использование в компоненте
@$mol_mem
user_data() {
    // Выглядит синхронно, работает асинхронно
    const data = getData('/api/user')
    return data
}
```

**Что происходит:**
- `$mol_wire_sync` оборачивает асинхронную функцию
- При первом вызове бросается промис (suspend)
- После resolve функция продолжает выполнение
- Результат возвращается синхронно

#### $mol_wire_async - делаем синхронное API асинхронным

Обёртка `$mol_wire_async` делает обратное преобразование - создаёт async-функцию из синхронной:

```typescript
// Асинхронная функция, совместимая с обычным async/await
async function lucky_update(uri: string): Promise<void> {
    
    // Оборачиваем синхронную функцию
    const fetchData = $mol_wire_async(getData)
    
    // Теперь можем использовать await
    const data = await fetchData(uri)
    data.lucky = 777
    
    await fetch(uri, {
        method: 'PUT',
        body: JSON.stringify({ data }),
    })
    
}
```

**Зачем это нужно:**
- Интеграция с внешними библиотеками, ожидающими async-функции
- Совместимость с обработчиками событий, которые не поддерживают suspend
- Избежание логирования Promise в консоль

#### Отмена задач и конкуренция

При множественных запусках асинхронных задач возникает проблема конкуренции.

**Инварианты (@$mol_mem):**
- Если зависимость изменилась, приостановленный атом просто перезапускается
- Старая задача отменяется автоматически
- Конкуренции не возникает

**Действия (@$mol_action) - множественные запуски:**

```typescript
// ❌ Каждый клик запускает новую задачу
button.onclick = function() {
    // Множество задач работают одновременно
    $mol_wire_async(counter).sendIncrement()
}
```

**Действия - отмена предыдущих запусков:**

```typescript
// ✅ Новый запуск отменяет предыдущий
button.onclick = $mol_wire_async(function() {
    counter.sendIncrement()
})
```

**Ключевой момент:** Обёртка создаётся один раз, поэтому:
- При новом клике старая задача отменяется
- До конца доходит только последняя запущенная задача
- Экономия ресурсов и корректное поведение

#### Debounce через задержку

Debounce реализуется элементарно через задержку в начале задачи:

```typescript
button.onclick = $mol_wire_async(function() {
    // Задержка 1 секунда
    $mol_wait_timeout(1000)
    
    // Сюда дойдём только если не было новых кликов
    counter.sendIncrement()
})
```

**Как работает:**
1. Клик → запуск задачи → задержка 1с
2. Новый клик → старая задача отменяется → новая задержка 1с
3. Если кликов больше нет → через 1с выполнится increment

**Преимущества:**
- Не нужны специальные debounce-функции
- Естественный код без обёрток
- Автоматическая отмена

#### Отмена через деструкторы

JavaScript Promises не поддерживают отмену стандартно. Но $mol предоставляет механизм через деструкторы:

```typescript
const fetchJSON = $mol_wire_sync(function fetch_abortable(
    input: RequestInfo,
    init: RequestInit = {}
) {
    
    // Создаём контроллер отмены
    const controller = new AbortController()
    init.signal ||= controller.signal
    
    const promise = fetch(input, init)
        .then(response => response.json())
    
    // Деструктор вызовется при отмене волокна
    const destructor = () => controller.abort()
    
    return Object.assign(promise, { destructor })
    
})
```

**Использование:**

```typescript
button.onclick = $mol_wire_async(function() {
    
    // Загрузка с автоматической отменой
    const { profile } = fetchJSON('https://example.org/input')
    
    // Отправка данных
    fetchJSON('https://example.org/output', {
        method: 'PUT',
        body: JSON.stringify(profile),
    })
    
})
```

**Что происходит:**
- При новом клике старое волокно отменяется
- Вызываются деструкторы всех промисов
- `controller.abort()` отменяет незавершённые HTTP-запросы
- Не нужно вручную хранить контроллеры и прокидывать сигналы

#### Граф волокон и каскадная отмена

Все волокна в $mol образуют связный граф:

```
Корневое волокно (компонент)
    ├── Волокно 1 (@$mol_mem свойство)
    │   ├── HTTP запрос 1
    │   └── HTTP запрос 2
    └── Волокно 2 (@$mol_action)
        └── HTTP запрос 3
```

**При размонтировании компонента:**
1. Корневое волокно отменяется
2. Каскадно отменяются дочерние волокна 1 и 2
3. Вызываются деструкторы всех промисов
4. Все HTTP-запросы автоматически отменяются

**Важно:** Если волокно остаётся без подписчиков - оно автоматически уничтожается.

#### Правила работы с асинхронностью

1. **Весь код пишите синхронно** - используйте `@$mol_mem` и `@$mol_action`
2. **Оборачивайте внешние async API** через `$mol_wire_sync`
3. **Создавайте async API для внешних библиотек** через `$mol_wire_async`
4. **Добавляйте деструкторы** для корректной отмены задач
5. **Избегайте множественных преобразований** sync→async→sync - граф разрывается

#### Пример: HTTP-клиент с отменой

```typescript
namespace $ {
    
    // Создаём синхронную обёртку над fetch
    export const $my_fetch_json = $mol_wire_sync(function(
        url: string,
        options: RequestInit = {}
    ) {
        const controller = new AbortController()
        options.signal ||= controller.signal
        
        const promise = fetch(url, options)
            .then(r => r.json())
        
        const destructor = () => controller.abort()
        return Object.assign(promise, { destructor })
    })
    
}

// Использование в компоненте
namespace $.$$ {
    export class $my_app extends $.$my_app {
        
        @$mol_mem
        users() {
            // Автоматическая отмена при перезапуске
            return $.$my_fetch_json('/api/users')
        }
        
        @$mol_action
        save_user(user: User) {
            // POST запрос с автоматической отменой
            return $.$my_fetch_json('/api/users', {
                method: 'POST',
                body: JSON.stringify(user)
            })
        }
        
    }
}
```

#### Пример: Интеграция с async библиотекой

```typescript
// Сторонняя библиотека ожидает async-функцию
declare function registerHandler(handler: () => Promise<void>): void

// Наша синхронная логика
function myHandler() {
    const data = $.$my_fetch_json('/api/data')
    console.log('Data loaded:', data)
}

// Регистрируем через $mol_wire_async
registerHandler($mol_wire_async(myHandler))
```

#### Преимущества подхода

✅ **Единый стиль кода** - весь код синхронный, понятный и простой  
✅ **Автоматическая отмена** - при размонтировании или перезапуске  
✅ **Нет утечек** - все запросы корректно завершаются  
✅ **Debounce из коробки** - через простую задержку  
✅ **Интеграция** - легко работать с любыми async библиотеками  
✅ **Граф зависимостей** - реактивность работает корректно

#### Частые сценарии

**Загрузка данных с отменой:**
```typescript
@$mol_mem
async_data() {
    const syncFetch = $mol_wire_sync(fetch)
    const response = syncFetch('/api/data')
    return response.json()
}
```

**Автодополнение с debounce:**
```typescript
search_input_change = $mol_wire_async(function() {
    $mol_wait_timeout(300) // Debounce 300ms
    const query = this.search_query()
    const results = this.search_api(query)
    this.search_results(results)
})
```

**Множественные запросы с отменой:**
```typescript
@$mol_mem
dashboard_data() {
    const syncFetch = $mol_wire_sync(fetch)
    
    // Все запросы отменятся при перезапуске
    const users = syncFetch('/api/users').then(r => r.json())
    const posts = syncFetch('/api/posts').then(r => r.json())
    const stats = syncFetch('/api/stats').then(r => r.json())
    
    return { users, posts, stats }
}
```

## Стилизация компонентов

В $mol есть два основных способа стилизации: через обычный CSS и через генерацию стилей в TypeScript.

### CSS синтаксис

Стили в $mol применяются через атрибутные селекторы, соответствующие именам компонентов:

```css
[my_component] {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

[my_component_button] {
    background: #007bff;
    color: white;
}
```

**Соглашение об именовании:**
- `[my_component]` - корневой элемент компонента `$my_component`
- `[my_component_button]` - подкомпонент Button внутри компонента
- `[my_component_header_title]` - вложенный подкомпонент Title внутри Header

#### Недостатки обычного CSS

❌ **Длинные селекторы** - утомительно писать руками:
```css
[my_profile_details_body] {
    overflow: overlay;
}

[my_profile_details_body] [mol_button] {
    border-radius: .5rem;
}
```

❌ **Нет автодополнения** - IDE не понимает соглашение об именовании компонентов

❌ **Нет проверки типов** - TypeScript не может проверить правильность селекторов

❌ **Дублирование имён** - приходится повторять полные пути к компонентам

### Генерация стилей через TypeScript

Более элегантный способ - описать стили в TypeScript и автоматически сгенерировать CSS через `$mol_style_define`.

#### Базовое использование

```typescript
namespace $.$$ {
    $mol_style_define($my_component, {
        Container: {
            padding: '20px',
            borderRadius: '8px'
        },
        Button: {
            background: '#007bff',
            color: 'white',
            '&:hover': {
                backgroundColor: '#0056b3'
            }
        }
    })
}
```

**Что происходит:**
1. `$mol_style_define` принимает класс компонента `$my_component`
2. Второй параметр - объект со стилями подкомпонентов
3. Автоматически генерируется CSS с правильными селекторами
4. TypeScript проверяет структуру и свойства

#### Преимущества TypeScript стилей

✅ **Лаконичность** - не нужно повторять длинные имена  
✅ **Автодополнение** - IDE подсказывает CSS свойства  
✅ **Типизация** - TypeScript проверяет правильность  
✅ **Вложенность** - удобная структура для вложенных компонентов  
✅ **DRY** - переиспользование значений через переменные

#### Вложенность и структурирование

Объект стилей отражает иерархию компонентов:

```typescript
$mol_style_define($my_profile, {
    Details: {
        Body: {
            overflow: 'overlay',
            $mol_button: {
                border: {
                    radius: `.5rem`,
                },
            },
        },
    },
})
```

**Генерируется в CSS:**
```css
[my_profile_details_body] {
    overflow: overlay;
}

[my_profile_details_body] [mol_button] {
    border-radius: .5rem;
}
```

**Структура:**
- `Details` → подкомпонент Details компонента $my_profile
- `Body` → подкомпонент Body внутри Details
- `$mol_button` → стили для всех кнопок внутри Body
- `border: { radius: ... }` → сокращённая запись для `border-radius`

#### Вложенные селекторы

Вы можете обращаться к вложенным компонентам других модулей:

```typescript
$mol_style_define($my_app, {
    TaskList: {
        // Стили для TaskList
        padding: '1rem',
        
        // Стили для всех mol_page внутри
        $mol_page: {
            background: '#f5f5f5',
            
            // Стили для mol_button внутри mol_page
            $mol_button: {
                margin: '.5rem',
            },
        },
    },
})
```

**Генерируется:**
```css
[my_app_task_list] {
    padding: 1rem;
}

[my_app_task_list] [mol_page] {
    background: #f5f5f5;
}

[my_app_task_list] [mol_page] [mol_button] {
    margin: .5rem;
}
```

#### Псевдоклассы и псевдоэлементы

Используйте префикс `&` для псевдоклассов:

```typescript
$mol_style_define($my_component, {
    Button: {
        background: '#007bff',
        color: 'white',
        
        '&:hover': {
            background: '#0056b3',
        },
        
        '&:active': {
            transform: 'scale(0.95)',
        },
        
        '&::before': {
            content: '""',
            display: 'block',
        },
        
        '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    },
})
```

#### Сокращённая запись свойств

CSS свойства можно группировать объектами:

```typescript
$mol_style_define($my_card, {
    border: {
        radius: '8px',
        width: '1px',
        style: 'solid',
        color: '#e0e0e0',
    },
    
    padding: {
        top: '1rem',
        bottom: '1rem',
        left: '1.5rem',
        right: '1.5rem',
    },
    
    margin: {
        top: '1rem',
        bottom: '1rem',
    },
})
```

**Генерируется:**
```css
[my_card] {
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: #e0e0e0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
```

#### Медиа-запросы

```typescript
$mol_style_define($my_layout, {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        
        '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        
        '@media (max-width: 480px)': {
            gridTemplateColumns: '1fr',
        },
    },
})
```

#### Переменные и переиспользование

Создавайте переменные для переиспользования значений:

```typescript
namespace $.$$ {
    
    const primaryColor = '#007bff'
    const primaryHover = '#0056b3'
    const spacing = {
        small: '.5rem',
        medium: '1rem',
        large: '2rem',
    }
    
    $mol_style_define($my_theme, {
        Button: {
            background: primaryColor,
            padding: spacing.medium,
            
            '&:hover': {
                background: primaryHover,
            },
        },
        
        Card: {
            padding: spacing.large,
            gap: spacing.medium,
        },
    })
    
}
```

#### Условные стили

```typescript
namespace $.$$ {
    
    const isDark = false
    
    $mol_style_define($my_app, {
        background: isDark ? '#1a1a1a' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
    })
    
}
```

#### Полный пример с вложенностью

```typescript
namespace $.$$ {
    
    $mol_style_define($my_dashboard, {
        
        // Корневой компонент
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        
        // Подкомпонент Header
        Header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: '#f5f5f5',
            borderRadius: '8px',
            
            // Заголовок внутри Header
            Title: {
                fontSize: '1.5rem',
                fontWeight: 'bold',
            },
            
            // Кнопки внутри Header
            $mol_button: {
                margin: '0 .5rem',
            },
        },
        
        // Подкомпонент Content
        Content: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            
            // Карточки внутри Content
            Card: {
                padding: '1.5rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                
                '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                    transform: 'translateY(-2px)',
                },
                
                // Изображение внутри Card
                $mol_image: {
                    width: '100%',
                    height: 'auto',
                    borderRadius: '4px',
                },
            },
        },
        
        // Подкомпонент Footer
        Footer: {
            padding: '1rem',
            textAlign: 'center',
            color: '#666',
            fontSize: '.875rem',
        },
        
    })
    
}
```

### Где размещать стили

**Файл `.view.css.ts`:**
```typescript
// my/component/component.view.css.ts
namespace $.$$ {
    $mol_style_define($my_component, {
        // Стили здесь
    })
}
```

**Или напрямую в `.view.ts`:**
```typescript
// my/component/component.view.ts
namespace $.$$ {
    
    // Стили
    $mol_style_define($my_component, {
        // ...
    })
    
    // Логика компонента
    export class $my_component extends $.$my_component {
        // ...
    }
    
}
```

### Сравнение подходов

| Особенность | CSS `.view.css` | TypeScript `.view.css.ts` |
|------------|-----------------|--------------------------|
| **Длина кода** | Длинные селекторы | Короткая вложенная структура |
| **Автодополнение** | Нет | Да (IDE + TypeScript) |
| **Проверка типов** | Нет | Да |
| **Переменные** | CSS переменные | TypeScript константы |
| **Вложенность** | Вручную | Автоматическая |
| **Условная логика** | Нет | Да |
| **Использование** | Простые стили | Сложные темы, системы дизайна |

### Лучшие практики стилизации

1. **Используйте TypeScript стили** для сложных компонентов с множеством подкомпонентов
2. **Используйте CSS** для простых одноразовых стилей
3. **Группируйте связанные свойства** через объекты (border, padding, margin)
4. **Создавайте переменные** для цветов, размеров, отступов
5. **Используйте вложенность** для отражения структуры компонентов
6. **Префикс `&`** для псевдоклассов и псевдоэлементов
7. **Медиа-запросы** для адаптивности
8. **Не дублируйте** - переиспользуйте через переменные и миксины

## Система сборки MAM

### Компиляция View.Tree

MAM преобразует `.view.tree` файлы в JavaScript классы:

```javascript
// Сгенерированный код из View.Tree
($.$my_component) = class $my_component extends ($.$mol_view) {
    Theme(){
        const obj = new this.$.$mol_theme_auto();
        return obj;
    }

    sub(){
        return [
            (this.Header()),
            (this.Content())
        ];
    }
};
```

### Структура сборки

```
-/
├── -view.tree/     # Скомпилированные View.Tree
├── -css/          # Скомпилированные стили
└── web.js         # Собранное приложение
```

### Запуск и сборка

**Разработка:**

Из корня MAM проекта:

```bash
npm start
```

Dev-сервер запустится на `http://localhost:9080`. Откройте `http://localhost:9080/my/app/-/test.html` и MAM автоматически скомпилирует модуль.

**Production сборка:**

```bash
npm start my/app
```

Скрипт вызывает `mam`, который:
- компилирует `.view.tree` → JS/TS (в `-view.tree/`),
- подключает стили (в `-css/`),
- собирает клиентский бандл `web.js`,
- копирует статические файлы (если указаны в `.meta.tree`),
- поднимает dev-сервер с горячей подменой [см. «Подробно о MAM»](https://mol.hyoo.ru/#!section=docs/=u3t8nj_4kinwo).

### Конфигурация деплоя и зависимостей (app.meta.tree)

Файл `.meta.tree` используется для конфигурации сборки модуля. Он поддерживает несколько директив для управления зависимостями и статическими файлами.

#### Директива deploy - копирование статических файлов

Для включения статических файлов в production сборку:

```tree
deploy \/mws/app/testspec/readme.md
deploy \/mws/app/testspec/docs/guide.md
deploy \/mws/app/testspec/images/logo.png
```

**Синтаксис:**
- `deploy \/path/to/file` - копирует файл в выходную директорию `-/` **с сохранением полного пути**
- Путь должен быть абсолютным от корня проекта (начинается с `\/`)
- Без этой директивы статические файлы не попадут в сборку

**Важно:** Файл копируется с полным путём!

**Пример:**
```tree
deploy \/mws/app/testspec/spec.md
```

Результат после сборки:
```
mws/app/testspec/-/
├── web.js
├── web.css
├── index.html
└── mws/                    ← Полный путь сохранён
    └── app/
        └── testspec/
            └── spec.md     ← Файл здесь
```

Загрузка в runtime:
```typescript
@$mol_mem
readme_content() {
    // Путь относительно -/: mws/app/testspec/spec.md
    return this.$.$mol_fetch.text('mws/app/testspec/spec.md')
}
```

#### Директива pack - подключение внешних пакетов

Для автоматического подключения кода из внешних Git-репозиториев:

```tree
pack apxu git \https://github.com/ApxuTechTop/apxu
pack mylib git \https://github.com/username/mylib
pack contrib git \https://github.com/org/contrib-modules
```

**Синтаксис:**
- `pack <namespace> git \<git-url>` - подключает внешний Git-репозиторий
- `<namespace>` - префикс FQN (например, `apxu`, `mylib`)
- MAM автоматически клонирует репозиторий когда:
  - Идёт сборка модуля
  - Происходит обращение к классам с FQN начинающимся с указанного namespace

**Пример использования:**

1. В корневом `.meta.tree` проекта:
```tree
pack apxu git \https://github.com/ApxuTechTop/apxu
pack hyoo git \https://github.com/hyoo-ru/mam
```

2. Теперь в коде можно использовать классы из этих пакетов:
```typescript
// Автоматически загрузится из GitHub при первом обращении
const component = new this.$.$apxu_my_component()
const tool = this.$.$giper_baza_glob
```

3. В View.Tree:
```tree
$my_app $mol_book2
    sub /
        <= External $apxu_some_widget
            config <= widget_config
```

**Как это работает:**

- При первом обращении к `$apxu_*` классу MAM проверяет `.meta.tree`
- Если находит `pack apxu git \...`, клонирует репозиторий в `apxu/`
- Автоматически делает код доступным для использования
- Кэширует локально, повторное клонирование не требуется

**Преимущества:**

- ✅ Не нужно вручную клонировать зависимости
- ✅ Автоматическое управление зависимостями
- ✅ Ленивая загрузка - только когда нужно
- ✅ Работает как для разработки, так и для сборки

#### Директивы require и include - подключение модулей без прямых зависимостей

Сборщик автоматически включает в дистрибутив модули, от которых зависит собираемый модуль. Но иногда нужно добавить модули, от которых ваш код **не зависит напрямую**.

**Типичные случаи:**
- Приложение с каталогом компонентов (компоненты не используются в коде напрямую)
- Плагины, которые регистрируются автоматически
- Полифиллы и утилиты, которые должны быть в бандле

**Две команды:**

```tree
# Подключить РАНЬШЕ кода текущего модуля
require \mol/offline/install

# Подключить ПОСЛЕ кода текущего модуля
include \mol/example/all
```

**Разница между require и include:**

| Директива | Когда выполняется | Использование |
|-----------|------------------|---------------|
| **require** | **До** кода текущего модуля | Полифиллы, настройки окружения, базовые классы |
| **include** | **После** кода текущего модуля | Компоненты каталога, примеры, дополнительные модули |

**Пример 1: Каталог компонентов**

```tree
# my/components/catalog/catalog.meta.tree
include \my/components/button
include \my/components/input
include \my/components/table
include \my/components/chart
```

Теперь все компоненты будут в бандле, даже если на них нет прямых ссылок в коде каталога.

**Пример 2: Приложение с offline support**

```tree
# my/app/app.meta.tree
require \mol/offline/install
```

Service Worker будет зарегистрирован до загрузки основного кода приложения.

**Пример 3: Документация с примерами**

```tree
# my/docs/docs.meta.tree
include \my/demo/basic
include \my/demo/advanced
include \my/demo/custom
```

Все демо будут доступны в сборке документации.

**Важно:**
- Используйте `require` когда модуль должен выполниться **до** вашего кода
- Используйте `include` когда модуль должен выполниться **после** вашего кода
- Если порядок не важен - используйте `include`

**Где размещать .meta.tree:**

1. **Корневой `.meta.tree`** (в корне проекта) - для глобальных `pack` директив:
```tree
pack apxu git \https://github.com/ApxuTechTop/apxu
pack hyoo git \https://github.com/hyoo-ru/mam_hyoo.git
```

2. **Модульный `app.meta.tree`** (в директории модуля) - для `deploy`, `require`, `include` и локальных `pack`:
```tree
deploy \/my/app/readme.md
require \mol/offline/install
include \my/examples/all
pack local_dep git \https://github.com/user/dep
```

**Пример структуры проекта:**

```
mam/                   # Корень проекта
├── .meta.tree         # Глобальные pack директивы
├── package.json
├── my/
│   └── app/
│       ├── app.meta.tree      # Конфигурация деплоя и локальные зависимости
│       ├── app.view.tree
│       ├── app.view.ts
│       ├── index.html
│       ├── readme.md          # Будет скопирован если указан в meta.tree
│       └── docs/
│           └── guide.md       # Будет скопирован если указан в meta.tree
└── apxu/              # Автоматически клонировано благодаря pack
    └── ...
```

После сборки (`npm start my/app`):

```
my/app/-/
├── web.js
├── web.css
├── index.html
├── readme.md          # Скопирован благодаря deploy
└── docs/
    └── guide.md       # Скопирован благодаря deploy
```

**Загрузка файлов в runtime:**

```typescript
@$mol_mem
readme_content() {
    // Файл доступен по пути с сохранённой структурой
    // Пишем БЕЗ async/await - $mol управляет асинхронностью
    return this.$.$mol_fetch.text('my/app/readme.md')
}
```

**Важно:** Путь в `$mol_fetch` должен соответствовать структуре в `-/` после deploy.

## CRUS - Реактивная база данных

CRUS (Convergent Realtime Unbreakable Secure Database) - это безопасная распределённая база данных с бесконфликтной реалтайм-синхронизацией, разработанная специально для работы с фреймворком $mol.

### Основные преимущества

- **🔒 Безопасность**: Аутентификация по приватному ключу, подписанные изменения, зашифрованные данные
- **✈️ Оффлайн**: Полная работоспособность без сети, локальное хранение в IndexedDB
- **🫂 Коллаборативность**: Бесконфликтная синхронизация между пользователями в реальном времени
- **🚀 Реактивность**: Автоматическая синхронизация изменений между слоями приложения
- **💪 Неубиваемость**: Высокая доступность, устойчивость к разделению сети, автовосстановление

### Основные концепции

#### Словарь терминов

- **🌌 Glob** - Глобальная база данных графа, содержащая все Lands
- **🌍 Land** - Автономная часть Glob, синхронизируется отдельно, имеет собственные права
- **🏠 Home** - Land пользователя с базовой информацией
- **Lord** - Независимый актор с глобальным уникальным ID (генерируется из Auth-ключа)
- **🧩 Node** - Высокоуровневое представление хранимых данных
- **Unit** - Минимальная независимая часть информации (ребро графа)

#### Иерархия типов Node

```
$giper_baza_node
├── $giper_baza_atom       # Атомарные LWW-регистры
│   ├── $giper_baza_atom_str
│   ├── $giper_baza_atom_real
│   ├── $giper_baza_atom_int
│   ├── $giper_baza_atom_bool
│   ├── $giper_baza_atom_time
│   ├── $giper_baza_atom_ref      # Ссылка на узел
│   └── $giper_baza_atom_ref_to   # Типизированная ссылка
├── $giper_baza_list       # Упорядоченные списки
│   ├── $giper_baza_list_str
│   ├── $giper_baza_list_real
│   └── $giper_baza_list_link_to   # Список ссылок
├── $giper_baza_dict       # Упорядоченные словари
├── $giper_baza_text       # Mergeable текст
└── $giper_baza_entity     # Базовая сущность с Title
```

### Создание моделей данных

#### Базовая сущность с полями

```typescript
export class $my_task extends $giper_baza_entity.with({
    // Title: $giper_baza_atom_str - унаследовано от $giper_baza_entity
    Description: $giper_baza_text,          // Длинный текст
    Completed: $giper_baza_atom_bool,       // Булево значение
    Priority: $giper_baza_atom_int,         // Целое число
    DueDate: $giper_baza_atom_time,         // Дата/время
}) {
    
    // Удобный геттер/сеттер с дефолтным значением
    completed(next?: boolean) {
        return this.Completed(next)?.val(next) ?? false
    }
    
    priority(next?: bigint) {
        return this.Priority(next)?.val(next) ?? 0n
    }
    
    due_date(next?: $mol_time_moment | null) {
        return this.DueDate(next)?.val(next) ?? null
    }
    
}
```

#### Связь между сущностями

```typescript
// Категория со списком задач
export class $my_category extends $giper_baza_entity.with({
    // Список ссылок на задачи
    Task: $giper_baza_list_link_to(() => $my_task),
}) {
    
    // Получить список задач
    @$mol_mem
    task_list() {
        return this.Task()?.remote_list() ?? []
    }
    
    // Создать новую задачу
    @$mol_action
    task_make() {
        return this.Task(null)!.make(null)
    }
    
    // Проверить видимость задачи в категории
    task_visible(task: $my_task, next?: boolean) {
        return this.Task(next)?.has(task.ref(), next) ?? false
    }
    
    // Вычислить количество завершённых задач
    @$mol_mem
    completed_count() {
        return this.task_list()
            .filter(task => task.completed())
            .length
    }
    
}
```

#### Home - корневая сущность пользователя

```typescript
// Профиль пользователя - корень данных
export class $my_person extends $giper_baza_home.with({
    Category: $giper_baza_list_link_to(() => $my_category),
}) {
    
    @$mol_mem
    category_list() {
        return this.Category()?.remote_list() ?? []
    }
    
    @$mol_action
    category_make() {
        return this.Category(null)!.make({})
    }
    
}
```

### Работа с базой данных в приложении

#### Инициализация Glob и получение Home

```typescript
namespace $.$$ {
    export class $my_app extends $.$my_app {
        
        // Доступ к глобальной БД через $giper_baza_glob
        @$mol_mem
        person() {
            return this.$.$giper_baza_glob.home($my_person)
        }
        
        // ID текущего пользователя
        @$mol_mem
        person_id() {
            return this.person().link().toString()!
        }
        
        // Получить узел по его ID
        @$mol_mem_key
        category(id: string) {
            return this.$.$giper_baza_glob.Node(
                new $giper_baza_link(id), 
                $my_category
            )
        }
        
    }
}
```

#### Создание и редактирование данных

```typescript
// Создание новой категории
@$mol_action
category_create() {
    const category = this.person().category_make()
    category.title('Новая категория')
    
    // Переход на страницу категории
    this.$.$mol_state_arg.go({ 
        category: category.link().toString()! 
    })
}

// Создание задачи внутри категории
@$mol_action
task_create(category: $my_category) {
    const task = category.task_make()
    task.title('Новая задача')
    task.completed(false)
    task.priority(1n)
    return task
}

// Редактирование задачи
@$mol_action
task_update(task: $my_task) {
    task.completed(!task.completed())
}
```

#### Реактивное чтение данных

```typescript
// В компоненте все свойства автоматически реактивны
@$mol_mem
categories() {
    return this.person().category_list()
}

@$mol_mem_key
category_title(id: string) {
    return this.category(id).title()
}

@$mol_mem_key
category_tasks_count(id: string) {
    return this.category(id).task_list().length
}

// Вычисления автоматически обновляются при изменении зависимостей
@$mol_mem
total_tasks() {
    return this.categories().reduce(
        (sum, cat) => sum + cat.task_list().length,
        0
    )
}
```

### Уровни доступа (Ranks)

CRUS поддерживает 5 уровней прав доступа:

- **🛑 nil** - Доступ запрещён
- **🔍 get** - Только чтение
- **📢 add** - Чтение всех данных + запись в один узел со своим ID
- **✍ mod** - Чтение и запись любых данных
- **👑 law** - Полный доступ + управление правами

#### Пресеты прав

```typescript
// Приватные данные - только владелец
$giper_baza_rank_private

// Публичные данные - все могут читать
$giper_baza_rank_public

// Лобби - все могут добавлять по одному узлу
$giper_baza_rank_lobby

// Оргия - все могут читать и писать
$giper_baza_rank_orgy
```

#### Создание Land с правами

```typescript
// Создание публичной категории
@$mol_action
public_category_make() {
    const category = this.person()
        .Category(null)!
        .make($giper_baza_rank_public)
    
    return category
}

// Создание приватной задачи
@$mol_action
private_task_make() {
    const task = this.person()
        .Task(null)!
        .remote_make($giper_baza_rank_private)
    
    return task
}
```

### Референсы (ссылки между узлами)

```typescript
// Получить reference узла
const ref = task.ref()

// ID узла в виде строки
const id = ref.description!

// Восстановить узел по ID
const task = this.$.$giper_baza_glob.Node(
    new $giper_baza_link(id),
    $my_task
)

// Peer ID (первая часть Lord ID)
const peer = $giper_baza_link_peer(ref)
```

### Паттерны работы с CRUS

#### Список с фильтрацией

```typescript
@$mol_mem
active_tasks() {
    return this.category().task_list()
        .filter(task => !task.completed())
}

@$mol_mem
completed_tasks() {
    return this.category().task_list()
        .filter(task => task.completed())
}
```

#### Сортировка

```typescript
@$mol_mem
sorted_tasks() {
    return this.category().task_list()
        .sort((a, b) => 
            Number(b.priority() - a.priority())
        )
}
```

#### Агрегация данных

```typescript
@$mol_mem
statistics() {
    const tasks = this.category().task_list()
    
    return {
        total: tasks.length,
        completed: tasks.filter(t => t.completed()).length,
        high_priority: tasks.filter(t => t.priority() > 5n).length,
    }
}
```

#### Навигация по графу

```typescript
// Категория содержит задачи
export class $my_category extends $giper_baza_entity.with({
    Task: $giper_baza_list_link_to(() => $my_task),
    Parent: $giper_baza_atom_ref_to(() => $my_category),
}) {
    
    // Получить родительскую категорию
    parent(next?: $my_category | null) {
        return this.Parent(next)?.remote(next) ?? null
    }
    
    // Получить все подкатегории
    @$mol_mem
    children() {
        // Здесь нужен индекс или обход всех категорий
        return this.all_categories().filter(
            cat => cat.parent() === this
        )
    }
    
}
```

### Интеграция с View.Tree

```tree
$my_task_card $mol_view
    task $my_task
    sub /
        <= Title $mol_string
            value? <=> title?
        <= Description $mol_textarea
            value? <=> description?
        <= Completed $mol_check
            checked? <=> completed?
        <= Priority $mol_number
            value? <=> priority_num?
```

```typescript
namespace $.$$ {
    export class $my_task_card extends $.$my_task_card {
        
        title(next?: string) {
            return this.task().title(next)
        }
        
        description(next?: string) {
            return this.task().Description(next)?.text(next) ?? ''
        }
        
        completed(next?: boolean) {
            return this.task().completed(next)
        }
        
        priority_num(next?: number) {
            const val = this.task().priority(
                next !== undefined ? BigInt(next) : undefined
            )
            return Number(val)
        }
        
    }
}
```

### Отладка и инспекция

```typescript
// Получить все Units в Land
task.land().units()

// Дамп структуры узла
console.log(task.toString())

// Проверить права доступа
task.land().self_rank()

// Статистика по Land
task.land().stats()
```

### Лучшие практики

1. **Используйте $giper_baza_entity** как базу для всех сущностей с названием
2. **Создавайте Home-класс** для корня данных пользователя
3. **Типизируйте ссылки** через `$giper_baza_atom_ref_to` и `$giper_baza_list_link_to`
4. **Мемоизируйте вычисления** на основе данных из CRUS
5. **Используйте `@$mol_action`** для операций изменения данных
6. **Не храните большие бинарники** напрямую - используйте `$giper_baza_atom_bin` для хешей
7. **Продумывайте уровни доступа** при создании сущностей
8. **Избегайте циклических ссылок** в графе данных
9. **Используйте `null` параметр** для получения/создания узла: `.Field(null)`

### Ссылки

- Документация CRUS: https://crus.hyoo.ru/
- Примеры приложений: [Private Budget](https://github.com/hyoo-ru/budget.hyoo.ru)

## Состояние и управление данными

### Локальное состояние компонента

```typescript
@$mol_mem
counter(next?: number): number {
    return next ?? 0
}

@$mol_action
increment() {
    this.counter(this.counter() + 1)
}
```

### Глобальное состояние

Для глобального состояния рекомендуется использовать CRUS (см. раздел выше). Однако для простых случаев можно использовать паттерн с отдельными классами состояния:

```typescript
class $my_app_state extends $mol_object {
    @$mol_mem
    static user(next?: User | null): User | null {
        return next ?? null
    }

    @$mol_action
    static login(credentials: LoginData) {
        // НЕ async/await! Пишем синхронно
        const response = this.$.$mol_fetch.json('/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        })
        // При первом вызове - suspend на промисе fetch
        // При повторном вызове - response уже содержит данные
        this.user(response)
        return response
    }
}
```

## Локализация

### Файлы локализации

```
component.view.locale=en.json
component.view.locale=ru.json
```

```json
{
    "greeting": "Hello",
    "save_button": "Save"
}
```

### Использование в коде

```tree
<= Greeting $mol_view
    sub /
        @ greeting
```

## Навигация и роутинг

$mol использует `$mol_state_arg` для управления URL и роутингом приложения. Это реактивная система, которая синхронизирует состояние приложения с URL.

### Основы роутинга

#### Чтение параметров URL

```typescript
namespace $.$$ {
    export class $my_app extends $.$my_app {
        
        // Получить параметр из URL
        @$mol_mem
        page_id() {
            return this.$.$mol_state_arg.value('page') ?? 'main'
        }
        
        // Получить несколько параметров
        @$mol_mem
        task_id() {
            return this.$.$mol_state_arg.value('task')
        }
        
    }
}
```

#### Установка параметров URL

```typescript
// Изменить один параметр
@$mol_action
go_to_page(page_id: string) {
    this.$.$mol_state_arg.value('page', page_id)
}

// Изменить несколько параметров сразу
@$mol_action
go_to_task(page_id: string, task_id: string) {
    this.$.$mol_state_arg.go({
        page: page_id,
        task: task_id
    })
}

// Удалить параметр (установить в null)
@$mol_action
close_task() {
    this.$.$mol_state_arg.go({ task: null })
}
```

### Использование $mol_book2 для навигации

`$mol_book2` - это универсальный адаптивный компонент для создания книжного UX с автоматическим управлением роутингом и навигацией.

#### Основные возможности $mol_book2

- **📱 Адаптивность** - автоматически подстраивается под размер экрана
- **🔗 Роутинг** - интегрирован с `$mol_state_arg` для URL навигации
- **📄 Многостраничность** - показывает несколько страниц одновременно на широких экранах
- **↔️ Плавные переходы** - smooth scroll между страницами
- **🍞 Breadcrumbs** - автоматическое формирование заголовка из вложенных страниц
- **📐 Placeholders** - боковые панели и дополнительный контент

#### Базовый пример $mol_book2

```tree
$my_app $mol_book2
	plugins /
		<= Theme $mol_theme_auto
	pages /
		<= Home_page $mol_page
			title \Home
			body / <= Home_content
		<= Tasks_page $mol_page
			title \Tasks
			body / <= Tasks_content
		<= Profile_page $mol_page
			title \Profile
			body / <= Profile_content
```

**Что происходит:**
- `pages /` - массив страниц, которые показываются слева направо
- На узких экранах видна только последняя страница
- На широких экранах видны несколько страниц одновременно
- Автоматический smooth scroll к активной странице

#### Динамическое формирование страниц

```typescript
namespace $.$$ {
    export class $my_app extends $.$my_app {
        
        // Формируем массив страниц динамически
        @$mol_mem
        pages() {
            const pages = [
                this.Home_page(),
            ]
            
            // Добавляем страницу задач если нужно
            const taskId = this.$.$mol_state_arg.value('task')
            if (taskId) {
                pages.push(this.Task_page())
            }
            
            return pages
        }
        
    }
}
```

#### Вложенные $mol_book2

`$mol_book2` может содержать другие `$mol_book2` для многоуровневой навигации:

```tree
$my_app $mol_book2
	pages /
		<= Main_book $mol_book2
			pages /
				<= Section1_page $mol_page
					title \Section 1
				<= Section2_page $mol_page
					title \Section 2
		<= Detail_book $mol_book2
			pages /
				<= Detail_page $mol_page
					title \Details
```

**Что происходит:**
- `pages_deep()` автоматически собирает все страницы рекурсивно
- `title()` формируется из всех вложенных страниц через ` | `
- `menu_title()` берёт заголовок первой страницы

#### Placeholders - боковые панели

```tree
$my_app $mol_book2
	Placeholder <= Side_panel $mol_view
		sub /
			<= Logo $mol_image
				uri \logo.png
			<= Menu_links $mol_list
				rows <= menu_rows
	pages /
		<= Content_page $mol_page
			title \Content
```

**Placeholders:**
- Отображаются **всегда**, независимо от активной страницы
- Обычно используются для боковых панелей, логотипов, меню
- Добавляются через `placeholders /` в View.Tree (если переопределяете)

### $mol_book2_catalog - книга с каталогом

`$mol_book2_catalog` - расширенная версия `$mol_book2` с встроенным меню-каталогом в боковой панели.

#### Основные особенности

- **📋 Меню-каталог** в левой панели со списком всех страниц
- **🔍 Фильтр** меню (автоматически появляется если страниц ≥ 10)
- **🔗 Роутинг через URL** - один параметр управляет активной страницей
- **📄 Spreads** - словарь страниц по ключам

#### Базовая структура

```tree
$my_app $mol_book2_catalog
	param \page
	spreads *
		home <= Home_page $mol_page
			title \Home
			body / <= Home_content
		tasks <= Tasks_page $mol_page
			title \Tasks
			body / <= Tasks_content
		profile <= Profile_page $mol_page
			title \Profile
			body / <= Profile_content
		settings <= Settings_page $mol_page
			title \Settings
```

**Ключевые свойства:**
- `param` - имя параметра URL (например, `page`)
- `spreads *` - словарь страниц, ключи используются в URL
- Меню формируется автоматически из ключей `spreads`

#### Как работает роутинг

```
URL: /?page=tasks
         ↓
spread() вернёт 'tasks'
         ↓
Spread('tasks') вернёт Tasks_page
         ↓
pages() = [Menu, Tasks_page]
```

#### TypeScript для $mol_book2_catalog

```typescript
namespace $.$$ {
    export class $my_app extends $.$my_app {
        
        // Переопределяем spreads для динамического содержимого
        @$mol_mem
        spreads() {
            return {
                '': this.Home_page(),     // Дефолтная страница (пустой ключ)
                'tasks': this.Tasks_page(),
                'profile': this.Profile_page(),
                'settings': this.Settings_page(),
            }
        }
        
        // Кастомизация заголовков в меню
        @$mol_mem_key
        spread_title(id: string) {
            switch(id) {
                case '': return 'Home'
                case 'tasks': return `Tasks (${this.tasks_count()})`
                case 'profile': return 'My Profile'
                case 'settings': return 'Settings'
                default: return id
            }
        }
        
    }
}
```

#### Вложенная навигация в catalog

```tree
$my_app $mol_book2_catalog
	param \section
	spreads *
		tasks <= Tasks_book $mol_book2_catalog
			param \task
			spreads <= tasks_spreads *
		profile <= Profile_page $mol_page
```

**URL примеры:**
- `/?section=tasks` - открыт раздел Tasks
- `/?section=tasks&task=123` - открыт раздел Tasks + конкретная задача 123
- `/?section=profile` - открыт профиль

#### Дефолтная страница

```tree
spreads *
	\ <= Home_page $mol_page   # Пустой ключ - дефолтная страница
		title \Welcome
	tasks <= Tasks_page
	profile <= Profile_page
```

**Или в TypeScript:**

```typescript
@$mol_mem
spreads() {
    return {
        '': this.Home_page(),          // Показывается когда param не задан
        'tasks': this.Tasks_page(),
        'profile': this.Profile_page(),
    }
}
```

#### Фильтр меню

```tree
$my_app $mol_book2_catalog
	menu_filter_enabled true  # Принудительно включить фильтр
	spreads *
		# ... много страниц
```

**Автоматическое поведение:**
- Фильтр появляется если `spread_ids().length >= 10`
- Фильтр ищет по `spread_title()` каждой страницы
- Регистронезависимый поиск

#### Кастомизация меню

```tree
$my_app $mol_book2_catalog
	menu_title \My Application
	menu_tools /
		<= Settings_button $mol_button_minor
			title \⚙
			click? <=> open_settings? null
	addon_tools /
		<= User_avatar $mol_image
			uri <= avatar_url \
```

**Структура меню:**
- `menu_title` - заголовок меню (по умолчанию берётся из первой страницы)
- `menu_tools /` - инструменты в шапке меню
- `addon_tools /` - дополнительные инструменты
- `menu_head /` - полностью кастомная шапка
- `menu_body /` - кастомное тело меню
- `menu_foot /` - подвал меню

#### Динамический список страниц

```typescript
namespace $.$$ {
    export class $my_app extends $.$my_app {
        
        @$mol_mem
        task_ids() {
            return this.person().task_list().map(t => 
                t.link().toString()!
            )
        }
        
        @$mol_mem
        spreads() {
            const spreads: Record<string, $mol_view> = {
                '': this.Home_page(),
            }
            
            // Динамически добавляем страницы задач
            for (const id of this.task_ids()) {
                spreads[id] = this.Task_page(id)
            }
            
            return spreads
        }
        
        @$mol_mem_key
        Task_page(id: string) {
            const page = new this.$.$mol_page()
            const task = this.task(id)
            
            page.title = () => task.title()
            page.body = () => [this.Task_content(id)]
            
            return page
        }
        
    }
}
```

#### Программная навигация

```typescript
// Открыть страницу
@$mol_action
open_tasks() {
    this.$.$mol_state_arg.value(this.param(), 'tasks')
}

// Закрыть текущую страницу (вернуться к дефолтной)
@$mol_action
close_current() {
    this.$.$mol_state_arg.value(this.param(), null)
}

// Открыть вложенную страницу
@$mol_action
open_task(task_id: string) {
    this.$.$mol_state_arg.go({
        section: 'tasks',
        task: task_id
    })
}
```

#### Кнопка закрытия страницы

```tree
$my_task_page $mol_page
	tools /
		<= Close_button $mol_link
			arg <= close_arg *
			hint \Close
			sub /
				<= Close_icon $mol_icon_close
```

```typescript
@$mol_mem
close_arg() {
    return { task: null }  // Убрать параметр task из URL
}
```

#### Сравнение $mol_book2 vs $mol_book2_catalog

| Особенность | $mol_book2 | $mol_book2_catalog |
|------------|------------|-------------------|
| **Меню** | Нет встроенного | Автоматическое меню в боковой панели |
| **Страницы** | Массив `pages /` | Словарь `spreads *` |
| **Роутинг** | Ручной через TypeScript | Автоматический через `param` |
| **Фильтр** | Нет | Есть (для списков >10) |
| **Использование** | Многостраничные wizards, dialogs | Приложения с каталогом/меню, документация |

#### Полный пример: Приложение с каталогом

```tree
$my_docs_app $mol_book2_catalog
	param \doc
	menu_title \Documentation
	
	Placeholder <= Logo_panel $mol_view
		sub /
			<= Logo $mol_image
				uri \logo.svg
			<= Version $mol_paragraph
				title \v1.0.0
	
	menu_tools /
		<= Search_button $mol_button_minor
			title \🔍
			click? <=> toggle_search? null
		<= Theme_switcher $mol_button_minor
			title \🌓
			click? <=> toggle_theme? null
	
	spreads *
		\ <= Welcome_page $mol_page
			title \Welcome
			body /
				<= Welcome_content $mol_text
					text <= welcome_text \
		
		getting-started <= GettingStarted_page $mol_page
			title \Getting Started
			
		components <= Components_book $mol_book2_catalog
			param \component
			menu_title \Components
			spreads <= components_spreads *
		
		api <= API_page $mol_page
			title \API Reference
		
		faq <= FAQ_page $mol_page
			title \FAQ
```

```typescript
namespace $.$$ {
    export class $my_docs_app extends $.$my_docs_app {
        
        @$mol_mem
        components_spreads() {
            return {
                'button': this.Button_doc_page(),
                'input': this.Input_doc_page(),
                'list': this.List_doc_page(),
                'table': this.Table_doc_page(),
            }
        }
        
        @$mol_mem_key
        Button_doc_page() {
            const page = new this.$.$mol_page()
            page.title = () => 'Button Component'
            page.body = () => [
                this.Button_description(),
                this.Button_demo(),
                this.Button_api(),
            ]
            return page
        }
        
    }
}
```

**URL примеры:**
- `/` - Welcome страница
- `/?doc=getting-started` - Getting Started
- `/?doc=components` - Список компонентов
- `/?doc=components&component=button` - Документация Button
- `/?doc=faq` - FAQ

### Лучшие практики для $mol_book2

1. **Используйте $mol_book2** для wizards, многостраничных форм, dialogs
2. **Используйте $mol_book2_catalog** для приложений с меню, документации, dashboards
3. **Давайте осмысленные ключи** в `spreads` - они будут в URL
4. **Используйте пустой ключ** `''` для дефолтной страницы в catalog
5. **Вкладывайте $mol_book2**  для многоуровневой навигации
6. **Переопределяйте `spread_title()`** для кастомных заголовков в меню
7. **Используйте Placeholder** для постоянных элементов (логотип, меню)
8. **Динамические spreads** формируйте в TypeScript для списков
9. **Фильтр меню** включается автоматически при >10 страницах

### Вложенная навигация

Для приложений с несколькими уровнями навигации:

```typescript
namespace $.$$ {
    export class $my_app extends $.$my_app {
        
        // Текущая страница из URL
        @$mol_mem
        current_page() {
            return this.$.$mol_state_arg.value('page') ?? 'tasks'
        }
        
        // Текущая задача из URL
        @$mol_mem
        current_task_id() {
            return this.$.$mol_state_arg.value('task')
        }
        
        // Получить объект задачи
        @$mol_mem
        current_task() {
            const id = this.current_task_id()
            if (!id) return null
            return this.task(id)
        }
        
        // Страницы с учётом вложенности
        @$mol_mem
        pages() {
            const pages = [
                this.Home_page(),
                this.Tasks_page(),
            ]
            
            // Добавить страницу задачи если выбрана
            const task = this.current_task()
            if (task) {
                pages.push(this.Task_page(task.id()))
            }
            
            return pages
        }
        
    }
}
```

### Ссылки с параметрами

Используйте `$mol_link` для навигационных ссылок:

```tree
$my_menu $mol_list
    rows /
        <= Home_link $mol_link
            arg * page \home
            title \Home
        <= Tasks_link $mol_link
            arg * page \tasks
            title \Tasks
        <= Profile_link $mol_link
            arg *
                page \profile
                section \settings
            title \Profile Settings
```

**Свойство `arg *`** - объект с параметрами URL, которые будут установлены при клике.

### Динамические ссылки в списках

```tree
$task_list $mol_list
    rows <= task_rows
```

```typescript
namespace $.$$ {
    export class $task_list extends $.$task_list {
        
        @$mol_mem
        task_ids() {
            return ['task-1', 'task-2', 'task-3']
        }
        
        @$mol_mem
        task_rows() {
            return this.task_ids().map(id => this.Task_link(id))
        }
        
        @$mol_mem_key
        Task_link(id: string) {
            const link = new this.$.$mol_link()
            link.title = () => `Task ${id}`
            link.arg = () => ({ task: id })
            return link
        }
        
    }
}
```

### Программная навигация

```typescript
// Переход на другую страницу
@$mol_action
open_task(task_id: string) {
    this.$.$mol_state_arg.go({
        page: 'tasks',
        task: task_id
    })
}

// Возврат назад (удалить последний параметр)
@$mol_action
go_back() {
    this.$.$mol_state_arg.go({ task: null })
}

// Полная замена URL
@$mol_action
reset_to_home() {
    this.$.$mol_state_arg.go({}, true) // второй параметр - replace
}
```

### Защита роутов

```typescript
@$mol_mem
current_page_component() {
    const page = this.current_page()
    
    // Проверка авторизации
    if (!this.is_authorized() && page !== 'login') {
        // Редирект на login
        this.$.$mol_state_arg.go({ page: 'login' })
        return this.Login_page()
    }
    
    return this.page(page)
}
```

### Сохранение состояния в URL

```typescript
// Сохранить фильтр поиска в URL
@$mol_mem
search_query(next?: string) {
    const current = this.$.$mol_state_arg.value('q')
    if (next !== undefined) {
        this.$.$mol_state_arg.value('q', next || null)
    }
    return current ?? ''
}

// Использование в компоненте
```tree
<= Search $mol_search
    query? <=> search_query?
```

### Паттерн: История навигации

```typescript
namespace $.$$ {
    export class $my_app extends $.$my_app {
        
        // Стек истории страниц
        @$mol_mem
        pages_stack(): string[] {
            const page = this.current_page()
            const task = this.current_task_id()
            
            const stack = [page]
            if (task) stack.push(task)
            
            return stack
        }
        
        // Breadcrumbs
        @$mol_mem
        breadcrumbs() {
            return this.pages_stack().map((id, index) =>
                this.Breadcrumb_link(id, index)
            )
        }
        
    }
}
```

### Лучшие практики роутинга

1. **Используйте осмысленные ключи** - `page`, `id`, `section` вместо `p`, `i`, `s`
2. **Синхронизируйте состояние с URL** - важное состояние должно быть в URL
3. **Не храните временное в URL** - модальные окна, тултипы
4. **Используйте `null` для удаления параметров** - `arg.go({ modal: null })`
5. **Валидируйте параметры** - проверяйте существование объектов по ID из URL
6. **Используйте $mol_book2** - он решает большинство задач навигации из коробки

## Атрибуты DOM

```tree
attr *
    ^
    id \my-component
    data-testid \component
    aria-label <= ariaLabel
```

## Плагины компонентов

```tree
plugins /
    <= Theme $mol_theme_auto
    <= Scroll $mol_scroll
    <= Keyboard $mol_keyboard
```

## Тестирование и аудит

- Тесты пишутся с использованием инструментов `$mol` (например, `$mol_test` и набора `$mol_assert_*`). В типовом проекте присутствуют артефакты `web.test.js` и `web.audit.js` для проверки работоспособности и простого аудита. См. руководство: [Раздел о тестировании](https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf).
- Рекомендуется покрывать мемоизированные вычисления и действия юнит-тестами; UI-сценарии — через интерактивные тесты/компонентные тесты.

### Структура и базовый юнит-тест

```typescript
namespace $ {
    $mol_test({
        'fullName combines first and last names'() {
            const view = new $mws_app_spec
            view.firstNameValue('John')
            view.lastNameValue('Doe')
            $mol_assert_equal(view.Name(), 'John Doe')
        },
    })
}
```

Часто используемые проверки:
- `$mol_assert_equal(actual, expected)` — строгая проверка равенства
- `$mol_assert_like(actual, pattern)` — «похоже на» (частичное соответствие по структуре)
- `$mol_assert_ok(condition)` — истинность условия
- `$mol_assert_fail(fn)` — функция должна выбросить исключение

### Асинхронные тесты и действия

```typescript
namespace $ {
    $mol_test({
        'save posts merged full name'() {
            const view = new $mws_app_spec
            view.firstNameValue('Jane')
            view.lastNameValue('Roe')

            // Имитация запроса: подменяем fetch на стаб
            const orig = view.$.$mol_fetch.json
            
            // Стаб возвращает данные синхронно или промис
            view.$.$mol_fetch.json = (url: string, init?: any) => {
                $mol_assert_equal(url, 'test.com')
                $mol_assert_like(JSON.parse(init!.body), { name: 'Jane Roe' })
                return { ok: true } // Можно вернуть синхронно для теста
            }

            try {
                // НЕ нужен await - если save() suspend, тест подождёт автоматически
                const result = view.save()
                $mol_assert_ok(result)
            } finally {
                view.$.$mol_fetch.json = orig
            }
        },
    })
}
```

Рекомендации:
- Побочные эффекты держите в `@$mol_action`
- В тестах подменяйте внешние вызовы (HTTP, таймеры) стабами/моками
- **Не используйте async/await** в тестах - fiber работает автоматически
- Стабы могут возвращать данные синхронно для упрощения тестов

### Компонентные тесты (UI)

Для тестов компонентов создавайте инстансы и работайте со свойствами/ивентами так же, как это делает View.Tree:

```typescript
namespace $ {
    $mol_test({
        'button click triggers save'() {
            const view = new $mws_app_spec
            let called = false
            const orig = view.save
            view.save = $mol_action(() => { called = true })
            view.Button().click(true)
            $mol_assert_ok(called)
            view.save = orig
        },
    })
}
```

Подсказки:
- Свойства с суффиксом `?` (например, `click?`) принимают `next` — передавайте событие напрямую.
- Для сложных деревьев формируйте/проверяйте подкомпоненты через соответствующие методы (`this.Child()`), которые генерируются из View.Tree.

### Организация и запуск

- Тестовые кейсы группируйте в `namespace $ { $mol_test({ ... }) }` рядом с тестируемым кодом либо в файлах `*.test.ts`.
- Запуск через `npm start` соберёт и `web.test.js`; откройте страницу тестов сборки (если предусмотрена) или подключите файлы тестов в окружении проекта.
- Для аудита (профилирование, размер, доступность) используйте `web.audit.js` и проектный скрипт аудита.

### Где размещать тесты (файлы)

- Размещайте тесты рядом с кодом модуля (co-location):
  - Юнит/интеграционные: `module.test.ts`
  - Тесты компонентов: `component.view.test.ts` или `component.test.ts`
  - Среда выполнения:
    - браузерные: `*.web.test.ts`
    - node-окружение: `*.node.test.ts`
- Для крупных наборов кейсов допустим выделенный каталог `test/` внутри домена (как в `mol/view/tree2/to/js/test/`).
- Бандлер MAM собирает единый артефакт тестов `web.test.js` (и при наличии — `node.test.js`), подключаемый окружением проекта.

## События

```tree
<= Button $mol_button
    click? <=> onClick? null
    keydown? <=> onKeyDown? null
```

## Примеры паттернов

### Форма с валидацией

```tree
$form $mol_view
    sub /
        <= EmailField $mol_string
            hint @ email_hint
            value? <=> email? ''
            type \email
        <= PasswordField $mol_string
            hint @ password_hint
            value? <=> password? ''
            type \password
        <= SubmitButton $mol_button_major
            title @ submit
            enabled <= formValid
            click? <=> submit? null
```

```typescript
@$mol_mem
formValid(): boolean {
    return this.emailValid() && this.passwordValid()
}

@$mol_mem
emailValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email())
}

@$mol_mem
passwordValid(): boolean {
    return this.password().length >= 8
}

@$mol_action
submit() {
    if (!this.formValid()) return

    // Отправка формы
}
```

### Список с виртуализацией

```tree
$list $mol_view
    sub /
        <= VirtualScroll $mol_scroll
            sub /
                <= Rows $mol_view
                    sub <= rowList
```

```typescript
@$mol_mem
rowList(): $mol_view[] {
    return this.items().map((item, index) =>
        this.Row(index)
    )
}

Row(index: number): $mol_view {
    const obj = new this.$.$mol_view()
    obj.sub = () => [this.itemText(index)]
    return obj
}
```

## Лучшие практики

1. **Используйте мемоизацию** для всех вычисляемых свойств
2. **Действия для побочных эффектов** - API вызовы, навигация
3. **Декларативные шаблоны** - описывайте что, а не как
4. **Композиция вместо наследования** - собирайте компоненты из меньших
5. **Однонаправленный поток данных** - данные текут сверху вниз
6. **Локализация** - все пользовательские строки в файлах локализации

7. **Минимизируйте импорты** — используйте доступ к зависимостям через `this.$.$module` вместо ручных `import`.
8. **Явно отделяйте побочные эффекты** — только внутри `@$mol_action`.
9. **Раскладывайте ответственность по компонентам** — маленькие мемоизированные свойства вместо «больших» методов.
10. **Используйте `.meta.tree`** для управления зависимостями (`pack`) и статическими файлами (`deploy`).
11. **Размещайте `pack` в корневом `.meta.tree`** для общих зависимостей всего проекта.
12. **Не создавайте `package.json` для каждого модуля** — один в корне MAM проекта достаточно.
13. **НЕ используйте `async/await`** в функциях с `@$mol_mem` и `@$mol_action` — пишите синхронно, fiber и suspend работают автоматически.
14. **Доверьтесь автоматике** — $mol сам покажет спиннеры загрузки и ошибки, не нужны обёртки.
15. **Используйте `$mol_wire_sync`** для интеграции с асинхронными библиотеками — оборачивайте их API один раз.
16. **Добавляйте деструкторы** к промисам с `AbortController` для корректной отмены запросов.
17. **Debounce через задержку** — просто добавьте `$mol_wait_timeout()` в начало функции вместо специальных библиотек.
18. **Используйте `$mol_form`** для простых форм (регистрация, логин) и `$mol_form_draft` для редактирования объектов.
19. **Валидация возвращает строку** — пустая строка `''` означает "валидно", непустая — текст ошибки.
20. **Async валидация работает автоматически** — просто вызывайте async API в `*_bid()`, suspend/resume сработают сами.

## Работа с формами: $mol_form и $mol_form_draft

$mol предоставляет два подхода к созданию форм: простые формы (`$mol_form`) для базовых сценариев и draft-формы (`$mol_form_draft`) для работы с моделями данных и отслеживания изменений.

### Базовая форма: $mol_form

Компонент `$mol_form` предоставляет основную функциональность форм:
- Автоматический сбор всех полей `$mol_form_field`
- Валидация через систему `bid` (сообщений об ошибках)
- Блокировка submit пока форма невалидна
- Обработка Ctrl+Enter для отправки
- Отображение результатов и статусов

#### Структура простой формы

**View.Tree:**
```tree
$my_signup_form $mol_form
	submit? <=> signup? null
	submit_allowed => signup_allowed
	body /
		<= Name_field $mol_form_field
			name \First Name
			bid <= name_bid \
			Content <= Name_control $mol_string
				hint \Jack
				value? <=> name? \
		<= Email_field $mol_form_field
			name \E-mail
			bid <= email_bid \
			Content <= Email_control $mol_string
				hint \name@domain.com
				value? <=> email? \
		<= Age_field $mol_form_field
			name \Age
			bid <= age_bid \
			Content <= Age_control $mol_number
				value? <=> age? 0
	buttons /
		<= Submit $mol_button_major
			title \Sign Up
			click? <=> signup? null
			enabled <= signup_allowed
		<= Result $mol_status
			message <= result? \
```

**TypeScript:**
```typescript
namespace $.$$ {
	export class $my_signup_form extends $.$my_signup_form {
		
		// Состояние полей через $mol_state_local
		name(next?: string) {
			return $mol_state_local.value(this.state_key('name'), next) || ''
		}
		
		// Валидация: возвращаем текст ошибки или пустую строку
		name_bid() {
			const value = this.name()
			
			if (!value) return 'Required'
			if (value.indexOf(' ') !== -1) return 'No spaces!'
			if (value.length < 3) return '3 or more letters'
			
			return ''
		}
		
		email(next?: string) {
			return $mol_state_local.value(this.state_key('email'), next) || ''
		}
		
		email_bid() {
			const value = this.email().trim()
			
			if (!value) return 'Required'
			
			const parts = value.split('@')
			if (parts.length < 2) return '@ is required'
			if (parts.length > 2) return 'At most one @'
			if (!parts[0]) return 'Username required'
			
			const domains = parts[1].split('.')
			if (domains.length < 2) return 'At least 2 level domain'
			if (!domains.every(Boolean)) return 'Dots can\'t be at edge'
			
			return ''
		}
		
		age(next?: number) {
			return $mol_state_local.value(this.state_key('age'), next) || 0
		}
		
		age_bid() {
			if (this.age() < 18) return '18+ only'
			return ''
		}
		
		// Обработчик отправки формы
		@$mol_action
		signup(next?: Event) {
			// Форма уже провалидирована, можно сохранять
			this.result(`Hello, ${this.name()} from ${this.email()}!`)
			
			// Здесь можно отправить данные на сервер
			// const response = $.$mol_fetch.json('/api/signup', {
			//     method: 'POST',
			//     body: JSON.stringify({
			//         name: this.name(),
			//         email: this.email(),
			//         age: this.age()
			//     })
			// })
		}
		
	}
}
```

#### Ключевые концепции $mol_form

**1. $mol_form_field - поле формы:**
- Расширяет `$mol_labeler` (метка + контент)
- Свойство `name` - метка поля
- Свойство `bid` - сообщение об ошибке (если есть)
- Свойство `Content` - контрол (input, select и т.д.)
- Свойство `bids` - массив ошибок, берется первая непустая

```tree
<= Email_field $mol_form_field
	name \E-mail
	bid <= email_bid \
	Content <= Email_control $mol_string
		value? <=> email? \
```

**2. Валидация через `*_bid()` методы:**
- Возвращают строку с ошибкой или пустую строку `''`
- Вызываются реактивно при изменении зависимостей
- Форма автоматически блокирует submit, если есть ошибки

```typescript
name_bid() {
	const value = this.name()
	if (!value) return 'Required'
	if (value.length < 3) return 'Too short'
	return '' // Валидно
}
```

**3. Автоматическая проверка валидности:**
- `$mol_form` автоматически собирает все `$mol_form_field` через `view_find()`
- `submit_allowed()` возвращает `true`, если все `bid()` пустые
- Submit кнопка автоматически блокируется

**4. Обработка submit:**
- По клику на кнопку или Ctrl+Enter
- Проверяет `submit_allowed()`
- Вызывает `save(event)` - переопределите этот метод
- Показывает результат или ошибку

**5. Группировка полей:**

```tree
<= Names $mol_form_group sub /
	<= Name_first_field $mol_form_field
		name \First Name
		bid <= name_first_bid \
		Content <= Name_first $mol_string
			value? <=> name_first? \
	<= Name_second_field $mol_form_field
		name \Second Name
		bid <= name_second_bid \
		Content <= Name_second $mol_string
			value? <=> name_second? \
```

### Draft форма: $mol_form_draft

`$mol_form_draft` - продвинутый компонент для работы с моделями данных:
- Работает с объектом-моделью
- Промежуточное состояние (draft) не меняет модель сразу
- Отслеживание изменений
- Кнопка Reset для отмены изменений
- Типизированные методы доступа к полям
- Автоматическое сохранение в модель при submit

#### Структура draft формы

**Модель данных:**
```typescript
// Создаем класс модели
$my_article $mol_object2
	title? \
	type? \
	content? \
	adult? false
	tags? /string
	categories? *
```

**View.Tree:**
```tree
$my_article_form $mol_form_draft
	model <= article $my_article
	submit? => publish?
	submit_allowed => publish_allowed
	changed => changed
	reset? => reset?
	
	# Эти свойства пробрасываются из $mol_form_draft
	value_str*? => value_str*?
	list_string*? => list_string*?
	dictionary_bool*? => dictionary_bool*?
	
	form_fields /
		<= Title_field $mol_form_field
			name \Title
			bids /
				<= bid_required*title
				<= bid_short*title
			Content <= Title $mol_string
				hint \How I spent the summer..
				value? <=> value_str*title?
		
		<= Type_field $mol_form_field
			name \Type
			bids /
				<= bid_required*type
			Content <= Type $mol_switch
				value? <=> value_str*type?
				options *
					article \Article
					news \News
					question \Question
		
		<= Adult_field $mol_form_field
			name \Adult only
			Content <= Adult $mol_switch
				value? <=> value_str*adult?
				options *
					false \No
					true \Yes
		
		<= Content_field $mol_form_field
			name \Content
			bids /
				<= bid_long*content
			Content <= Content $mol_textarea
				hint \Long long story..
				value? <=> value_str*content?
		
		<= Tags_field $mol_form_field
			name \Tags
			Content <= Tags $mol_select_list
				dictionary *
					tech \Tech
					life \Life
					travel \Travel
				value? <=> list_string*tags?
		
		<= Categories_field $mol_form_field
			name \Categories
			Content <= Categories $mol_check_list
				dictionary? <=> dictionary_bool*categories?
				options *
					programming \Programming
					design \Design
					marketing \Marketing
	
	# Можно динамически менять body
	body <= form_body /
		<= Title_field
		<= Type_field
		<= Adult_field
		<= Content_field
		<= Tags_field
		<= Categories_field
```

**TypeScript:**
```typescript
namespace $.$$ {
	
	export class $my_article_form extends $.$my_article_form {
		
		// Можно динамически формировать список полей
		@$mol_mem
		form_body() {
			return [
				this.Title_field(),
				this.Type_field(),
				this.Adult_field(),
				// Показываем Content только если выбран тип
				... this.value_str('type') ? [this.Content_field()] : [],
				this.Tags_field(),
				this.Categories_field(),
			]
		}
		
		// Валидация через @$mol_mem_key
		@$mol_mem_key
		bid_required(field: string) {
			return this.value_str(field) ? '' : 'Required'
		}
		
		@$mol_mem_key
		bid_short(field: string) {
			return this.value_str(field).length > 5 ? '' : '> 5 letters'
		}
		
		@$mol_mem_key
		bid_long(field: string) {
			return this.value_str(field).length > 100 ? '' : '> 100 letters'
		}
		
		@$mol_mem_key
		bid_swearing(field: string) {
			return /\bfuck/.test(this.value_str(field))
				? 'No swearing'
				: ''
		}
		
		// Обработчик успешной публикации
		@$mol_action
		publish(event?: Event) {
			// Изменения уже применены к модели через save()
			console.log('Published:', this.article())
			
			// Можно отправить на сервер
			// const response = $.$mol_fetch.json('/api/articles', {
			//     method: 'POST',
			//     body: JSON.stringify(this.article())
			// })
		}
		
	}
}
```

#### Ключевые концепции $mol_form_draft

**1. Модель данных:**
- Объект с методами `property(next?: value): value`
- Обычно расширяет `$mol_object2`
- Все свойства с `?` - двусторонние

```typescript
$my_article $mol_object2
	title? \
	content? \
	published? false
```

**2. Промежуточное состояние (draft):**
- Изменения сохраняются в `$mol_state_local`, не меняют модель
- `state()` - объект с измененными полями
- `changed` - true, если есть несохраненные изменения
- Кнопка Reset появляется при `changed === true`

**3. Типизированные методы доступа:**

```typescript
// Строки
value_str*title?  // this.value_str('title', next?)

// Числа
value_number*age?  // this.value_number('age', next?)

// Булевы
value_bool*published?  // this.value_bool('published', next?)

// Массивы строк
list_string*tags?  // this.list_string('tags', next?)

// Словари булевых
dictionary_bool*categories?  // this.dictionary_bool('categories', next?)
```

**4. Жизненный цикл draft формы:**

```
1. Загрузка: model.field() → value_str(field) → UI
                  ↓
2. Редактирование: UI → value_str(field, new) → state[field]
                  ↓
3. Отслеживание: value_changed(field) → changed === true
                  ↓
4a. Submit: save() → model.field(state[field]) → reset() → done()
                  ↓
4b. Reset: reset() → state = null → UI обновляется из model
```

**5. Автоматическое сохранение:**
- При submit вызывается `save()`
- `save()` применяет все изменения из `state` к `model`
- Нормализует типы (string → number, string → boolean)
- Очищает draft через `reset()`
- Вызывает `done(event)` - переопределите для пост-обработки

**6. Валидация через параметризованные методы:**

```typescript
@$mol_mem_key
bid_required(field: string) {
	return this.value_str(field) ? '' : 'Required'
}

// Использование в View.Tree:
bids /
	<= bid_required*title
	<= bid_required*email
```

**7. Отслеживание изменений:**

```typescript
// Проверить изменения конкретного поля
this.value_changed('title') // true/false

// Проверить общие изменения
this.changed() // true/false

// Показать кнопку Reset если есть изменения
buttons /
	<= Submit $mol_button_major
	<= Reset $mol_button_minor  // Автоматически скрывается если !changed
```

### Сравнение $mol_form и $mol_form_draft

| Особенность | $mol_form | $mol_form_draft |
|------------|-----------|-----------------|
| **Состояние** | Вручную через `$mol_state_local` | Автоматическое промежуточное состояние |
| **Модель** | Нет | Объект с методами |
| **Валидация** | `*_bid()` методы | `bid_*()` параметризованные методы |
| **Изменения** | Сохраняются сразу | Draft → save → модель |
| **Reset** | Вручную | Автоматическая кнопка Reset |
| **Типизация** | Вручную | `value_str`, `value_number`, etc. |
| **Использование** | Простые формы, регистрация | Редактирование объектов, статей |

### Частые сценарии работы с формами

#### Условное отображение полей

```typescript
@$mol_mem
form_body() {
	return [
		this.Type_field(),
		// Показываем Content только для статей
		... this.value_str('type') === 'article'
			? [this.Content_field()]
			: [],
		// Показываем Adult только если пользователь старше 18
		... this.value_number('age') >= 18
			? [this.Adult_field()]
			: [],
	]
}
```

#### Кросс-валидация (поля зависят друг от друга)

```typescript
@$mol_mem_key
password_bid(field: string) {
	const password = this.value_str('password')
	const confirm = this.value_str('password_confirm')
	
	if (field === 'password_confirm' && password !== confirm) {
		return 'Passwords must match'
	}
	
	return ''
}
```

#### Динамическая валидация с сервера

```typescript
@$mol_mem
username_bid() {
	const username = this.value_str('username')
	
	if (!username) return 'Required'
	if (username.length < 3) return 'Too short'
	
	// Проверка на сервере (suspend/resume)
	const available = $.$mol_fetch.json(`/api/check-username?name=${username}`)
	
	if (!available) return 'Username already taken'
	
	return ''
}
```

#### Загрузка файлов

```tree
<= Avatar_field $mol_form_field
	name \Avatar
	bid <= avatar_bid \
	Content <= Avatar_control $mol_attach
		items? <=> avatars? /string
```

```typescript
avatars(next?: string[]) {
	return $mol_state_local.value(this.state_key('avatars'), next) || []
}

avatar_bid() {
	const files = this.avatars()
	if (files.length === 0) return 'Please upload avatar'
	if (files.length > 1) return 'Only one file allowed'
	return ''
}
```

#### Автодополнение с debounce

```typescript
@$mol_mem
city_suggestions() {
	const query = this.value_str('city')
	
	if (query.length < 3) return []
	
	// Debounce через задержку
	$mol_wait_timeout(300)
	
	// Загрузка подсказок (suspend/resume)
	const suggestions = $.$mol_fetch.json(`/api/cities?q=${query}`)
	
	return suggestions
}
```

### Продвинутые паттерны

#### Составная форма с несколькими моделями

```tree
$my_order_form $mol_form_draft
	model <= order $my_order
	
	form_fields /
		<= Delivery_section $mol_form_group sub /
			<= Address_form $my_address_form
				model <= address* $my_address
		<= Payment_section $mol_form_group sub /
			<= Card_form $my_card_form
				model <= card* $my_card
```

#### Форма с вложенными массивами

```typescript
namespace $.$$ {
	export class $my_invoice_form extends $.$my_invoice_form {
		
		@$mol_mem
		items() {
			return this.invoice().items() || []
		}
		
		@$mol_mem
		form_body() {
			return [
				this.Client_field(),
				// Динамически создаем поля для каждого элемента
				... this.items().map((item, index) =>
					this.Item_row(index)
				),
				this.Add_item_button(),
			]
		}
		
	}
}
```

#### Async валидация с кешированием

```typescript
@$mol_mem
email_bid() {
	const email = this.value_str('email')
	
	if (!email) return 'Required'
	if (!email.includes('@')) return 'Invalid email'
	
	// Запрос кешируется через @$mol_mem
	// Повторные вызовы с тем же email не делают запрос
	const exists = $.$mol_fetch.json(`/api/check-email?email=${email}`)
	
	if (exists) return 'Email already registered'
	
	return ''
}
```

### Лучшие практики работы с формами

1. **Используйте `$mol_form`** для простых форм регистрации, логина, комментариев
2. **Используйте `$mol_form_draft`** для редактирования объектов, статей, профилей
3. **Возвращайте пустую строку** `''` из `*_bid()` если поле валидно
4. **Группируйте логически связанные поля** через `$mol_form_group`
5. **Используйте `@$mol_mem_key`** для параметризованной валидации в draft формах
6. **Не блокируйте UI** - валидация асинхронная, будет suspend/resume
7. **Добавляйте `hint`** в контролы для подсказок пользователю
8. **Используйте встроенные компоненты**: `$mol_string`, `$mol_textarea`, `$mol_number`, `$mol_switch`, `$mol_select`, `$mol_check_list`
9. **Отслеживайте `changed`** в draft формах для показа предупреждений о несохраненных изменениях
10. **Переопределяйте `form_body()`** для динамического формирования списка полей

### Доступные компоненты для форм

**Текстовые:**
- `$mol_string` - однострочный текст
- `$mol_textarea` - многострочный текст
- `$mol_number` - число

**Выбор:**
- `$mol_switch` - радио-кнопки (одно значение из нескольких)
- `$mol_select` - выпадающий список (одно значение)
- `$mol_select_list` - выпадающий список множественного выбора
- `$mol_check_list` - чекбоксы (несколько значений)

**Специальные:**
- `$mol_attach` - загрузка файлов
- `$mol_date` - выбор даты
- `$mol_portion` - слайдер

## Интеграция с внешними библиотеками

```typescript
@$mol_mem
chart(): ChartInstance {
    const ctx = this.canvas().domNode().getContext('2d')
    return new Chart(ctx, {
        type: 'line',
        data: this.chartData(),
        options: this.chartOptions()
    })
}
```

## Отладка

- Используйте `console.log` в мемоизациях для отслеживания пересчетов
- Проверяйте зависимости через `$mol_mem` декоратор
- Используйте браузерные инструменты разработчика для DOM

Дополнительно:
- Проверяйте сгенерированные файлы в `-view.tree/` и `-css/` — это помогает понять, как именно интерпретируется ваш View.Tree и почему свойство ведет себя так или иначе.
- Для поиска «паразитных» пересчетов следите, чтобы побочные эффекты не просачивались в `@$mol_mem`.

## Производительность

1. **Мемоизация** предотвращает лишние пересчеты
2. **Виртуализация** для больших списков
3. **Ленивая загрузка** компонентов
4. **Оптимизация реактивных зависимостей**

## Полный пример: TODO-приложение с CRUS

Давайте создадим полноценное TODO-приложение с использованием CRUS базы данных.

### Структура файлов

```
todo/
└── app/
    ├── index.html
    ├── app.view.tree
    ├── app.view.ts
    ├── app.locale=en.json
    └── task/
        ├── task.ts
        └── card/
            ├── card.view.tree
            └── card.view.ts
```

### 1. Модель данных (task/task.ts)

```typescript
namespace $ {
    
    // Модель задачи
    export class $todo_app_task extends $giper_baza_entity.with({
        // Title унаследовано от $giper_baza_entity
        Completed: $giper_baza_atom_bool,
        Priority: $giper_baza_atom_int,
        DueDate: $giper_baza_atom_time,
        Description: $giper_baza_text,
    }) {
        
        // Геттер/сеттер для завершённости
        completed(next?: boolean) {
            return this.Completed(next)?.val(next) ?? false
        }
        
        // Геттер/сеттер для приоритета
        priority(next?: bigint) {
            return this.Priority(next)?.val(next) ?? 0n
        }
        
        // Геттер/сеттер для даты
        due_date(next?: $mol_time_moment | null) {
            return this.DueDate(next)?.val(next) ?? null
        }
        
        // Геттер/сеттер для описания
        description(next?: string) {
            return this.Description(next)?.text(next) ?? ''
        }
        
    }
    
    // Модель списка задач (профиль пользователя)
    export class $todo_app_person extends $giper_baza_home.with({
        Task: $giper_baza_list_link_to(() => $todo_app_task),
    }) {
        
        // Получить все задачи
        @$mol_mem
        task_list() {
            return this.Task()?.remote_list() ?? []
        }
        
        // Создать новую задачу
        @$mol_action
        task_make() {
            const task = this.Task(null)!.make(null)
            task.title('New Task')
            task.completed(false)
            task.priority(1n)
            return task
        }
        
        // Удалить задачу
        task_visible(task: $todo_app_task, next?: boolean) {
            return this.Task(next)?.has(task.ref(), next) ?? false
        }
        
        // Статистика
        @$mol_mem
        stats() {
            const tasks = this.task_list()
            return {
                total: tasks.length,
                completed: tasks.filter(t => t.completed()).length,
                active: tasks.filter(t => !t.completed()).length,
            }
        }
        
    }
    
}
```

### 2. Карточка задачи (task/card/card.view.tree)

```tree
$todo_app_task_card $mol_list
	task $todo_app_task
	rows /
		<= Header $mol_row
			sub /
				<= Checkbox $mol_check
					checked? <=> completed?
				<= Title $mol_string
					value? <=> title?
					hint \Task title
				<= Delete $mol_button_minor
					title \×
					click? <=> delete? null
		<= Description_row $mol_row
			sub /
				<= Description $mol_textarea
					value? <=> description?
					hint \Description
		<= Meta_row $mol_row
			sub /
				<= Priority_label $mol_labeler
					title \Priority
					content /
						<= Priority $mol_number
							value? <=> priority_num?
				<= Date_label $mol_labeler
					title \Due Date
					content /
						<= DueDate $mol_date
							value? <=> due_date?
```

### 3. Логика карточки (task/card/card.view.ts)

```typescript
namespace $.$$ {
    
    export class $todo_app_task_card extends $.$todo_app_task_card {
        
        // Заголовок задачи
        title(next?: string) {
            return this.task().title(next)
        }
        
        // Завершённость
        completed(next?: boolean) {
            return this.task().completed(next)
        }
        
        // Описание
        description(next?: string) {
            return this.task().description(next)
        }
        
        // Приоритет (конвертация bigint <-> number)
        priority_num(next?: number) {
            const val = this.task().priority(
                next !== undefined ? BigInt(next) : undefined
            )
            return Number(val)
        }
        
        // Дата
        due_date(next?: $mol_time_moment | null) {
            return this.task().due_date(next)
        }
        
    }
    
}
```

### 4. Главное приложение (app.view.tree)

```tree
$todo_app $mol_book2
	plugins /
		<= Theme $mol_theme_auto
	pages /
		<= Main $mol_page
			title \TODO App
			tools /
				<= Add_button $mol_button_major
					title \+ New Task
					click? <=> add_task? null
				<= Stats $mol_paragraph
					title <= stats_text \
			head /
				<= Filter_tabs $mol_row
					sub /
						<= All_button $mol_button_minor
							title \All
							click? <=> show_all? null
						<= Active_button $mol_button_minor
							title \Active
							click? <=> show_active? null
						<= Completed_button $mol_button_minor
							title \Completed
							click? <=> show_completed? null
			body /
				<= Task_list $mol_list
					rows <= task_rows
```

### 5. Логика приложения (app.view.ts)

```typescript
namespace $.$$ {
    
    export class $todo_app extends $.$todo_app {
        
        // Доступ к базе данных
        @$mol_mem
        person() {
            return this.$.$giper_baza_glob.home($todo_app_person)
        }
        
        // Фильтр задач
        @$mol_mem
        filter(next?: string): string {
            const current = this.$.$mol_state_arg.value('filter')
            if (next !== undefined) {
                this.$.$mol_state_arg.value('filter', next)
            }
            return current ?? 'all'
        }
        
        // Все задачи
        @$mol_mem
        tasks() {
            return this.person().task_list()
        }
        
        // Отфильтрованные задачи
        @$mol_mem
        filtered_tasks() {
            const filter = this.filter()
            const tasks = this.tasks()
            
            switch(filter) {
                case 'active':
                    return tasks.filter(t => !t.completed())
                case 'completed':
                    return tasks.filter(t => t.completed())
                default:
                    return tasks
            }
        }
        
        // Ряды списка
        @$mol_mem
        task_rows() {
            return this.filtered_tasks().map(task =>
                this.Task_card(task.link().toString()!)
            )
        }
        
        // Карточка задачи
        @$mol_mem_key
        Task_card(id: string) {
            const task = this.$.$giper_baza_glob.Node(
                new $giper_baza_link(id),
                $todo_app_task
            )
            
            const card = new this.$.$todo_app_task_card()
            card.task = () => task
            card.delete = () => {
                this.person().task_visible(task, false)
            }
            
            return card
        }
        
        // Добавить задачу
        @$mol_action
        add_task() {
            const task = this.person().task_make()
            
            // Фокус на новую задачу
            this.$.$mol_wait_timeout(100)
            const card = this.Task_card(task.link().toString()!)
            // @ts-ignore
            card.Title().focused(true)
        }
        
        // Фильтры
        @$mol_action
        show_all() {
            this.filter('all')
        }
        
        @$mol_action
        show_active() {
            this.filter('active')
        }
        
        @$mol_action
        show_completed() {
            this.filter('completed')
        }
        
        // Статистика
        @$mol_mem
        stats_text() {
            const stats = this.person().stats()
            return `Total: ${stats.total} | Active: ${stats.active} | Completed: ${stats.completed}`
        }
        
    }
    
}
```

### 6. Локализация (app.locale=en.json)

```json
{
    "$todo_app_Main_title": "My Tasks",
    "$todo_app_Add_button_title": "+ New Task",
    "$todo_app_All_button_title": "All",
    "$todo_app_Active_button_title": "Active",
    "$todo_app_Completed_button_title": "Completed"
}
```

### 7. HTML точка входа (index.html)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
    <title>TODO App</title>
    <link href="web.css" rel="stylesheet"/>
</head>
<body>
    <div mol_view_root="$todo_app"></div>
    <script src="web.js" charset="utf-8"></script>
</body>
</html>
```

### 8. Запуск приложения

Из **корня MAM проекта**:

```bash
# Запустить dev-сервер
npm start
```

Откройте `http://localhost:9080/todo/app/-/test.html`

Для production сборки:

```bash
npm start todo/app
```

### Что получилось

- ✅ Создание, редактирование, удаление задач
- ✅ Отметка выполнения
- ✅ Приоритет и дата
- ✅ Фильтрация (все/активные/завершённые)
- ✅ Статистика
- ✅ Автосохранение в CRUS
- ✅ Оффлайн режим
- ✅ Синхронизация между вкладками

### Возможные улучшения

1. **Категории задач** - добавить группировку
2. **Поиск** - фильтр по тексту
3. **Сортировка** - по дате, приоритету
4. **Подзадачи** - вложенные задачи
5. **Шаринг** - предоставление доступа другим пользователям
6. **Drag & Drop** - перетаскивание для сортировки

## Частые проблемы и решения

### Проблема: Приложение не запускается

**Симптомы:** Ошибка при выполнении `npm start`

**Решения:**
1. Убедитесь что установлен Node.js (версия 18+)
2. Проверьте `package.json` - должен быть указан `mam`
3. Очистите кэш: `rm -rf node_modules && npm install`
4. Проверьте путь к приложению в команде `mam`

### Проблема: Компонент не отображается

**Симптомы:** Пустой экран или ошибки в консоли

**Решения:**
1. Проверьте `mol_view_root` в index.html - имя должно совпадать с компонентом
2. Убедитесь что имя компонента соответствует пути (`$my_app` → `my/app`)
3. Проверьте что файл `.view.tree` сохранён с табуляцией (не пробелами)
4. Посмотрите сгенерированный код в `/-view.tree/` на ошибки компиляции

### Проблема: Реактивность не работает

**Симптомы:** Изменение данных не обновляет UI

**Решения:**
1. Используйте `@$mol_mem` для всех геттеров
2. Изменяйте данные через сеттер: `this.value(newValue)`, а не присвоением
3. Убедитесь что изменяете значение внутри `@$mol_action`
4. Проверьте что не создаёте новые объекты в `@$mol_mem` каждый раз

### Проблема: Async/await не работает правильно

**Симптомы:** Функция с `async` не мемоизируется, данные не кэшируются, UI не обновляется

**Решение:**
❌ **Неправильно:**
```typescript
@$mol_mem
async loadData() {
    const data = await this.$.$mol_fetch.json('/api')
    return data
}
```

✅ **Правильно:**
```typescript
@$mol_mem
loadData() {
    // Пишем синхронно - БЕЗ async/await
    const data = this.$.$mol_fetch.json('/api')
    return data
}
```

**Почему:** $mol использует fiber и suspend. При встрече промиса функция автоматически приостанавливается и продолжает выполнение после resolve. Async/await ломает этот механизм.

### Проблема: CRUS данные не сохраняются

**Симптомы:** После перезагрузки данные пропадают

**Решения:**
1. Проверьте что используете `$giper_baza_glob.home()` для доступа к БД
2. Убедитесь что вызываете методы с `null` параметром: `.Field(null)`
3. Проверьте что изменения оборачиваются в `@$mol_action`
4. Откройте DevTools → Application → IndexedDB - данные должны быть там

### Проблема: Стили не применяются

**Симптомы:** Компоненты выглядят не так как ожидается

**Решения:**
1. Проверьте что `web.css` подключён в index.html
2. Используйте атрибутные селекторы: `[my_component]` вместо `.my_component`
3. Убедитесь что CSS файл сохранён в правильной кодировке (UTF-8)
4. Проверьте сгенерированный CSS в `/-css/`

### Проблема: TypeScript ошибки

**Симптомы:** Ошибки типов в `.view.ts`

**Решения:**
1. Убедитесь что расширяете сгенерированный класс: `extends $.$my_app`
2. Используйте `namespace $.$$` для локального кода
3. Для глобальных модулей используйте `namespace $`
4. Не импортируйте напрямую - используйте `this.$.$module`

### Проблема: Горячая перезагрузка не работает

**Симптомы:** Нужно обновлять страницу вручную

**Решения:**
1. Проверьте что dev-сервер запущен с параметром `dev=9080`
2. Убедитесь что открыта правильная страница с портом dev-сервера
3. Проверьте что нет ошибок компиляции в консоли

### Проблема: Компонент $mol_X не найден

**Симптомы:** Ошибка "Cannot find name '$mol_button'"

**Решения:**
1. Компоненты $mol доступны автоматически - не нужны импорты
2. Проверьте правильность написания имени компонента
3. Убедитесь что используете компонент в `.view.tree`, а не в `.ts`
4. MAM автоматически подтянет зависимости при компиляции

### Проблема: Внешний пакет не найден

**Симптомы:** Ошибка "Cannot find name '$apxu_component'"

**Решения:**
1. Добавьте пакет в корневой `.meta.tree`:
   ```tree
   pack apxu git \https://github.com/ApxuTechTop/apxu
   ```
2. Перезапустите dev-сервер
3. MAM автоматически клонирует репозиторий при первом обращении
4. Проверьте что директория пакета появилась в корне проекта

### Проблема: Форма не блокирует submit при ошибках

**Симптомы:** Кнопка Submit активна, хотя есть ошибки валидации

**Решения:**
1. Убедитесь что используете `$mol_form_field` для всех полей
2. Проверьте что методы `*_bid()` возвращают строку (не `undefined` или `null`)
3. Метод должен возвращать `''` (пустую строку) для валидного поля
4. Проверьте что поля находятся внутри `body` формы

❌ **Неправильно:**
```typescript
name_bid() {
    if (!this.name()) return // undefined!
}
```

✅ **Правильно:**
```typescript
name_bid() {
    if (!this.name()) return 'Required'
    return '' // Важно!
}
```

### Проблема: $mol_form_draft не сохраняет изменения в модель

**Симптомы:** После submit модель не обновляется

**Решения:**
1. Убедитесь что модель расширяет `$mol_object2`
2. Проверьте что свойства модели двусторонние (с `?`):
   ```tree
   $my_model $mol_object2
       title? \  // ← Двустороннее
   ```
3. Используйте типизированные методы: `value_str*field?`, `value_number*field?`
4. Не переопределяйте `save()` без вызова `super.save()`

### Проблема: Валидация "мигает" при вводе

**Симптомы:** Ошибка появляется и исчезает при каждом символе

**Решение:** Добавьте debounce через `$mol_wait_timeout()`:

```typescript
@$mol_mem
username_bid() {
    const username = this.value_str('username')
    
    if (!username) return 'Required'
    if (username.length < 3) return 'Too short'
    
    // Debounce 500ms перед проверкой на сервере
    $mol_wait_timeout(500)
    
    const available = $.$mol_fetch.json(`/api/check?name=${username}`)
    return available ? '' : 'Already taken'
}
```

### Проблема: $mol_form_draft показывает Reset всегда

**Симптомы:** Кнопка Reset видна даже без изменений

**Решения:**
1. Убедитесь что используете `<= Reset $mol_button_minor` (наследуется от $mol_form_draft)
2. Не переопределяйте `buttons()` без проверки `this.changed()`
3. Проверьте что `state()` правильно сохраняется в `$mol_state_local`

✅ **Правильно:**
```typescript
@$mol_mem
override buttons() {
    return [
        this.Submit(),
        ... this.changed() ? [this.Reset()] : [],  // ← Условие
        ... this.result() ? [this.Result()] : [],
    ]
}
```

### Проблема: Поля формы не связаны с $mol_form_field

**Симптомы:** Валидация не работает, форма не находит поля

**Решения:**
1. Контролы должны быть внутри `Content` поля:
   ```tree
   <= Name_field $mol_form_field
       name \Name
       bid <= name_bid \
       Content <= Name_control $mol_string  # ← Внутри Content!
           value? <=> name? \
   ```
2. Поля должны находиться в `body` или `form_fields` формы
3. Не создавайте кастомные обёртки между `$mol_form` и `$mol_form_field`

### Проблема: Async валидация блокирует весь UI

**Симптомы:** При вводе приложение "зависает"

**Решение:** Используйте debounce и правильную мемоизацию:

```typescript
@$mol_mem
email_bid() {
    const email = this.value_str('email')
    
    // Быстрые проверки сразу
    if (!email) return 'Required'
    if (!email.includes('@')) return 'Invalid'
    
    // Debounce перед сетевым запросом
    $mol_wait_timeout(500)
    
    // Запрос кешируется через @$mol_mem
    const exists = $.$mol_fetch.json(`/api/check-email?email=${email}`)
    return exists ? 'Already registered' : ''
}
```

**Почему работает:**
- `@$mol_mem` кеширует результат по `email`
- Быстрые проверки не блокируют UI
- `$mol_wait_timeout()` даёт debounce
- Suspend происходит только на сетевом запросе

### Полезные команды для отладки

```bash
# Полная пересборка
rm -rf my/app/-
npm start

# Просмотр сгенерированного кода
cat my/app/-view.tree/app.view.tree.js

# Просмотр сгенерированных стилей
cat my/app/-css/app.view.css

# Проверка структуры модулей
ls -R my/
```

## Советы по разработке

1. **Начинайте с простого** - сначала структура в .view.tree, потом логика в .ts
2. **Используйте DevTools** - React DevTools не нужны, просто Chrome DevTools
3. **Проверяйте консоль** - ошибки компиляции View.Tree видны сразу
4. **Изучайте исходники $mol** - `node_modules/mam/mol/` содержит примеры всех компонентов
5. **Тестируйте в процессе** - hot-reload позволяет видеть изменения мгновенно

Эта спецификация охватывает основные аспекты разработки приложений с использованием $mol и MAM. Для более глубокого понимания рекомендуется изучить исходный код примеров и документацию на сайте https://mol.hyoo.ru/

## Ссылки

- Документация: [Подробно о MAM](https://mol.hyoo.ru/#!section=docs/=u3t8nj_4kinwo)
