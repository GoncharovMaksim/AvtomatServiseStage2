import { body, param } from "express-validator";

export const validateProduct = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Название должно содержать от 3 до 100 символов"),

  body("price")
    .isFloat({ min: 0.01, max: 999999.99 })
    .withMessage("Цена должна быть числом от 0.01 до 999999.99"),

  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Описание должно содержать от 10 до 500 символов"),

  body("category").trim().notEmpty().withMessage("Категория обязательна"),

  body("image").isURL().withMessage("URL изображения должен быть валидным"),

  body("rating.rate")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Рейтинг должен быть от 0 до 5"),

  body("rating.count")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Количество отзывов должно быть неотрицательным числом"),
];

export const validateProductUpdate = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Название должно содержать от 3 до 100 символов"),

  body("price")
    .optional()
    .isFloat({ min: 0.01, max: 999999.99 })
    .withMessage("Цена должна быть числом от 0.01 до 999999.99"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Описание должно содержать от 10 до 500 символов"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Категория не может быть пустой"),

  body("image")
    .optional()
    .isURL()
    .withMessage("URL изображения должен быть валидным"),

  body("rating.rate")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Рейтинг должен быть от 0 до 5"),

  body("rating.count")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Количество отзывов должно быть неотрицательным числом"),
];

export const validateId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("ID должен быть положительным целым числом"),
];
