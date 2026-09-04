import mongoose from 'mongoose';
import Inventory from '../models/inventory.js';

export const getIngredients = async (req, res) => {
  try {
    const items = await Inventory.find({}).sort({ name: 1 }).lean();

    const data = items.map((item) => {
      const status = item.quantity <= item.minimumStock ? 'LOW' : 'OK';
      return { ...item, status };
    });

    res.status(200).json({ count: data.length, data });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const addIngredient = async (req, res) => {
  try {
    const { name, quantity, unit, minimumStock } = req.body;

    if (!name || quantity === undefined || !unit || minimumStock === undefined) {
      return res.status(400).json({ message: 'Name, quantity, unit, and minimumStock are required' });
    }

    const validUnits = ['kg', 'g', 'L', 'ml', 'pieces'];
    if (!validUnits.includes(unit)) {
      return res.status(400).json({ message: 'Invalid unit' });
    }

    const existingIngredient = await Inventory.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    });

    if (existingIngredient) {
      return res.status(400).json({ message: 'Ingredient already exists' });
    }

    const newIngredient = await Inventory.create({
      name,
      quantity,
      unit,
      minimumStock,
    });

    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const updateIngredient = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ingredient ID' });
    }

    const { name, quantity, unit, minimumStock } = req.body;

    const updatedIngredient = await Inventory.findByIdAndUpdate(
      req.params.id,
      { name, quantity, unit, minimumStock },
      { new: true, runValidators: true }
    );

    if (!updatedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(200).json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const quickRestock = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ingredient ID' });
    }

    const { addedQuantity } = req.body;

    if (addedQuantity === undefined || addedQuantity <= 0 || typeof addedQuantity !== 'number') {
      return res.status(400).json({ message: 'addedQuantity must be a positive number' });
    }

    const updatedIngredient = await Inventory.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: addedQuantity } },
      { new: true, runValidators: true }
    );

    if (!updatedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(200).json({ message: 'Restock successful', data: updatedIngredient });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const deleteIngredient = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ingredient ID' });
    }

    const deletedIngredient = await Inventory.findByIdAndDelete(req.params.id);

    if (!deletedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(200).json({ message: 'Ingredient removed successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};
