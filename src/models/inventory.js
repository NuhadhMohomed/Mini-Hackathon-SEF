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

		supplier: {
			type: String,
			trim: true,
		},

		costPerUnit: {
			type: Number,
			min: [0, "Cost cannot be negative"],
		},

		expiryDate: {
			type: Date,
		},

		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

inventorySchema.index({ name: 1, unit: 1 }, { unique: true });

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
