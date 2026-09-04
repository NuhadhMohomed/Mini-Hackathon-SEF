import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, authorizeRoles('owner'), createProduct);
router.put('/:id', protect, authorizeRoles('owner'), updateProduct);
router.delete('/:id', protect, authorizeRoles('owner'), deleteProduct);

export default router;
