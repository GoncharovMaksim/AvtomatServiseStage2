import axios from "axios";
import {
  Product,
  CreateProductData,
  UpdateProductData,
} from "../types/product";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productService = {
  // Получить все товары
  async getProducts(): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>("/products");
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении товаров:", error);
      throw new Error("Не удалось загрузить товары");
    }
  },

  // Получить товар по ID
  async getProduct(id: number): Promise<Product> {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении товара ${id}:`, error);
      throw new Error("Не удалось загрузить товар");
    }
  },

  // Создать новый товар
  async createProduct(data: CreateProductData): Promise<Product> {
    try {
      const response = await api.post<Product>("/products", data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при создании товара:", error);
      throw new Error("Не удалось создать товар");
    }
  },

  // Обновить товар
  async updateProduct(
    id: number,
    data: Partial<CreateProductData>
  ): Promise<Product> {
    try {
      const response = await api.put<Product>(`/products/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении товара ${id}:`, error);
      throw new Error("Не удалось обновить товар");
    }
  },

  // Удалить товар
  async deleteProduct(id: number): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Ошибка при удалении товара ${id}:`, error);
      throw new Error("Не удалось удалить товар");
    }
  },

  // Получить категории
  async getCategories(): Promise<string[]> {
    try {
      const response = await api.get<string[]>("/products/categories");
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении категорий:", error);
      throw new Error("Не удалось загрузить категории");
    }
  },
};
