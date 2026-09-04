import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

const DB_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting'
};

router.get('/', (req, res) => {
  const dbState = DB_STATES[mongoose.connection.readyState] || 'unknown';

  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    database: dbState,
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;
