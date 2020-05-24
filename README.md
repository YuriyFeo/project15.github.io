# Проектная работа 15
### Версия 1.0.0
## Яндекс-Практика

# yuriyfeo.cf - обратиться к серверу по домену

# 84.201.133.248 - обратиться к серверу по IP-адресу

<https://github.com/YuriyFeo/project15.github.io.git>

Самостоятельная практическая работа для улучшение навыков программирования. 

## При запросах:

# POST/signup - создается пользователь, для отправки обязательные поля: name, about, avatar, email, password 

# POST/signin - авторизация пользователя, для авторизации необходимо ввести email, password

# GET/users - выводится JSON список пользователей 

# GET/users/id - выводится JSON объек конктретного юзера, если юзер не найден выводится ошибка 

# GET/cards - выводится JSON список всех карточек 

# POST/cards - создается карточка, для отправки обязательные поля: name, link 

# DELETE/cards/:cardId - удаление собственных карточек, пользователь не может удалить чужую карточку.
