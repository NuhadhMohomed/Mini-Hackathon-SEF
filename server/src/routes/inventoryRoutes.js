import express from 'express';
import {
  getIngredients,
  addIngredient,
  updateIngredient,
  quickRestock,
  deleteIngredient,
} from '../controllers/inventoryController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getIngredients);
router.post('/', addIngredient);
router.put('/:id', updateIngredient);
router.patch('/:id/restock', quickRestock);
router.delete('/:id', deleteIngredient);

export default router;
