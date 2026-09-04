import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/order.js';
import Inventory from '../models/inventory.js';

export const INITIAL_PRODUCTS = [
  {
    name: 'Country Sourdough Batard',
    category: 'Loaves & Buns',
    price: 12.0,
    availableQuantity: 15,
    isAvailable: true,
    activeMenu: true,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&q=80',
    ingredients: 'Cairnspring Yecora Rojo Flour, Sourdough Culture, Sea Salt',
    description: 'Blistered dark mahogany crust with open custard crumb fermentation and deep malty sweetness.',
  },
  {
    name: 'Cardamom Morning Buns',
    category: 'Loaves & Buns',
    price: 6.5,
    availableQuantity: 28,
    isAvailable: true,
    activeMenu: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    ingredients: 'Hard Wheat Flour, Normandy Cultured Butter, Green Cardamom Pods, Wildflower Honey',
    description: 'Slow-laminated buttery brioche coils spiced with freshly crushed green cardamom and Swedish pearl sugar.',
  },
  {
    name: 'Dark Chocolate Fudge Cake',
    category: 'Cakes',
    price: 34.0,
    availableQuantity: 5,
    isAvailable: true,
    activeMenu: true,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    ingredients: 'Valrhona Dark Cocoa, Cultured Butter, Wildflower Honey, Stone Ground Rye',
    description: 'Rich dark chocolate layers with glossy cocoa ganache and stone-ground heritage rye base.',
  },
  {
    name: 'Classic Vanilla Bean Cake',
    category: 'Cakes',
    price: 32.0,
    availableQuantity: 0,
    isAvailable: false,
    activeMenu: false,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1200&q=80',
    ingredients: 'Madagascar Vanilla Beans, Cultured Butter, Pastry Flour, Chamomile Blossoms',
    description: 'Whipped cultured buttercream frosting infused with whole Madagascar bourbon vanilla pods.',
  },
  {
    name: 'Artisan Red Velvet Cupcakes',
    category: 'Cupcakes',
    price: 4.5,
    availableQuantity: 40,
    isAvailable: true,
    activeMenu: true,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=1200&q=80',
    ingredients: 'Unbleached Wheat Flour, Cocoa, Cream Cheese Frosting',
    description: 'Naturally tinted tender velvet crumb finished with tangy farm cream cheese swirl.',
  },
  {
    name: 'Fudgy Sea Salt Brownies',
    category: 'Brownies',
    price: 5.5,
    availableQuantity: 22,
    isAvailable: true,
    activeMenu: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    ingredients: 'Valrhona Cocoa Nibs, Cultured Butter, Maldon Sea Salt',
    description: 'Dense dark cocoa squares with crackly meringue top and crunchy Maldon flake finish.',
  },
];

export const INITIAL_INVENTORY = [
  {
    name: 'Cairnspring Yecora Rojo Flour',
    quantity: 4500,
    minimumStock: 1500,
    unit: 'g',
  },
  {
    name: 'Normandy Cultured Butter (84% Fat)',
    quantity: 400,
    minimumStock: 1000,
    unit: 'g',
  },
  {
    name: 'Green Cardamom Pods',
    quantity: 80,
    minimumStock: 200,
    unit: 'g',
  },
  {
    name: 'Valrhona 70% Dark Cocoa',
    quantity: 2500,
    minimumStock: 500,
    unit: 'g',
  },
  {
    name: 'Organic Wildflower Honey',
    quantity: 1200,
    minimumStock: 300,
    unit: 'g',
  },
  {
    name: 'Maldon Sea Salt Flakes',
    quantity: 350,
    minimumStock: 500,
    unit: 'g',
  },
  {
    name: 'Sourdough Mother Culture',
    quantity: 8000,
    minimumStock: 2000,
    unit: 'g',
  },
  {
    name: 'Madagascar Bourbon Vanilla Beans',
    quantity: 10,
    minimumStock: 50,
    unit: 'g',
  },
];

