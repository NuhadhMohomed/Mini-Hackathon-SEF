import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  QrCode,
  RotateCcw,
  ChevronRight,
  Package,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function CustomerOrderCard({ order, onReorder, isReordering = false }) {
  if (!order) return null;

  const isActive = order.isActive !== false && order.status !== 'Fulfilled' && order.status !== 'Cancelled';

  return (
    <Card className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs hover:border-primary/40 transition-all duration-200">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 pb-3 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/10">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-base sm:text-lg font-bold text-primary">
            {order.orderNumber || `#${order.id}`}
          </span>
          <span className="text-xs text-muted-foreground font-sans">
            Placed {order.displayDate || 'Recently'}
          </span>
          <Badge
            variant={order.statusVariant || (isActive ? 'success' : 'secondary')}
            dot={isActive}
            className="text-xs font-semibold py-0.5"
          >
            {order.status}
          </Badge>
        </div>

        {/* Quick Access to Pass if Active */}
        {isActive && (
          <Link to={`/order-confirmation/${order.id}`}>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs font-semibold h-8 w-full sm:w-auto"
            >
              <QrCode className="w-3.5 h-3.5 text-primary" />
              <span>View Pickup Pass</span>
            </Button>
          </Link>
        )}
      </div>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Pickup Location & PIN Banner (for active pickups) */}
        {isActive && (
          <div className="rounded-lg border border-input/80 bg-surface-container-low/70 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="space-y-0.5">
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider font-semibold block">
                Pickup Slot &amp; Locker Location
              </span>
              <p className="font-mono font-medium text-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{order.pickupSlot}</span>
              </p>
              <p className="text-secondary-foreground text-[11px] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                <span>{order.pickupLocation || '42 Orchard Lane'}</span>
              </p>
            </div>

            {order.accessPin && (
              <div className="flex items-center sm:flex-col sm:items-end gap-2 sm:gap-0 shrink-0 bg-card sm:bg-transparent p-2 sm:p-0 rounded border sm:border-0 border-border/60">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                  Locker PIN
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-foreground tracking-widest bg-secondary px-2.5 py-0.5 rounded">
                  {order.accessPin}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Ordered Offerings List */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">
            Hearth Loaves &amp; Pastries ({order.items?.length || 0})
          </span>
          <div className="divide-y divide-border/40 text-xs sm:text-sm">
            {order.items?.map((item, idx) => (
              <div key={item.id || idx} className="py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-xs font-semibold bg-secondary px-2 py-0.5 rounded text-secondary-foreground shrink-0">
                    {item.quantity}×
                  </span>
                  <span className="font-medium text-foreground truncate">
                    {item.name}
                  </span>
                  {item.weight && (
                    <span className="text-muted-foreground text-[11px] font-mono hidden sm:inline">
                      ({item.weight})
                    </span>
                  )}
                </div>
                <span className="font-mono font-medium text-foreground shrink-0">
                  ${(item.lineTotal || (item.unitPrice || item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Footer Ledger & Re-order Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-muted-foreground">Total Paid:</span>
            <span className="font-mono text-lg font-bold text-primary">
              ${order.total?.toFixed(2)}
            </span>
            <span className="text-[11px] text-muted-foreground">
              (inc. $1.50 porch packaging)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={isReordering}
              onClick={() => onReorder?.(order)}
              className="gap-1.5 text-xs font-medium w-full sm:w-auto"
              aria-label={`Re-order items from ${order.orderNumber}`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-primary" />
              <span>Re-order Batch</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
