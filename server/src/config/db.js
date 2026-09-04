import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('[DB] WARNING: MONGODB_URI is not defined in environment variables. Database connection skipped.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[DB] Connected successfully to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[DB] Connection failed: ${error.message}`);
    // In production, exit on connection error; in dev, log warning so developer can fix credentials
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
