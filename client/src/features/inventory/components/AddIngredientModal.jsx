import React, { useState } from 'react';
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

export default function AddIngredientModal({ open, onOpenChange, onSaveItem }) {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('g');
  const [currentStock, setCurrentStock] = useState('');
  const [minThreshold, setMinThreshold] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter an ingredient name.');
      return;
    }
    const stockVal = Number(currentStock) || 0;
    const threshVal = Number(minThreshold) || 0;

    if (stockVal < 0 || threshVal < 0) {
      setError('Stock amounts cannot be negative.');
      return;
    }

    if (onSaveItem) {
      onSaveItem({
        id: `ING-${Date.now()}`,
        name: name.trim(),
        unit,
        currentStock: stockVal,
        minThreshold: threshVal,
      });
    }

    setName('');
    setCurrentStock('');
    setMinThreshold('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Add New Larder Ingredient</DialogTitle>
          <DialogDescription>
            Register raw baking grain, dairy, or leaven in the bakehouse inventory registry.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2 font-sans">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-2.5 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Ingredient Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Stone Ground Rye Flour"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1 col-span-1">
              <label className="text-xs font-semibold text-foreground">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="g">grams (g)</option>
                <option value="kg">kilograms (kg)</option>
                <option value="ml">milliliters (ml)</option>
                <option value="pcs">pieces (pcs)</option>
              </select>
            </div>

            <div className="space-y-1 col-span-1">
              <label className="text-xs font-semibold text-foreground">Current Stock</label>
              <Input
                type="number"
                min="0"
                value={currentStock}
                onChange={(e) => setCurrentStock(e.target.value)}
                placeholder="2500"
                className="font-mono"
              />
            </div>

            <div className="space-y-1 col-span-1">
              <label className="text-xs font-semibold text-foreground">Safety Minimum</label>
              <Input
                type="number"
                min="0"
                value={minThreshold}
                onChange={(e) => setMinThreshold(e.target.value)}
                placeholder="1000"
                className="font-mono"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Ingredient</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
