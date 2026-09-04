import express from 'express';
import { registerCustomer, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', loginUser);

export default router;
