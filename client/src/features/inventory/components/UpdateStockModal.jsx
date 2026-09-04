import React, { useState, useEffect } from 'react';
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

export default function UpdateStockModal({ open, onOpenChange, item, onSaveStock }) {
  const [addStockAmount, setAddStockAmount] = useState('');

  useEffect(() => {
    setAddStockAmount('');
  }, [item, open]);

  if (!item) return null;

  const currentStock = item.available || 0;
  const added = Number(addStockAmount) || 0;
  const newStock = currentStock + added;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (added < 0) return;

    if (onSaveStock) {
      onSaveStock(item.id, newStock);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Update Stock — {item.ingredient}</DialogTitle>
          <DialogDescription>
            Add incoming shipment stock to current larder inventory balance.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2 font-sans">
          <div className="bg-surface-container-low p-4 rounded-xl border border-border space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-semibold">Current Stock:</span>
              <span className="font-mono text-base font-bold text-foreground">
                {currentStock.toLocaleString()} {item.unit}
              </span>
            </div>
            <div className="flex justify-between items-center text-primary">
              <span className="font-semibold">Add Stock:</span>
              <span className="font-mono text-base font-bold">
                +{added.toLocaleString()} {item.unit}
              </span>
            </div>
            <div className="pt-2 border-t border-border flex justify-between items-center text-foreground font-semibold">
              <span>New Total Stock:</span>
              <span className="font-mono text-lg font-bold text-primary">
                {newStock.toLocaleString()} {item.unit}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Quantity to Add ({item.unit}) <span className="text-destructive">*</span>
            </label>
            <Input
              type="number"
              min="0"
              value={addStockAmount}
              onChange={(e) => setAddStockAmount(e.target.value)}
              placeholder="e.g. 1000"
              className="font-mono"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Stock</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
