import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

dotenv.config();

const seedOwner = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);

    const ownerExists = await User.findOne({ email: process.env.OWNER_EMAIL });

    if (ownerExists) {
      console.log('Owner already exists in database.');
      await mongoose.disconnect();
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.OWNER_PASSWORD, salt);

    // Using insertOne to bypass Mongoose enum validation on role
    await User.collection.insertOne({
      name: process.env.OWNER_NAME || 'Bakery Owner',
      email: process.env.OWNER_EMAIL,
      password: hashedPassword,
      phone: process.env.OWNER_PHONE || '0771234567',
      address: process.env.OWNER_ADDRESS || 'Bakery HQ',
      role: 'owner',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Owner account seeded successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedOwner();
