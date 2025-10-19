# 🚀 Быстрый старт Fullstack приложения

## Предварительные требования

- Node.js 18+
- npm 9+

## Установка и запуск

### 1. Установка зависимостей

```bash
# Установить все зависимости (корень, фронтенд, бэкенд)
npm run install:all
```

### 2. Инициализация базы данных

```bash
# Создать базу данных и заполнить тестовыми данными
npm run init:db
```

### 3. Запуск приложения

#### Вариант 1: Запуск всего приложения сразу

```bash
npm run dev
```

#### Вариант 2: Запуск компонентов отдельно

**Терминал 1 - Бэкенд:**

```bash
npm run dev:backend
```

**Терминал 2 - Фронтенд:**

```bash
npm run dev:frontend
```

## Доступ к приложению

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **API Health Check:** http://localhost:5000/api/health

## Структура проекта

```
AvtomatServise/
├── frontend/          # React приложение
├── backend/           # Node.js API
├── package.json       # Корневые скрипты
└── README.md         # Полная документация
```

## Полезные команды

```bash
# Установка всех зависимостей
npm run install:all

# Инициализация базы данных
npm run init:db

# Запуск в режиме разработки
npm run dev

# Запуск только фронтенда
npm run dev:frontend

# Запуск только бэкенда
npm run dev:backend

# Сборка фронтенда
npm run build

# Проверка кода
npm run lint
```

## Возможные проблемы

### Порт уже используется

```bash
# Остановить все процессы Node.js
taskkill /F /IM node.exe

# Или найти и остановить конкретный процесс
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Ошибки базы данных

```bash
# Пересоздать базу данных
cd backend
rm -rf database/
npm run init-db
npm run seed
```

### Проблемы с зависимостями

```bash
# Очистить кэш и переустановить
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## API Endpoints

- `GET /api/products` - все товары
- `GET /api/products/:id` - товар по ID
- `POST /api/products` - создать товар
- `PUT /api/products/:id` - обновить товар
- `DELETE /api/products/:id` - удалить товар
- `GET /api/products/categories` - категории
- `GET /api/health` - статус API

## Тестирование API

```bash
# Проверить статус API
curl http://localhost:5000/api/health

# Получить все товары
curl http://localhost:5000/api/products

# Создать товар
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","price":99.99,"description":"Test description","category":"electronics","image":"https://example.com/image.jpg"}'
```

## Остановка приложения

Нажмите `Ctrl+C` в терминалах или выполните:

```bash
taskkill /F /IM node.exe
```
