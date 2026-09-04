import mongoose from 'mongoose';
import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({ count: products.length, products });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params.id).populate(
      'ingredients.ingredient',
      'name quantity unit'
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, description, price, availableQuantity, image, ingredients } = req.body;

    if (
      !name ||
      !category ||
      !description ||
      price === undefined ||
      availableQuantity === undefined ||
      !image
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingProduct = await Product.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    });

    if (existingProduct) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    const isAvailable = Number(availableQuantity) > 0;

    const newProduct = await Product.create({
      name,
      category,
      description,
      price,
      availableQuantity,
      image,
      ingredients,
      isAvailable,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const updateData = { ...req.body };

    if (updateData.availableQuantity !== undefined) {
      updateData.isAvailable = Number(updateData.availableQuantity) > 0;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};
