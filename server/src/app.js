import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Standard Middleware
app.use(morgan('dev'));
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Base Infrastructure Routes
app.use('/api/health', healthRouter);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
