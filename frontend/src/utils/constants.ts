// Константы приложения
export const APP_CONFIG = {
  API_BASE_URL: "https://fakestoreapi.com",
  API_TIMEOUT: 10000,
  ITEMS_PER_PAGE: 20,
  DEBOUNCE_DELAY: 300,
} as const;

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Ошибка сети. Проверьте подключение к интернету.",
  SERVER_ERROR: "Ошибка сервера. Попробуйте позже.",
  VALIDATION_ERROR: "Проверьте правильность заполнения полей.",
  UNKNOWN_ERROR: "Произошла неизвестная ошибка.",
  PRODUCT_NOT_FOUND: "Товар не найден.",
  FAILED_TO_LOAD: "Не удалось загрузить данные.",
  FAILED_TO_SAVE: "Не удалось сохранить данные.",
  FAILED_TO_DELETE: "Не удалось удалить данные.",
} as const;

// Сообщения об успехе
export const SUCCESS_MESSAGES = {
  PRODUCT_CREATED: "Товар успешно создан",
  PRODUCT_UPDATED: "Товар успешно обновлен",
  PRODUCT_DELETED: "Товар успешно удален",
} as const;

// Валидация
export const VALIDATION_RULES = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MIN_LENGTH: 10,
  DESCRIPTION_MAX_LENGTH: 500,
  PRICE_MIN: 0.01,
  PRICE_MAX: 999999.99,
  IMAGE_URL_PATTERN: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
} as const;

// Сортировка
export const SORT_OPTIONS = {
  PRICE_ASC: { field: "price", order: "asc", label: "Цена: по возрастанию" },
  PRICE_DESC: { field: "price", order: "desc", label: "Цена: по убыванию" },
  RATING_ASC: {
    field: "rating",
    order: "asc",
    label: "Рейтинг: по возрастанию",
  },
  RATING_DESC: {
    field: "rating",
    order: "desc",
    label: "Рейтинг: по убыванию",
  },
} as const;

// Категории товаров (заглушка, если API недоступно)
export const FALLBACK_CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
] as const;
