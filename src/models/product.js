import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ingredient name is required"],
      trim: true,
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },

    unit: {
      type: String,
      required: [true, "Unit is required"],
      enum: ["kg", "g", "L", "ml", "pieces"],
    },

    minimumStock: {
      type: Number,
      required: [true, "Minimum stock is required"],
      min: [0, "Minimum stock cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
