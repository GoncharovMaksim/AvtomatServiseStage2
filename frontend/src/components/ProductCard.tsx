import React from "react";
import { Product } from "../types/product";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => {
    onEdit(product);
  };

  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      onDelete(product.id);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-rating">
          <span className="rating-stars">
            {"★".repeat(Math.floor(product.rating.rate))}
            {"☆".repeat(5 - Math.floor(product.rating.rate))}
          </span>
          <span className="rating-value">({product.rating.rate})</span>
          <span className="rating-count">({product.rating.count} отзывов)</span>
        </div>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <div className="product-actions">
          <button className="btn btn-edit" onClick={handleEdit}>
            Редактировать
          </button>
          <button className="btn btn-delete" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
