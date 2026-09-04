import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartSummary({
  subtotal = 0,
  packagingFee = 0,
  total = 0,
  itemCount = 0,
  onCheckout,
  isDrawer = false,
}) {
  const isDisabled = itemCount === 0;

  return (
    <Card className={`rounded-xl border border-border/80 bg-card ${isDrawer ? 'shadow-none border-0' : 'p-6 shadow-sm'}`}>
      <CardContent className={isDrawer ? 'p-0 space-y-4' : 'p-0 space-y-5'}>
        {!isDrawer && (
          <h2 className="font-serif text-xl font-semibold text-foreground border-b border-border/60 pb-3">
            Batch Reservation Summary
          </h2>
        )}

        {/* Itemized Line Costs */}
        <div className="space-y-2.5 text-sm">
          <div className="flex items-center justify-between text-secondary-foreground">
            <span>Items Subtotal ({itemCount} {itemCount === 1 ? 'loaf' : 'items'}):</span>
            <span className="font-mono font-medium text-foreground">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between text-secondary-foreground">
            <div className="flex items-center gap-1.5">
              <span>Porch Packaging Fee:</span>
            </div>
            <span className="font-mono font-medium text-foreground">
              ${packagingFee.toFixed(2)}
            </span>
          </div>

          <p className="text-[11px] text-muted-foreground leading-normal">
            Includes reusable linen bread bag &amp; reserved porch locker cubby.
          </p>

          <Separator className="my-2" />

          {/* Grand Total */}
          <div className="flex items-baseline justify-between pt-1">
            <span className="font-serif text-lg font-semibold text-foreground">
              Estimated Total:
            </span>
            <span className="font-mono text-2xl font-bold text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Checkout CTA */}
        <div className="space-y-2 pt-1">
          <Button
            size="lg"
            disabled={isDisabled}
            onClick={onCheckout}
            className="w-full gap-2 text-base font-semibold shadow-sm min-h-[48px] active:scale-[0.99]"
            aria-label={`Proceed to Porchside Checkout with ${itemCount} items for $${total.toFixed(2)}`}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-primary/70 shrink-0" />
            <span>Porchside Locker Pickup at 42 Orchard Lane</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
