import Product from "../models/Product.js";
import { validationResult } from "express-validator";

const productModel = new Product();

// Инициализация базы данных
await productModel.connect();
await productModel.init();

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAll();
    res.json(products);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    res.status(500).json({
      error: "Ошибка сервера при получении товаров",
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.getById(parseInt(id));

    if (!product) {
      return res.status(404).json({
        error: "Товар не найден",
        message: `Товар с ID ${id} не существует`,
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Ошибка при получении товара:", error);
    res.status(500).json({
      error: "Ошибка сервера при получении товара",
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    // Проверка валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Ошибка валидации",
        details: errors.array(),
      });
    }

    const productData = req.body;
    const newProduct = await productModel.create(productData);

    res.status(201).json({
      message: "Товар успешно создан",
      product: newProduct,
    });
  } catch (error) {
    console.error("Ошибка при создании товара:", error);
    res.status(500).json({
      error: "Ошибка сервера при создании товара",
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    // Проверка валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Ошибка валидации",
        details: errors.array(),
      });
    }

    const { id } = req.params;
    const productData = req.body;

    const updatedProduct = await productModel.update(parseInt(id), productData);

    if (!updatedProduct) {
      return res.status(404).json({
        error: "Товар не найден",
        message: `Товар с ID ${id} не существует`,
      });
    }

    res.json({
      message: "Товар успешно обновлен",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Ошибка при обновлении товара:", error);
    res.status(500).json({
      error: "Ошибка сервера при обновлении товара",
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productModel.delete(parseInt(id));

    if (!deleted) {
      return res.status(404).json({
        error: "Товар не найден",
        message: `Товар с ID ${id} не существует`,
      });
    }

    res.json({
      message: "Товар успешно удален",
      id: parseInt(id),
    });
  } catch (error) {
    console.error("Ошибка при удалении товара:", error);
    res.status(500).json({
      error: "Ошибка сервера при удалении товара",
      message: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await productModel.getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    res.status(500).json({
      error: "Ошибка сервера при получении категорий",
      message: error.message,
    });
  }
};
