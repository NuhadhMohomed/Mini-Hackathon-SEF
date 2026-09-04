import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Wheat,
  Phone,
  HelpCircle,
  Share2,
  Loader2,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/features/orders/services/orderService';
import PickupPass from '@/features/orders/components/PickupPass';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderById(id),
  });

  const [calendarAdded, setCalendarAdded] = useState(false);

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-mono">Generating your digital pickup pass from the hearth...</p>
      </div>
    );
  }

  // 1. Order Not Found State (Graceful fallback)
  if (!order || isError) {
    return (
      <div className="py-16 max-w-lg mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-secondary text-primary mx-auto flex items-center justify-center">
          <Wheat className="w-8 h-8 stroke-[1.5]" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Reservation Record Not Found
          </h1>
          <p className="text-sm text-secondary-foreground leading-relaxed">
            We couldn’t find an artisan reservation with reference{' '}
            <span className="font-mono text-primary font-bold">"{id}"</span>. It may have expired or was scheduled under a different session.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link to="/products">
            <Button className="w-full sm:w-auto gap-2 font-semibold">
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Weekly Bake Menu</span>
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCalendar = () => {
    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Warm Editorial Success Landmark */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pt-2">
        <div className="w-16 h-16 rounded-full bg-success-bg text-success-text border border-success/30 mx-auto flex items-center justify-center shadow-xs">
          <CheckCircle2 className="w-8 h-8 text-success stroke-[2]" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="success" dot={true} className="text-xs px-3 py-1 font-semibold">
            Batch Allotment Secured
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">
            {order.orderNumber || `#${order.id}`}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
          Your Hearth Order is Confirmed
        </h1>
        <p className="text-sm sm:text-base text-secondary-foreground leading-relaxed">
          Our wild levain has begun its slow 36-hour cold ferment. Your handcrafted loaves will be baked fresh on our stone hearth for your reserved pickup window.
        </p>
      </div>

      {/* 2. Main 2-Column Confirmation Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Digital Porchside Pickup Pass */}
        <div className="lg:col-span-7 space-y-6">
          <PickupPass order={order} />

          {/* Porchside Arrival Guide Instructions */}
          <div className="rounded-xl border border-border/70 bg-card p-5 space-y-3">
            <h3 className="font-serif text-base font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>Porchside Pickup Instructions</span>
            </h3>
            <ol className="text-xs sm:text-sm text-secondary-foreground space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                <strong>Arrive at 42 Orchard Lane</strong> during your window:{' '}
                <span className="font-mono font-medium text-foreground">{order.pickupSlot}</span>.
              </li>
              <li>
                <strong>Walk up to the covered porch</strong> locker cubby wall immediately beside the bakery entry.
              </li>
              <li>
                <strong>Enter your 4-digit code ({order.accessPin})</strong> on the touchscreen or hold this pass up to the optical reader.
              </li>
              <li>
                Your designated cubby door (<strong>{order.cubbyNumber}</strong>) will spring open. Your order is wrapped in breathable linen and labeled with your name tag.
              </li>
            </ol>
          </div>
        </div>

        {/* Right Column: Order Items Summary & Helper Services */}
        <div className="lg:col-span-5 space-y-6">
          {/* Itemized Order Breakdown */}
          <Card className="rounded-xl border border-border/80 bg-card p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <h3 className="font-serif text-base font-semibold text-foreground">
                Reserved Offerings
              </h3>
              <span className="font-mono text-xs font-semibold bg-secondary px-2.5 py-0.5 rounded-full text-secondary-foreground">
                {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="divide-y divide-border/50 text-xs sm:text-sm max-h-64 overflow-y-auto pr-1">
              {order.items?.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-muted-foreground font-mono text-[11px]">
                      {item.quantity} × ${item.unitPrice ? item.unitPrice.toFixed(2) : item.price?.toFixed(2)}
                      {item.weight && ` · ${item.weight}`}
                    </p>
                  </div>
                  <span className="font-mono font-semibold text-foreground shrink-0">
                    ${(item.lineTotal || item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Ledger */}
            <div className="space-y-1.5 pt-3 border-t border-border/60 text-xs">
              <div className="flex items-center justify-between text-secondary-foreground">
                <span>Items Subtotal:</span>
                <span className="font-mono text-foreground font-medium">
                  ${order.subtotal?.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-secondary-foreground">
                <span>Porch Packaging Fee:</span>
                <span className="font-mono text-foreground font-medium">
                  ${order.packagingFee?.toFixed(2)}
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-border/60 text-base">
                <span className="font-serif font-semibold text-foreground">
                  Total Paid / Reserved:
                </span>
                <span className="font-mono text-2xl font-bold text-primary">
                  ${order.total?.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Calendar Reminder Button */}
            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddToCalendar}
                className="w-full gap-2 text-xs font-semibold"
              >
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>
                  {calendarAdded ? '✓ Added to Calendar' : 'Add Pickup Reminder to Calendar'}
                </span>
              </Button>
            </div>
          </Card>

          {/* Need Assistance Card */}
          <div className="rounded-xl border border-border/70 bg-surface-container-low/50 p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <HelpCircle className="w-4 h-4 text-primary shrink-0" />
              <span>Need to change pickup time?</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              If your morning schedule shifts, please contact the bakehouse at{' '}
              <strong className="font-mono text-foreground">(555) 382-9104</strong> or reply to your confirmation SMS at least 2 hours before your window.
            </p>
          </div>

          {/* Continue Navigation */}
          <div className="pt-2 flex flex-col gap-2.5">
            <Link to="/products">
              <Button className="w-full gap-2 font-semibold min-h-[44px]">
                <ShoppingBag className="w-4 h-4" />
                <span>Reserve More for Future Hearth Drops</span>
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="w-full text-xs text-muted-foreground">
                Return to Crumb &amp; Bloom Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
