import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// import productRoutes from './routes/productRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import inventoryRoutes from './routes/inventoryRoutes.js';
// import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Mount domain-specific RESTful API routes
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/inventory', inventoryRoutes);
// app.use('/api/auth', authRoutes);

// Root health-check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Home Bakery API is operational' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
