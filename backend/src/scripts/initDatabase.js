import Product from "../models/Product.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDatabase() {
  try {
    console.log("🔧 Инициализация базы данных...");

    // Создаем папку для базы данных
    const dbDir = path.join(__dirname, "../../database");
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
      console.log("📁 Создана папка для базы данных");
    }

    // Подключаемся к базе данных
    const productModel = new Product();
    await productModel.connect();
    await productModel.init();

    console.log("✅ База данных успешно инициализирована");
    console.log("📊 Таблица products создана");

    await productModel.close();
    console.log("🔌 Соединение с базой данных закрыто");
  } catch (error) {
    console.error("❌ Ошибка при инициализации базы данных:", error);
    process.exit(1);
  }
}

initDatabase();
