## Как взаимодействовать с ботом
Взаимодействие WebApp с ботом происходит посредством Telegram WebApp API, которое подключается как скирпт в
`public/index.html`. Документация к API находится по ссылке https://core.telegram.org/bots/webapps#initializing-web-apps.
Для запуска dev сервера нужно использовать скрипт `start:web` 

Помимо WebApp нужен сервер для работы самого бота. Он находится в этом же репозитории в папке `bot`.
Для этого используется библиотека <b>Telegraf</b> (гитхаб https://github.com/telegraf/telegraf), чтобы бот
отвечал на команды его обязательно нужно запустить, для этого есть скрипт `start:bot`.

## Деплой WebAPP
Для деплоя бота используется сервис <b>Netlify</b>, достаточно просто запушить результат работы в репозиторий
https://gitlab.com/noorsoft-vrn/simple-it-tg-bot в ветку `master`
