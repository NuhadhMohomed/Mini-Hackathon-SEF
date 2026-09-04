import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
      default: () => `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    },
    customer: {
      name: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
      },
      address: {
        type: String,
        default: 'Porchside Pickup · 42 Orchard Lane',
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
      notes: {
        type: String,
        default: '',
      },
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items && items.length > 0,
        message: 'Order must contain at least one product',
      },
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'Total cannot be negative'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Ready', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    pickupSlot: {
      type: String,
      default: 'Friday Nov 15 • 08:00 - 09:30 AM',
    },
    pickupPin: {
      type: String,
      default: () => `${Math.floor(1000 + Math.random() * 9000)}`,
    },
    porchLocker: {
      type: String,
      default: 'Porch Cubby A-2',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
