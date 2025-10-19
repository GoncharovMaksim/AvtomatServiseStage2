import sqlite3 from "sqlite3";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Product {
  constructor() {
    this.dbPath = path.join(__dirname, "../../database/products.db");
    this.db = null;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          console.error("Ошибка подключения к базе данных:", err);
          reject(err);
        } else {
          console.log("Подключение к базе данных установлено");
          resolve();
        }
      });
    });
  }

  async init() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL,
        rating_rate REAL DEFAULT 0,
        rating_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    return new Promise((resolve, reject) => {
      this.db.run(createTableQuery, (err) => {
        if (err) {
          console.error("Ошибка создания таблицы:", err);
          reject(err);
        } else {
          console.log("Таблица products создана или уже существует");
          resolve();
        }
      });
    });
  }

  async getAll() {
    const query = "SELECT * FROM products ORDER BY created_at DESC";
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const products = rows.map((row) => ({
            id: row.id,
            title: row.title,
            price: row.price,
            description: row.description,
            category: row.category,
            image: row.image,
            rating: {
              rate: row.rating_rate,
              count: row.rating_count,
            },
          }));
          resolve(products);
        }
      });
    });
  }

  async getById(id) {
    const query = "SELECT * FROM products WHERE id = ?";
    return new Promise((resolve, reject) => {
      this.db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          resolve(null);
        } else {
          const product = {
            id: row.id,
            title: row.title,
            price: row.price,
            description: row.description,
            category: row.category,
            image: row.image,
            rating: {
              rate: row.rating_rate,
              count: row.rating_count,
            },
          };
          resolve(product);
        }
      });
    });
  }

  async create(productData) {
    const {
      title,
      price,
      description,
      category,
      image,
      rating = { rate: 0, count: 0 },
    } = productData;

    const query = `
      INSERT INTO products (title, price, description, category, image, rating_rate, rating_count)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      this.db.run(
        query,
        [title, price, description, category, image, rating.rate, rating.count],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              title,
              price,
              description,
              category,
              image,
              rating,
            });
          }
        }
      );
    });
  }

  async update(id, productData) {
    const { title, price, description, category, image, rating } = productData;

    const updateFields = [];
    const values = [];

    if (title !== undefined) {
      updateFields.push("title = ?");
      values.push(title);
    }
    if (price !== undefined) {
      updateFields.push("price = ?");
      values.push(price);
    }
    if (description !== undefined) {
      updateFields.push("description = ?");
      values.push(description);
    }
    if (category !== undefined) {
      updateFields.push("category = ?");
      values.push(category);
    }
    if (image !== undefined) {
      updateFields.push("image = ?");
      values.push(image);
    }
    if (rating && rating.rate !== undefined) {
      updateFields.push("rating_rate = ?");
      values.push(rating.rate);
    }
    if (rating && rating.count !== undefined) {
      updateFields.push("rating_count = ?");
      values.push(rating.count);
    }

    updateFields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);

    const query = `UPDATE products SET ${updateFields.join(", ")} WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.db.run(query, values, function (err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          resolve(null);
        } else {
          resolve({ id, ...productData });
        }
      });
    });
  }

  async delete(id) {
    const query = "DELETE FROM products WHERE id = ?";
    return new Promise((resolve, reject) => {
      this.db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  async getCategories() {
    const query = "SELECT DISTINCT category FROM products ORDER BY category";
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const categories = rows.map((row) => row.category);
          resolve(categories);
        }
      });
    });
  }

  async close() {
    if (this.db) {
      return new Promise((resolve) => {
        this.db.close((err) => {
          if (err) {
            console.error("Ошибка закрытия базы данных:", err);
          } else {
            console.log("Соединение с базой данных закрыто");
          }
          resolve();
        });
      });
    }
  }
}

export default Product;
