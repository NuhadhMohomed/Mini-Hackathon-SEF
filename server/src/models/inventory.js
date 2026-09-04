import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ingredient name is required'],
      trim: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      enum: ['kg', 'g', 'L', 'ml', 'pieces', 'pcs'],
      default: 'g',
    },
    minimumStock: {
      type: Number,
      required: [true, 'Minimum stock is required'],
      min: [0, 'Minimum stock cannot be negative'],
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Inventory', inventorySchema);
