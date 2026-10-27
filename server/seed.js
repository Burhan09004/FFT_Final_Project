const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Product } = require('./model/Product');
dotenv.config();

const products = [
  {
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'electronics',
    description:
      'Premium smartphone with an advanced camera system and fast performance.',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85',
    price: 89999,
    stock: 15,
  },
  {
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    category: 'electronics',
    description:
      'A bright display, capable camera and thoughtful everyday features.',
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85',
    price: 74999,
    stock: 20,
  },
  {
    name: 'MacBook Pro 14-inch',
    brand: 'Apple',
    category: 'electronics',
    description: 'A powerful laptop for creative work, study and productivity.',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85',
    price: 169999,
    stock: 8,
  },
  {
    name: 'Everyday Wireless Headphones',
    brand: 'Soundcore',
    category: 'audio',
    description:
      'Comfortable over-ear headphones for music, calls and focus time.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
    price: 4999,
    stock: 25,
  },
  {
    name: 'Minimal Smart Watch',
    brand: 'Northstar',
    category: 'electronics',
    description:
      'A clean everyday watch with activity and notification features.',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
    price: 5999,
    stock: 18,
  },
  {
    name: 'Classic Red Sneakers',
    brand: 'Street Form',
    category: 'fashion',
    description: 'A comfortable statement sneaker with a timeless silhouette.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
    price: 3299,
    stock: 35,
  },
  {
    name: 'Daily Carry Backpack',
    brand: 'Fieldwork',
    category: 'fashion',
    description: 'A practical backpack for commutes, campus and weekend trips.',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
    price: 2199,
    stock: 20,
  },
  {
    name: 'Modern Table Lamp',
    brand: 'Form Living',
    category: 'home',
    description:
      'A warm accent light for your reading corner or bedside table.',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
    price: 1799,
    stock: 16,
  },
  {
    name: 'Ceramic Coffee Set',
    brand: 'Sunday Studio',
    category: 'home',
    description:
      'A simple ceramic set to make your daily coffee ritual special.',
    image:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85',
    price: 1299,
    stock: 30,
  },
  {
    name: 'Compact Mirrorless Camera',
    brand: 'Focus Co.',
    category: 'electronics',
    description:
      'A versatile camera for travel, everyday photography and creative projects.',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85',
    price: 68999,
    stock: 6,
  },
  {
    name: 'Wireless Game Controller',
    brand: 'Playstate',
    category: 'gaming',
    description:
      'An ergonomic controller designed for comfortable gaming sessions.',
    image:
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&q=85',
    price: 4499,
    stock: 12,
  },
  {
    name: 'Portable Bluetooth Speaker',
    brand: 'JBL',
    category: 'audio',
    description:
      'Take your playlists from your desk to your next outdoor hangout.',
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85',
    price: 4999,
    stock: 22,
  },
  {
    name: 'Soft Knit Everyday Tote',
    brand: 'Fieldwork',
    category: 'fashion',
    description:
      'A lightweight tote for daily essentials and spontaneous plans.',
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
    price: 1499,
    stock: 28,
  },
  {
    name: 'Minimal Desk Setup',
    brand: 'Form Living',
    category: 'home',
    description:
      'A clean desk accessory to keep your workspace feeling considered.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85',
    price: 2499,
    stock: 14,
  },
  {
    name: 'Performance Running Shoes',
    brand: 'Run Club',
    category: 'fashion',
    description: 'Lightweight everyday runners built for comfort and movement.',
    image:
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=85',
    price: 5799,
    stock: 19,
  },
  {
    name: 'Gaming Headset',
    brand: 'Playstate',
    category: 'gaming',
    description: 'A comfortable headset for clear chat and immersive play.',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=85',
    price: 3999,
    stock: 11,
  },
  {
    name: 'Apple AirPods Pro 2',
    description: 'Wireless earbuds with active noise cancellation',
    category: 'Electronics',
    price: 24999,
    image:
      'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=800&q=80',
    stock: 20,
    rating: 4.8,
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Premium wireless noise-cancelling headphones',
    category: 'Electronics',
    price: 29990,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    stock: 15,
    rating: 4.8,
  },
  {
    name: 'Samsung Galaxy Smartphone',
    description: 'Modern smartphone with an advanced camera',
    category: 'Electronics',
    price: 69999,
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    stock: 12,
    rating: 4.7,
  },
  {
    name: 'MacBook Air Laptop',
    description: 'Slim laptop for work, study and everyday use',
    category: 'Electronics',
    price: 99990,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    stock: 8,
    rating: 4.9,
  },

  // FASHION
  {
    name: 'Classic Running Sneakers',
    description: 'Comfortable everyday sports shoes',
    category: 'Fashion',
    price: 3999,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    stock: 25,
    rating: 4.6,
  },
  {
    name: 'Casual Denim Jeans',
    description: 'Classic blue denim jeans for daily wear',
    category: 'Fashion',
    price: 2499,
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    stock: 30,
    rating: 4.4,
  },
  {
    name: 'Classic Sunglasses',
    description: 'Stylish sunglasses for everyday outings',
    category: 'Fashion',
    price: 1999,
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    stock: 18,
    rating: 4.5,
  },
  {
    name: 'Everyday Backpack',
    description: 'Versatile backpack for college and travel',
    category: 'Fashion',
    price: 1799,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    stock: 22,
    rating: 4.6,
  },

  // HOME & KITCHEN
  {
    name: 'Minimal Table Lamp',
    description: 'Contemporary lamp for a warm atmosphere',
    category: 'Home & Kitchen',
    price: 1499,
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    stock: 14,
    rating: 4.5,
  },
  {
    name: 'Modern Lounge Chair',
    description: 'Comfortable accent chair for your living room',
    category: 'Home & Kitchen',
    price: 12999,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    stock: 6,
    rating: 4.7,
  },
  {
    name: 'Ceramic Coffee Mug',
    description: 'Minimal ceramic mug for coffee and tea',
    category: 'Home & Kitchen',
    price: 399,
    image:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80',
    stock: 40,
    rating: 4.4,
  },
  {
    name: 'Kitchen Storage Set',
    description: 'Organize everyday kitchen essentials',
    category: 'Home & Kitchen',
    price: 999,
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    stock: 16,
    rating: 4.3,
  },

  // GAMING
  {
    name: 'PlayStation 5 Console',
    description: 'Next-generation gaming console',
    category: 'Gaming',
    price: 54990,
    image:
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    stock: 5,
    rating: 4.9,
  },
  {
    name: 'Xbox Wireless Controller',
    description: 'Wireless controller for immersive gaming',
    category: 'Gaming',
    price: 5499,
    image:
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4d?auto=format&fit=crop&w=800&q=80',
    stock: 17,
    rating: 4.7,
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'Mechanical keyboard with responsive keys',
    category: 'Gaming',
    price: 4999,
    image:
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
    stock: 13,
    rating: 4.6,
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'Precision mouse for gaming and productivity',
    category: 'Gaming',
    price: 2999,
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80',
    stock: 19,
    rating: 4.5,
  },

  // ACCESSORIES
  {
    name: 'Minimal Wrist Watch',
    description: 'Classic wristwatch with a modern design',
    category: 'Accessories',
    price: 3499,
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
    stock: 11,
    rating: 4.5,
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Reusable bottle for daily hydration',
    category: 'Accessories',
    price: 799,
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    stock: 35,
    rating: 4.4,
  },
  {
    name: 'Travel Wallet',
    description: 'Compact wallet for cards and cash',
    category: 'Accessories',
    price: 1199,
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    stock: 20,
    rating: 4.3,
  },
  {
    name: 'Polarized Travel Sunglasses',
    description: 'Lightweight sunglasses for outdoor activities',
    category: 'Accessories',
    price: 1599,
    image:
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
    stock: 24,
    rating: 4.5,
  },
  {
    name: 'Leather Crossbody Bag',
    description: 'A compact everyday bag with room for your essentials',
    category: 'Accessories',
    price: 2499,
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    stock: 16,
    rating: 4.6,
  },
  {
    name: 'Classic Canvas Cap',
    description: 'A comfortable adjustable cap for sunny days outdoors',
    category: 'Accessories',
    price: 899,
    image:
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    stock: 28,
    rating: 4.4,
  },
  {
    name: 'Travel Organizer Pouch',
    description: 'Keep cables, chargers and small essentials neatly together',
    category: 'Accessories',
    price: 699,
    image:
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=800&q=80',
    stock: 32,
    rating: 4.5,
  },
  {
    name: 'Minimal Analog Watch',
    description: 'A timeless everyday watch with a clean, easy-to-read dial',
    category: 'Accessories',
    price: 3299,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    stock: 14,
    rating: 4.7,
  },
];

async function seedDB() {
  for (const item of products) {
    await Product.updateOne(
      { name: item.name },
      { $set: item },
      { upsert: true },
    );
  }
  console.log(
    `Seeded/updated ${products.length} GoCart demo products without deleting existing inventory.`,
  );
}

if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/gocart')
    .then(seedDB)
    .then(() => mongoose.connection.close())
    .catch(async (err) => {
      console.error('Seeding failed:', err.message);
      await mongoose.connection.close();
      process.exitCode = 1;
    });
}
module.exports = { seedDB };
