# Платформа онлайн-курсов, которая поддерживает регистрацию/вход пользователей, управление курсами, загрузку изображений, избранное и т.д.

## Стек технологий:

1)Node.js, Express

2)TypeScript

3)MongoDB, Mongoose

4)JWT для авторизации

5)Multer + Sharp 

6)bcrypt


## Установка и запуск
1) Клоинруйте репозиторий:
   
   ```git clone <repository-url>```
   
   ```cd <repository-directory>```
2) Установите зависимости:
   
     ``` yarn install```
  
3) Создайте файл .env:

   ```MONGO_URI=your_mongodb_connection_string```
   
     ```JWT_SECRET=your_jwt_secret_key```

### Аутентификация

POST /api/auth/signup - Регистрация нового пользователя

POST /api/auth/signin - Вход для существующего пользователя

### Пользователь

GET /api/user/me - Получить профиль аутентифицированного пользователя

DELETE /api/user/me - Удалить аутентифицированного пользователя

### Курсы

GET /api/courses - Получить список курсов 

GET /api/courses/:id - Получить курс по ID

POST /api/courses - Создать новый курс 

PUT /api/courses/:id - Обновить курс по ID 

DELETE /api/courses/:id - Удалить курс по ID 

### Избранные

POST /api/favorites - Добавить курс в избранное 

DELETE /api/favorites - Удалить курс из избранного 

### Загрузка

POST /api/upload - Загрузить изображение (обрабатывает изображение и добавляет водяной знак)

### Ping


GET /api/ping - Простая конечная точка для проверки работы сервера
