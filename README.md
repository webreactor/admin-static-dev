Подготовка к сборке
==============

Установка менеджеров
--------------

Для сборки проекта необходимы NodeJS и npm (https://docs.npmjs.com/getting-started/installing-node), bower (http://bower.io/#install-bower) и gulp (https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).

Для простоты использования bower и gulp лучше устанавливать глобально:

```
sudo npm install -g gulp bower
```

Обновление зависимостей
--------------

В корневой папке проекта выполняем:

```
npm update
bower update
```

Использование менеджеров зависимостей
==============

NPM
--------------

Через менеджер npm подключаем преимущественно утилиты, необходимые для сборки и отладки проекта (gulp, компилятор less, browser-sync и т.д.).

Необходимые зависимости (отсюда: https://www.npmjs.com/) добавляются в секцию `dependencies` в файле `package.json`. После редактирования файла необходимо выполнить `npm update`.

Bower
--------------

Bower используем для подключения всех необходимых фронтенд-зависимостей, таких как jQuery, Font Awesome, jGrowl и т.д.

Подключать библиотеки можно из каталога bower (http://bower.io/search/) либо напрямую из git/svn репозитория. Зависимости добавляются в секцию `dependencies` в файле `bower.json`. После редактирования файла необходимо выполнить `bower update`.

Структура проекта
==============

```
assets — статика в сыром виде
    fonts — шрифты
    images — изображения
    scripts — js-скрипты
        components — отдельные части приложения (на текущий момент только компоненты из Bootstrap 3)
        pages — скрипты отдельных страниц
        app.js
    styles — Less-стили
        components — отдельные части стилей приложения (таблицы, формы, кнопки, слайдеры, пагинаторы и т.д.).
            fonts — стили используемых шрифтов
            mixins — все используемые миксины должны храниться в этой папке
        pages — стили отдельных страниц
        vendor — подключение стилей (less или чистый css) зависимостей, установленных через bower или в папку assets/vendor. Все правки стилей данных зависимостей должны быть в том же файле, в котором происходит импорт.
    templates — временная папка с jade-шаблонами
    vendor — в эту папку копируем любые фронтенд-зависимости, которые невозможно установить через bower (к примеру, библиотеки нет ни в одном публичном репозитории, только zip-архив на официальном сайте).
bower_components — зависимости, установленные через bower
node_modules — зависимости, установленные через npm
web — подготовленная к продакшену статика (скрипты, стили, шрифты, изображения).
    css
    fonts
    img
    js
```

Сборка
==============

Выполняется командой `gulp build` (или просто `gulp`). Gulp автоматически скомпилирует все less-стили, минифицирует стили и скрипты и соберет в нужные файлы, скопирует все необходимые изображения и шрифты в публичную директорию. Подробности в файле `gulpfile.js`.

Очистить скомпилированную статику в папке `web` можно командой `gulp clean`.

Используемые библиотеки
==============

* Normalize.css (http://necolas.github.io/normalize.css/)
* Twitter Bootstrap 3 (http://getbootstrap.com/) — фронтенд-фреймворк. Вырезана адаптивность, отключены неиспользуемые компоненты.
* Font Awesome 4.4 (http://fontawesome.io/) — красивые векторные иконки.
* jQuery 1.9 (http://jquery.com/).
* jGrowl (https://github.com/stanlemon/jGrowl) — всплывающие уведомления (примеры использования смотреть в `assets/scripts/app.js`).
* Select2 (http://select2.github.io/) — интерактивные select'ы.
* Moment.js (http://momentjs.com/) — js-библиотека для работы с датами (зависимость Date Range Picker).
* Date Range Picker (http://www.daterangepicker.com/) — интерактивный выбор даты (одиночной или диапазона дат, со временем и без).
* Summernote (http://summernote.org/) — простой WYSIWYG-редактор.
* Fine Uploader (http://fineuploader.com/) — продвинутый загрузчик файлов.
* Font Awesome Bootstrap Checkboxes & Radios (https://github.com/flatlogic/awesome-bootstrap-checkbox) - красивые чекбоксы и радио-кнопки.
* Bootstrap Tree View (jonmiles/bootstrap-treeview).