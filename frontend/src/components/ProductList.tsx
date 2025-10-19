import React from "react";
import { Product } from "../types/product";
import { ProductCard } from "./ProductCard";
import { SortField, SortOrder } from "../types/product";
import "./ProductList.css";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка товаров...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button
          className="btn btn-retry"
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="sort-controls">
        <h3>Сортировка:</h3>
        <div className="sort-buttons">
          <button
            className={`sort-btn ${sortField === "price" ? "active" : ""}`}
            onClick={() => onSort("price")}
          >
            По цене {sortField === "price" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            className={`sort-btn ${sortField === "rating" ? "active" : ""}`}
            onClick={() => onSort("rating")}
          >
            По рейтингу{" "}
            {sortField === "rating" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>Товары не найдены</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
