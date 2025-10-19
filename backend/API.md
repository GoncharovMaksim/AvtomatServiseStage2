# Product Manager API Documentation

## Обзор

API для управления товарами с полным набором CRUD операций.

**Base URL:** `http://localhost:5000/api`

## Endpoints

### Товары

#### GET /products

Получить список всех товаров

**Response:**

```json
[
  {
    "id": 1,
    "title": "iPhone 15 Pro",
    "price": 999.99,
    "description": "Новейший смартфон Apple...",
    "category": "electronics",
    "image": "https://images.unsplash.com/...",
    "rating": {
      "rate": 4.8,
      "count": 120
    }
  }
]
```

#### GET /products/:id

Получить товар по ID

**Parameters:**

- `id` (integer) - ID товара

**Response:**

```json
{
  "id": 1,
  "title": "iPhone 15 Pro",
  "price": 999.99,
  "description": "Новейший смартфон Apple...",
  "category": "electronics",
  "image": "https://images.unsplash.com/...",
  "rating": {
    "rate": 4.8,
    "count": 120
  }
}
```

#### POST /products

Создать новый товар

**Request Body:**

```json
{
  "title": "Новый товар",
  "price": 99.99,
  "description": "Описание товара",
  "category": "electronics",
  "image": "https://example.com/image.jpg",
  "rating": {
    "rate": 4.5,
    "count": 10
  }
}
```

**Response:**

```json
{
  "message": "Товар успешно создан",
  "product": {
    "id": 11,
    "title": "Новый товар",
    "price": 99.99,
    "description": "Описание товара",
    "category": "electronics",
    "image": "https://example.com/image.jpg",
    "rating": {
      "rate": 4.5,
      "count": 10
    }
  }
}
```

#### PUT /products/:id

Обновить товар

**Parameters:**

- `id` (integer) - ID товара

**Request Body:** (все поля опциональны)

```json
{
  "title": "Обновленное название",
  "price": 149.99,
  "description": "Обновленное описание"
}
```

**Response:**

```json
{
  "message": "Товар успешно обновлен",
  "product": {
    "id": 1,
    "title": "Обновленное название",
    "price": 149.99,
    "description": "Обновленное описание",
    "category": "electronics",
    "image": "https://images.unsplash.com/...",
    "rating": {
      "rate": 4.8,
      "count": 120
    }
  }
}
```

#### DELETE /products/:id

Удалить товар

**Parameters:**

- `id` (integer) - ID товара

**Response:**

```json
{
  "message": "Товар успешно удален",
  "id": 1
}
```

### Категории

#### GET /products/categories

Получить список всех категорий

**Response:**

```json
["electronics", "men's clothing", "women's clothing", "jewelery"]
```

## Коды ошибок

- `400` - Ошибка валидации
- `404` - Ресурс не найден
- `500` - Внутренняя ошибка сервера

## Валидация

### Создание товара

- `title`: 3-100 символов
- `price`: 0.01-999999.99
- `description`: 10-500 символов
- `category`: обязательное поле
- `image`: валидный URL
- `rating.rate`: 0-5 (опционально)
- `rating.count`: неотрицательное число (опционально)

### Обновление товара

Все поля опциональны, но если указаны, должны соответствовать правилам валидации.

## Примеры использования

### cURL

```bash
# Получить все товары
curl http://localhost:5000/api/products

# Создать товар
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Новый товар",
    "price": 99.99,
    "description": "Описание товара",
    "category": "electronics",
    "image": "https://example.com/image.jpg"
  }'

# Обновить товар
curl -X PUT http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 149.99}'

# Удалить товар
curl -X DELETE http://localhost:5000/api/products/1
```

### JavaScript (fetch)

```javascript
// Получить все товары
const products = await fetch("http://localhost:5000/api/products").then((res) =>
  res.json()
);

// Создать товар
const newProduct = await fetch("http://localhost:5000/api/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Новый товар",
    price: 99.99,
    description: "Описание товара",
    category: "electronics",
    image: "https://example.com/image.jpg",
  }),
}).then((res) => res.json());
```

## Health Check

#### GET /api/health

Проверить состояние API

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 3600,
  "environment": "development"
}
```
