import React from 'react';
import { Printer, Flame, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function BagTagPrintModal({ open, onOpenChange, order }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-primary" />
            <span>Artisan Bag Tag Print Preview</span>
          </DialogTitle>
          <DialogDescription>
            Tactile kraft parcel tag for affixing to linen loaf pouches &amp; porch lockers.
          </DialogDescription>
        </DialogHeader>

        {/* Printable Physical Slip */}
        <div className="bg-[#FAF7F2] p-5 rounded-xl border-2 border-dashed border-[#D8CFC4] text-foreground font-sans space-y-4 my-2 select-text shadow-sm">
          {/* Header */}
          <div className="text-center border-b border-border pb-3">
            <div className="flex items-center justify-center gap-1.5 text-primary">
              <Flame className="w-4 h-4 fill-primary/20" />
              <span className="font-serif font-bold tracking-tight text-sm uppercase">
                Crumb &amp; Bloom Bakehouse
              </span>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">
              Natural Leaven Hearth Bag Tag
            </p>
          </div>

          {/* Key Order Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Order Reference
              </span>
              <span className="font-mono text-base font-bold text-primary">
                #{order.id}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Locker / Cubby
              </span>
              <span className="font-semibold text-foreground bg-[#F6F3EE] px-2 py-0.5 rounded border border-border inline-block">
                {order.porchLocker || 'Porch Locker #04'}
              </span>
            </div>
          </div>

          {/* Customer */}
          <div className="border-t border-border pt-2 text-xs">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
              Customer
            </span>
            <div className="font-semibold text-foreground text-sm">{order.customerName}</div>
            <div className="text-muted-foreground font-mono">{order.phone}</div>
          </div>

          {/* Pickup Window */}
          <div className="bg-[#F0EDE9] p-2.5 rounded-lg text-xs space-y-0.5">
            <span className="text-[10px] uppercase font-semibold text-secondary block">
              Scheduled Pickup Window
            </span>
            <span className="font-semibold text-foreground block">
              {order.pickupSlot || 'Friday Nov 15 • 08:00 - 09:30 AM'}
            </span>
          </div>

          {/* Items Itemized */}
          <div className="border-t border-border pt-2 text-xs space-y-1.5">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
              Reserved Hearth Bakes
            </span>
            <ul className="divide-y divide-border/60">
              {order.items?.map((item, idx) => (
                <li key={idx} className="py-1 flex justify-between items-center text-xs">
                  <span>
                    <strong className="font-mono text-primary mr-1">{item.qty}x</strong>{' '}
                    {item.name}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    ${((item.unitPrice || 0) * item.qty).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Total & Footer Note */}
          <div className="border-t-2 border-border pt-2 flex justify-between items-baseline">
            <span className="font-serif font-bold text-sm">Total Paid:</span>
            <span className="font-mono text-base font-bold text-primary">
              ${(order.totalAmount || 0).toFixed(2)}
            </span>
          </div>

          <p className="text-[9px] text-center text-muted-foreground italic pt-1">
            "Baked with wild yeast, stone-ground grain, and hearth fire."
          </p>
        </div>

        <DialogFooter className="pt-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button type="button" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            <span>Print Tag</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
