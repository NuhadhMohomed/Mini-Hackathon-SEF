import React, { useState, useEffect } from 'react';
import { productSchema } from '../schemas/productSchema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AddEditProductModal({ open, onOpenChange, product, onSaveProduct }) {
  const isEditing = Boolean(product && product.id);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Loaves & Buns',
    description: '',
    price: 12.0,
    availableQuantity: 15,
    image: '',
    ingredients: '',
    activeMenu: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'Loaves & Buns',
        description: product.description || '',
        price: product.price || 12.0,
        availableQuantity: product.availableQuantity !== undefined ? product.availableQuantity : 15,
        image: product.image || '',
        ingredients: product.ingredients || '',
        activeMenu: product.activeMenu !== undefined ? product.activeMenu : true,
      });
    } else {
      setFormData({
        name: '',
        category: 'Loaves & Buns',
        description: '',
        price: 12.0,
        availableQuantity: 20,
        image: 'https://lh3.googleusercontent.com/aida/AEtjO1VKpJOgOByKk7UZF-MBSFBIW3sDApKHBfHTv7vcB9x-53lK9or9JxnqPJrr0KhMfqr3A4xsXbbnbcIg3_lzkS9URQdPED23mQYotwik3rPDwkgm-wdox5y2cApCNimfW9SebXeaA7b1xlrYS0mFIkIEdhZRp8175HVbZIxS_qN5IGYHpNMIJO9tXKQw3HrwfbVcaugNEBIXGa1rcEj2MEySJHq38aBRTh5G-vm9O9R35kpMqOSpeox8k3Q',
        ingredients: 'Cairnspring Flour, Water, Sea Salt',
        activeMenu: true,
      });
    }
    setErrors({});
  }, [product, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      availableQuantity: Number(formData.availableQuantity),
    };

    const result = productSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    if (onSaveProduct) {
      onSaveProduct({
        ...payload,
        id: isEditing ? product.id : `PROD-${Date.now()}`,
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? `Edit Product — ${product.name}` : 'Add New Bakery Product'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update product details, pricing, ingredients, and availability.'
              : 'Add an artisan item to the owner product catalog.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Product Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Country Sourdough Batard"
            />
            {errors.name && <p className="text-xs text-destructive mt-0.5">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                Category <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-input bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="Loaves & Buns">Loaves &amp; Buns</option>
                <option value="Cakes">Cakes</option>
                <option value="Cupcakes">Cupcakes</option>
                <option value="Brownies">Brownies</option>
              </select>
              {errors.category && <p className="text-xs text-destructive mt-0.5">{errors.category}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                Price ($) <span className="text-destructive">*</span>
              </label>
              <Input
                type="number"
                step="0.5"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="12.00"
              />
              {errors.price && <p className="text-xs text-destructive mt-0.5">{errors.price}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                Available Quantity <span className="text-destructive">*</span>
              </label>
              <Input
                type="number"
                value={formData.availableQuantity}
                onChange={(e) => setFormData({ ...formData, availableQuantity: e.target.value })}
                placeholder="20"
              />
              {errors.availableQuantity && (
                <p className="text-xs text-destructive mt-0.5">{errors.availableQuantity}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                Availability Status
              </label>
              <select
                value={formData.activeMenu ? 'active' : 'hidden'}
                onChange={(e) => setFormData({ ...formData, activeMenu: e.target.value === 'active' })}
                className="w-full rounded-lg border border-input bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="active">Active Menu</option>
                <option value="hidden">Hidden / Out of Allotment</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Product Image URL <span className="text-destructive">*</span>
            </label>
            <Input
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
            />
            {errors.image && <p className="text-xs text-destructive mt-0.5">{errors.image}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Ingredients List <span className="text-destructive">*</span>
            </label>
            <Input
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              placeholder="e.g. Cairnspring Flour, Sourdough Culture, Sea Salt"
            />
            {errors.ingredients && <p className="text-xs text-destructive mt-0.5">{errors.ingredients}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Product Description <span className="text-destructive">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Product description for bakery menu..."
              className="w-full rounded-lg border border-input bg-card p-3 text-sm text-foreground focus:border-primary focus:outline-none font-sans"
            />
            {errors.description && (
              <p className="text-xs text-destructive mt-0.5">{errors.description}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? 'Save Changes' : 'Add Product'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
