import React from 'react';
import { User, Phone, MapPin, Calendar, Clock, ShoppingBag, ArrowLeft, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function CheckoutReview({
  contactData = {},
  slotData = {},
  items = [],
  subtotal = 0,
  packagingFee = 0,
  total = 0,
  onBack,
  onConfirmReservation,
  onEditContact,
  onEditSlot,
  isProcessing = false,
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
          3. Review &amp; Confirm Batch Reservation
        </h2>
        <p className="text-xs sm:text-sm text-secondary-foreground">
          Please verify your contact details and pickup slot before we allocate today's oven capacity.
        </p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Contact Info Summary Card */}
        <div className="rounded-xl border border-border/80 bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>Contact for SMS Alerts</span>
            </div>
            {onEditContact && (
              <button
                type="button"
                onClick={onEditContact}
                className="text-xs text-primary hover:underline font-semibold"
              >
                Edit
              </button>
            )}
          </div>
          <div className="text-xs sm:text-sm space-y-1">
            <p className="font-semibold text-foreground">{contactData.fullName}</p>
            <p className="text-secondary-foreground font-mono">{contactData.phone}</p>
            {contactData.email && (
              <p className="text-muted-foreground">{contactData.email}</p>
            )}
            {contactData.notes && (
              <p className="text-xs text-secondary-foreground/90 italic pt-1 border-t border-border/40">
                "{contactData.notes}"
              </p>
            )}
          </div>
        </div>

        {/* Pickup Window Summary Card */}
        <div className="rounded-xl border border-border/80 bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Porchside Pickup Window</span>
            </div>
            {onEditSlot && (
              <button
                type="button"
                onClick={onEditSlot}
                className="text-xs text-primary hover:underline font-semibold"
              >
                Edit
              </button>
            )}
          </div>
          <div className="text-xs sm:text-sm space-y-1">
            <p className="font-semibold text-foreground flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span>{slotData.day}</span>
            </p>
            <p className="font-mono text-primary font-semibold">
              {slotData.timeWindow}
            </p>
            <p className="text-muted-foreground flex items-center gap-1 text-[11px] pt-1">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span>42 Orchard Lane · Porch Locker Wall</span>
            </p>
          </div>
        </div>
      </div>

      {/* Itemized Order Ledger */}
      <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <span className="font-serif text-base font-semibold text-foreground">
            Reserved Baked Offerings ({items.length})
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            Hearth Stone Batch #84
          </span>
        </div>

        <div className="divide-y divide-border/50 text-xs sm:text-sm">
          {items.map((item) => (
            <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-xs font-semibold bg-secondary px-2 py-0.5 rounded text-secondary-foreground shrink-0">
                  {item.quantity}×
                </span>
                <span className="font-medium text-foreground truncate">
                  {item.name}
                </span>
              </div>
              <span className="font-mono font-semibold text-foreground shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Pricing Totals */}
        <div className="space-y-1.5 text-xs sm:text-sm pt-1">
          <div className="flex items-center justify-between text-secondary-foreground">
            <span>Items Subtotal:</span>
            <span className="font-mono text-foreground font-medium">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-secondary-foreground">
            <span>Porch Packaging &amp; Locker Fee:</span>
            <span className="font-mono text-foreground font-medium">
              ${packagingFee.toFixed(2)}
            </span>
          </div>
          <div className="flex items-baseline justify-between pt-2 border-t border-border/60 text-base">
            <span className="font-serif font-semibold text-foreground">
              Total Pre-Order Amount:
            </span>
            <span className="font-mono text-2xl font-bold text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Porchside Guarantee Disclaimer */}
      <div className="rounded-xl border border-border/60 bg-surface-container-low/50 p-3.5 flex items-start gap-2.5 text-xs text-muted-foreground">
        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Crumb &amp; Bloom Guarantee:</strong> Your hearth loaves are bagged in eco-friendly breathable linen and reserved exclusively for your selected pickup slot. A digital locker pass and 4-digit cubby PIN will be generated immediately.
        </p>
      </div>

      {/* Final Action Cluster */}
      <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={isProcessing}
          onClick={onBack}
          className="w-full sm:w-auto gap-2 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pickup Slot</span>
        </Button>

        <Button
          type="button"
          disabled={isProcessing}
          onClick={onConfirmReservation}
          className="w-full sm:w-auto gap-2 min-h-[48px] px-8 text-base font-semibold shadow-sm active:scale-[0.99]"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Allocating Batch Capacity...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirm Batch Reservation • ${total.toFixed(2)}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
