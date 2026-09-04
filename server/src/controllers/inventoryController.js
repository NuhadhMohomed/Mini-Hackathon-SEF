import mongoose from 'mongoose';
import Inventory from '../models/inventory.js';
import { isDbConnected, memoryStore } from '../config/db.js';

export const getIngredients = async (req, res) => {
  try {
    if (isDbConnected()) {
      const items = await Inventory.find({}).sort({ name: 1 }).lean();
      const data = items.map((item) => {
        const status = item.quantity <= item.minimumStock ? 'LOW' : 'OK';
        return {
          ...item,
          status,
          ingredient: item.name,
          available: item.quantity,
        };
      });
      return res.status(200).json({ count: data.length, data });
    } else {
      const data = memoryStore.inventory.map((item) => {
        const status = item.quantity <= item.minimumStock ? 'LOW' : 'OK';
        return {
          ...item,
          status,
          ingredient: item.name,
          available: item.quantity,
        };
      });
      return res.status(200).json({ count: data.length, data });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const addIngredient = async (req, res) => {
  try {
    const { name, quantity, unit, minimumStock } = req.body;

    if (!name || quantity === undefined || !unit || minimumStock === undefined) {
      return res.status(400).json({
        message: 'Name, quantity, unit, and minimumStock are required',
      });
    }

    if (isDbConnected()) {
      const existing = await Inventory.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
      });
      if (existing) {
        return res.status(400).json({ message: 'Ingredient already exists' });
      }

      const newIngredient = await Inventory.create({
        name: name.trim(),
        quantity: Number(quantity),
        unit,
        minimumStock: Number(minimumStock),
      });

      return res.status(201).json(newIngredient);
    } else {
      const existing = memoryStore.inventory.find(
        (i) => i.name.toLowerCase() === name.trim().toLowerCase()
      );
      if (existing) {
        return res.status(400).json({ message: 'Ingredient already exists' });
      }

      const newIngredient = {
        _id: `ing-${Date.now()}`,
        name: name.trim(),
        ingredient: name.trim(),
        quantity: Number(quantity),
        available: Number(quantity),
        unit,
        minimumStock: Number(minimumStock),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryStore.inventory.unshift(newIngredient);

      return res.status(201).json(newIngredient);
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, unit, minimumStock } = req.body;

    if (isDbConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Inventory.findByIdAndUpdate(
        id,
        { name, quantity, unit, minimumStock },
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ message: 'Ingredient not found' });
      }
      return res.status(200).json(updated);
    } else {
      const idx = memoryStore.inventory.findIndex(
        (i) => i._id === id || i.id === id
      );
      if (idx === -1) {
        return res.status(404).json({ message: 'Ingredient not found' });
      }

      memoryStore.inventory[idx] = {
        ...memoryStore.inventory[idx],
        name: name || memoryStore.inventory[idx].name,
        ingredient: name || memoryStore.inventory[idx].name,
        quantity: quantity !== undefined ? Number(quantity) : memoryStore.inventory[idx].quantity,
        available: quantity !== undefined ? Number(quantity) : memoryStore.inventory[idx].quantity,
        unit: unit || memoryStore.inventory[idx].unit,
        minimumStock: minimumStock !== undefined ? Number(minimumStock) : memoryStore.inventory[idx].minimumStock,
        updatedAt: new Date().toISOString(),
      };

      return res.status(200).json(memoryStore.inventory[idx]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const quickRestock = async (req, res) => {
  try {
    const { id } = req.params;
    const { addedQuantity } = req.body;

    const amount = Number(addedQuantity);
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'addedQuantity must be a positive number' });
    }

    if (isDbConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Inventory.findByIdAndUpdate(
        id,
        { $inc: { quantity: amount } },
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ message: 'Ingredient not found' });
      }
      return res.status(200).json({ message: 'Restock successful', data: updated });
    } else {
      const idx = memoryStore.inventory.findIndex(
        (i) => i._id === id || i.id === id
      );
      if (idx === -1) {
        return res.status(404).json({ message: 'Ingredient not found' });
      }

      memoryStore.inventory[idx].quantity += amount;
      memoryStore.inventory[idx].available = memoryStore.inventory[idx].quantity;
      memoryStore.inventory[idx].updatedAt = new Date().toISOString();

      return res.status(200).json({ message: 'Restock successful', data: memoryStore.inventory[idx] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const deleted = await Inventory.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Ingredient not found' });
      }
      return res.status(200).json({ message: 'Ingredient removed successfully', id });
    } else {
      const idx = memoryStore.inventory.findIndex((i) => i._id === id || i.id === id);
      if (idx === -1) {
        return res.status(404).json({ message: 'Ingredient not found' });
      }
      memoryStore.inventory.splice(idx, 1);
      return res.status(200).json({ message: 'Ingredient removed successfully', id });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};
