## Как взаимодействовать с ботом
Взаимодействие WebApp с ботом происходит посредством Telegram WebApp API, которое подключается как скирпт в
`public/index.html`. Документация к API находится по ссылке https://core.telegram.org/bots/webapps#initializing-web-apps.
Для запуска dev сервера нужно использовать скрипт `start:web`. Telgram API находится по адресу
https://core.telegram.org/bots/api

Помимо WebApp нужен сервер для работы самого бота. Он находится в этом же репозитории в папке `bot`.
Для этого используется библиотека <b>Telegraf</b> (гитхаб https://github.com/telegraf/telegraf). Чтобы бот
отвечал на команды сервер обязательно нужно запустить, для этого есть скрипт `start:bot`.

## Деплой WebAPP
Для деплоя бота используется сервис <b>Netlify</b>. Достаточно просто запушить результат работы в репозиторий
https://gitlab.com/noorsoft-vrn/simple-it-tg-bot в ветку `master`
