import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
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
      default: () => `ORD-${Date.now()}`,
    },

    customer: {
      name: {
        type: String,
        required: [true, "Customer name is required"],
        trim: true,
      },

      phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
      },

      address: {
        type: String,
        required: [true, "Delivery address is required"],
        trim: true,
      },
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one product",
      },
    },

    total: {
      type: Number,
      required: true,
      min: [0, "Total cannot be negative"],
    },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Ready", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
