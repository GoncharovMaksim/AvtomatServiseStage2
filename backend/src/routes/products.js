import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../controllers/productController.js";
import {
  validateProduct,
  validateProductUpdate,
  validateId,
} from "../middleware/validation.js";

const router = express.Router();

// GET /api/products - получить все товары
router.get("/", getAllProducts);

// GET /api/products/categories - получить категории
router.get("/categories", getCategories);

// GET /api/products/:id - получить товар по ID
router.get("/:id", validateId, getProductById);

// POST /api/products - создать новый товар
router.post("/", validateProduct, createProduct);

// PUT /api/products/:id - обновить товар
router.put("/:id", validateId, validateProductUpdate, updateProduct);

// DELETE /api/products/:id - удалить товар
router.delete("/:id", validateId, deleteProduct);

export default router;
