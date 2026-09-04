import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  category: z.enum(['Cakes', 'Cupcakes', 'Brownies', 'Loaves & Buns'], {
    required_error: 'Please select a product category',
  }),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  price: z.number().positive('Price must be greater than 0'),
  availableQuantity: z.number().int().min(0, 'Available quantity cannot be negative'),
  image: z.string().min(1, 'Product image URL or path is required'),
  ingredients: z.string().min(2, 'Ingredients list is required'),
  activeMenu: z.boolean().default(true),
});
