import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import { isDbConnected, memoryStore } from '../config/db.js';

export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    if (isDbConnected()) {
      const query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }
      const products = await Product.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ count: products.length, products });
    } else {
      let filtered = [...memoryStore.products];
      if (category && category !== 'All') {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter((p) => p.name.toLowerCase().includes(s));
      }
      return res.status(200).json({ count: filtered.length, products: filtered });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } else {
      const product = memoryStore.products.find(
        (p) => p._id === id || p.id === id || p.name.toLowerCase().replace(/\s+/g, '-') === id
      );
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, description, price, availableQuantity, image, ingredients } = req.body;

    if (!name || !category || !description || price === undefined || availableQuantity === undefined || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const isAvailable = Number(availableQuantity) > 0;

    if (isDbConnected()) {
      const newProduct = await Product.create({
        name,
        category,
        description,
        price: Number(price),
        availableQuantity: Number(availableQuantity),
        image,
        ingredients,
        isAvailable,
      });
      return res.status(201).json(newProduct);
    } else {
      const newProduct = {
        _id: `prod-${Date.now()}`,
        name,
        category,
        description,
        price: Number(price),
        availableQuantity: Number(availableQuantity),
        image,
        ingredients,
        isAvailable,
        activeMenu: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryStore.products.unshift(newProduct);
      return res.status(201).json(newProduct);
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.availableQuantity !== undefined) {
      updateData.isAvailable = Number(updateData.availableQuantity) > 0;
    }

    if (isDbConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(updatedProduct);
    } else {
      const idx = memoryStore.products.findIndex((p) => p._id === id || p.id === id);
      if (idx === -1) {
        return res.status(404).json({ message: 'Product not found' });
      }
      memoryStore.products[idx] = {
        ...memoryStore.products[idx],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      return res.status(200).json(memoryStore.products[idx]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product deleted successfully', id });
    } else {
      const idx = memoryStore.products.findIndex((p) => p._id === id || p.id === id);
      if (idx === -1) {
        return res.status(404).json({ message: 'Product not found' });
      }
      memoryStore.products.splice(idx, 1);
      return res.status(200).json({ message: 'Product deleted successfully', id });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};
