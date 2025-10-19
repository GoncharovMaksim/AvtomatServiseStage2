import React, { useState, useEffect } from "react";
import { Product, CreateProductData } from "./types/product";
import { useProducts } from "./hooks/useProducts";
import { ProductList } from "./components/ProductList";
import { ProductModal } from "./components/ProductModal";
import { SearchBar } from "./components/SearchBar";
import { productService } from "./services/api";
import "./App.css";

function App() {
  const {
    products,
    loading,
    error,
    sortField,
    sortOrder,
    searchTerm,
    createProduct,
    updateProduct,
    deleteProduct,
    handleSort,
    setSearchTerm,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Загружаем категории при монтировании компонента
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await productService.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };
    loadCategories();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  const handleModalSubmit = async (data: CreateProductData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
      } else {
        await createProduct(data);
      }
    } catch (error) {
      console.error("Ошибка при сохранении товара:", error);
      throw error; // Перебрасываем ошибку для отображения в модальном окне
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>Менеджер товаров</h1>
          <p>Управление каталогом товаров</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="toolbar">
            <button className="btn btn-primary" onClick={handleAddProduct}>
              + Добавить товар
            </button>
            <div className="stats">
              <span>Всего товаров: {products.length}</span>
            </div>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
          />

          <ProductList
            products={products}
            loading={loading}
            error={error}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        product={editingProduct}
        categories={categories}
      />
    </div>
  );
}

export default App;
