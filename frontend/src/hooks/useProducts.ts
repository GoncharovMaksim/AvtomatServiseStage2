import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Product,
  CreateProductData,
  SortField,
  SortOrder,
} from "../types/product";
import { productService } from "../services/api";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("price");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // Загрузка товаров
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  }, []);

  // Создание товара
  const createProduct = useCallback(async (productData: CreateProductData) => {
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка при создании товара"
      );
      throw err;
    }
  }, []);

  // Обновление товара
  const updateProduct = useCallback(
    async (id: number, productData: Partial<CreateProductData>) => {
      try {
        const updatedProduct = await productService.updateProduct(
          id,
          productData
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updatedProduct : p))
        );
        return updatedProduct;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ошибка при обновлении товара"
        );
        throw err;
      }
    },
    []
  );

  // Удаление товара
  const deleteProduct = useCallback(async (id: number) => {
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка при удалении товара"
      );
      throw err;
    }
  }, []);

  // Фильтрация и сортировка товаров
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Фильтрация по поисковому запросу
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    // Сортировка
    return [...filtered].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      if (sortField === "price") {
        aValue = a.price;
        bValue = b.price;
      } else {
        aValue = a.rating.rate;
        bValue = b.rating.rate;
      }

      if (sortOrder === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }, [products, searchTerm, sortField, sortOrder]);

  // Изменение сортировки
  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    },
    [sortField]
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products: filteredAndSortedProducts,
    loading,
    error,
    sortField,
    sortOrder,
    searchTerm,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    handleSort,
    setSearchTerm,
  };
};
