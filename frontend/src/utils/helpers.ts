// Утилитарные функции
import { VALIDATION_RULES } from "./constants";

// Форматирование цены
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
};

// Форматирование рейтинга
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// Обрезка текста
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// Валидация URL изображения
export const isValidImageUrl = (url: string): boolean => {
  return VALIDATION_RULES.IMAGE_URL_PATTERN.test(url);
};

// Валидация email
export const isValidEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Дебаунс функция
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Генерация уникального ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Проверка на мобильное устройство
export const isMobile = (): boolean => {
  return window.innerWidth <= 768;
};

// Локальное хранилище с обработкой ошибок
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Ошибка сохранения в localStorage:", error);
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Ошибка удаления из localStorage:", error);
    }
  },
};

// Класс для обработки ошибок API
export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

// Функция для обработки ошибок API
export const handleApiError = (error: any): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error.response) {
    // Ошибка от сервера
    const status = error.response.status;
    if (status >= 500) {
      return "Ошибка сервера. Попробуйте позже.";
    }
    if (status === 404) {
      return "Ресурс не найден.";
    }
    if (status === 403) {
      return "Доступ запрещен.";
    }
    if (status === 401) {
      return "Требуется авторизация.";
    }
    return "Ошибка при выполнении запроса.";
  }

  if (error.request) {
    // Ошибка сети
    return "Ошибка сети. Проверьте подключение к интернету.";
  }

  // Другая ошибка
  return "Произошла неизвестная ошибка.";
};
