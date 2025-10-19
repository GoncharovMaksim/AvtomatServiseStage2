import React, { useState, useEffect } from "react";
import { Product, CreateProductData } from "../types/product";
import "./ProductModal.css";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProductData) => Promise<void>;
  product?: Product | null;
  categories: string[];
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  categories,
}) => {
  const [formData, setFormData] = useState<CreateProductData>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateProductData>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      });
    } else {
      setFormData({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
      });
    }
    setErrors({});
  }, [product, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateProductData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Название обязательно";
    }
    if (formData.price <= 0) {
      newErrors.price = "Цена должна быть больше 0";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Описание обязательно";
    }
    if (!formData.category) {
      newErrors.category = "Категория обязательна";
    }
    if (!formData.image.trim()) {
      newErrors.image = "URL изображения обязателен";
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = "Введите корректный URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Ошибка при сохранении товара:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));

    // Очищаем ошибку при изменении поля
    if (errors[name as keyof CreateProductData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product ? "Редактировать товар" : "Добавить товар"}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="title">Название *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "error" : ""}
              placeholder="Введите название товара"
            />
            {errors.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="price">Цена *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? "error" : ""}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.price && (
              <span className="error-message">{errors.price}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="category">Категория *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? "error" : ""}
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="error-message">{errors.category}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image">URL изображения *</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={errors.image ? "error" : ""}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <span className="error-message">{errors.image}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? "error" : ""}
              placeholder="Введите описание товара"
              rows={4}
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Сохранение..." : product ? "Сохранить" : "Добавить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
