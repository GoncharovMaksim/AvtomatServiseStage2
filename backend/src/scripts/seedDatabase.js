import Product from "../models/Product.js";

const sampleProducts = [
  {
    title: "iPhone 15 Pro",
    price: 999.99,
    description: "Новейший смартфон Apple с титановым корпусом и чипом A17 Pro",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    rating: { rate: 4.8, count: 120 },
  },
  {
    title: "MacBook Air M2",
    price: 1199.99,
    description:
      "Ультратонкий ноутбук с чипом M2 и 13-дюймовым дисплеем Liquid Retina",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
    rating: { rate: 4.7, count: 89 },
  },
  {
    title: "Sony WH-1000XM5",
    price: 399.99,
    description:
      "Беспроводные наушники с активным шумоподавлением и 30-часовой батареей",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
    rating: { rate: 4.6, count: 156 },
  },
  {
    title: "Nike Air Max 270",
    price: 150.0,
    description: "Кроссовки с максимальной амортизацией и современным дизайном",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    rating: { rate: 4.4, count: 203 },
  },
  {
    title: "Adidas Ultraboost 22",
    price: 180.0,
    description:
      "Беговые кроссовки с технологией Boost для максимальной отдачи энергии",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
    rating: { rate: 4.5, count: 178 },
  },
  {
    title: "Zara Oversized Blazer",
    price: 89.99,
    description: "Элегантный блейзер oversize из качественной шерсти",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
    rating: { rate: 4.3, count: 95 },
  },
  {
    title: "H&M Summer Dress",
    price: 39.99,
    description: "Легкое летнее платье из хлопка с цветочным принтом",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    rating: { rate: 4.2, count: 67 },
  },
  {
    title: "Diamond Ring 18K Gold",
    price: 2500.0,
    description:
      "Элегантное кольцо с бриллиантом в оправе из 18-каратного золота",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500",
    rating: { rate: 4.9, count: 45 },
  },
  {
    title: "Pearl Necklace",
    price: 450.0,
    description: "Классическое ожерелье из жемчуга с серебряной застежкой",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
    rating: { rate: 4.6, count: 78 },
  },
  {
    title: "Samsung Galaxy S24",
    price: 799.99,
    description: "Флагманский Android смартфон с камерой 200MP и AI функциями",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    rating: { rate: 4.5, count: 134 },
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Заполнение базы данных тестовыми данными...");

    const productModel = new Product();
    await productModel.connect();
    await productModel.init();

    // Очищаем существующие данные
    console.log("🧹 Очистка существующих данных...");
    for (const product of sampleProducts) {
      await productModel.create(product);
    }

    console.log(`✅ Добавлено ${sampleProducts.length} товаров`);
    console.log("📊 База данных успешно заполнена тестовыми данными");

    await productModel.close();
    console.log("🔌 Соединение с базой данных закрыто");
  } catch (error) {
    console.error("❌ Ошибка при заполнении базы данных:", error);
    process.exit(1);
  }
}

seedDatabase();
