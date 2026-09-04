import mongoose from 'mongoose';
import { seedDatabase, INITIAL_PRODUCTS, INITIAL_INVENTORY, INITIAL_ORDERS } from '../utils/seedData.js';

let isConnected = false;

// Fallback in-memory storage for offline / zero-config hackathon demo
export const memoryStore = {
  users: [
    {
      _id: 'user-owner-001',
      name: process.env.OWNER_NAME || 'Julian Hayes',
      email: process.env.OWNER_EMAIL || 'owner@crumbandbloom.com',
      password: process.env.OWNER_PASSWORD || 'Hearth2026!',
      phone: '+1 (555) 234-5678',
      address: '42 Orchard Lane, Bakehouse HQ',
      role: 'owner',
    },
  ],
  products: INITIAL_PRODUCTS.map((p, idx) => ({
    _id: `prod-id-${101 + idx}`,
    ...p,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  orders: INITIAL_ORDERS.map((o, idx) => ({
    _id: `ord-id-${1025 + idx}`,
    ...o,
    createdAt: new Date(Date.now() - idx * 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  inventory: INITIAL_INVENTORY.map((i, idx) => ({
    _id: `ing-id-${101 + idx}`,
    ...i,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
};

export const isDbConnected = () => isConnected;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri || uri.includes('<username>')) {
    console.log('ℹ️  No MONGODB_URI configured. Initialized in-memory storage for offline demonstration.');
    isConnected = false;
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    isConnected = true;
    await seedDatabase();
    return true;
  } catch (error) {
    console.warn(`⚠️  MongoDB connection error (${error.message}). Running with in-memory persistence fallback.`);
    isConnected = false;
    return false;
  }
};

export { connectDB };
export default connectDB;