export const INITIAL_ORDERS = [
  {
    orderId: 'ORD-1025',
    customer: {
      name: 'Sarah Jenkins',
      phone: '+1 (555) 234-5678',
      address: '142 Baker Street, Porch Locker #04',
      email: 'sarah.jenkins@example.com',
    },
    pickupSlot: 'Friday Nov 15 • 08:00 - 09:30 AM',
    pickupPin: '8492',
    porchLocker: 'Porch Cubby B-4',
    status: 'Pending',
    total: 38.5,
    items: [
      { name: 'Country Sourdough Batard', quantity: 2, price: 12.0 },
      { name: 'Organic Wildflower Honey', quantity: 1, price: 14.5 },
    ],
  },
  {
    orderId: 'ORD-1026',
    customer: {
      name: 'Marcus Vance',
      phone: '+1 (555) 876-5432',
      address: '88 Hearth Lane, Porch Locker #08',
      email: 'marcus.vance@example.com',
    },
    pickupSlot: 'Friday Nov 15 • 09:30 - 11:00 AM',
    pickupPin: '4193',
    porchLocker: 'Porch Cubby C-1',
    status: 'Processing',
    total: 24.0,
    items: [
      { name: 'Cardamom Morning Buns', quantity: 2, price: 6.5 },
      { name: 'Country Sourdough Batard', quantity: 1, price: 11.0 },
    ],
  },
  {
    orderId: 'ORD-1027',
    customer: {
      name: 'Elena Rostova',
      phone: '+1 (555) 345-6789',
      address: '204 Mill Avenue, Porch Locker #02',
      email: 'elena.rostova@example.com',
    },
    pickupSlot: 'Friday Nov 15 • 08:00 - 09:30 AM',
    pickupPin: '6721',
    porchLocker: 'Porch Cubby A-3',
    status: 'Ready',
    total: 34.0,
    items: [{ name: 'Dark Chocolate Fudge Cake', quantity: 1, price: 34.0 }],
  },
  {
    orderId: 'ORD-1028',
    customer: {
      name: 'David Miller',
      phone: '+1 (555) 987-6543',
      address: '55 Stoneground Way, Porch Locker #12',
      email: 'david.miller@example.com',
    },
    pickupSlot: 'Friday Nov 15 • 11:00 - 12:30 PM',
    pickupPin: '9312',
    porchLocker: 'Porch Cubby D-2',
    status: 'Completed',
    total: 52.0,
    items: [
      { name: 'Country Sourdough Batard', quantity: 2, price: 12.0 },
      { name: 'Artisan Red Velvet Cupcakes', quantity: 4, price: 4.5 },
      { name: 'Cardamom Morning Buns', quantity: 1, price: 10.0 },
    ],
  },
];

export async function seedDatabase() {
  try {
    // 1. Seed Owner Account if not exists
    const ownerEmail = process.env.OWNER_EMAIL || 'owner@crumbandbloom.com';
    const ownerPassword = process.env.OWNER_PASSWORD || 'Hearth2026!';

    const existingOwner = await User.findOne({ email: ownerEmail });
    if (!existingOwner) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(ownerPassword, salt);
      await User.create({
        name: process.env.OWNER_NAME || 'Julian Hayes',
        email: ownerEmail,
        password: hashedPassword,
        phone: process.env.OWNER_PHONE || '+1 (555) 234-5678',
        address: process.env.OWNER_ADDRESS || '42 Orchard Lane, Bakehouse HQ',
        role: 'owner',
      });
      console.log('✅ Seeded Owner Account (Julian Hayes)');
    }

    // 2. Seed Products if empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(INITIAL_PRODUCTS);
      console.log(`✅ Seeded ${INITIAL_PRODUCTS.length} Artisan Products`);
    }

    // 3. Seed Inventory if empty
    const inventoryCount = await Inventory.countDocuments();
    if (inventoryCount === 0) {
      await Inventory.insertMany(INITIAL_INVENTORY);
      console.log(`✅ Seeded ${INITIAL_INVENTORY.length} Larder Inventory Items`);
    }

    // 4. Seed Orders if empty
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      await Order.insertMany(INITIAL_ORDERS);
      console.log(`✅ Seeded ${INITIAL_ORDERS.length} Initial Bakery Orders`);
    }
  } catch (error) {
    console.error('⚠️  Seed error:', error.message);
  }
}
