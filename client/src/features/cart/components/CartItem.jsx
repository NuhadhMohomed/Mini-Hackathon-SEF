import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import QuantityControl from '@/components/common/QuantityControl';

export default function CartItem({ item, onUpdateQuantity, onRemove, compact = false }) {
  const lineTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="flex items-start gap-3 sm:gap-4 py-3.5 border-b border-border/60 last:border-b-0 group">
      {/* Product Image Thumbnail */}
      <Link
        to={`/products/${item.id}`}
        className="relative aspect-square w-16 sm:w-20 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </Link>

      {/* Item Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/products/${item.id}`}
            className="font-serif text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors leading-snug line-clamp-1"
          >
            {item.name}
          </Link>
          <span className="font-mono text-sm sm:text-base font-semibold text-primary shrink-0">
            ${lineTotal}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span>${item.price.toFixed(2)} each</span>
          {item.weight && <span>•</span>}
          {item.weight && <span>{item.weight}</span>}
        </div>

        {/* Quantity Controls & Remove Action */}
        <div className="flex items-center justify-between pt-2 gap-2">
          <QuantityControl
            quantity={item.quantity}
            onQuantityChange={(newQty) => onUpdateQuantity?.(item.id, newQty)}
            min={1}
            max={item.remainingAllotment || 99}
            size={compact ? 'sm' : 'default'}
          />

          <button
            type="button"
            onClick={() => onRemove?.(item.id)}
            aria-label={`Remove ${item.name} from basket`}
            className="text-muted-foreground hover:text-destructive p-1.5 rounded-md hover:bg-destructive-bg transition-colors duration-150 flex items-center gap-1 text-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {!compact && <span className="hidden sm:inline">Remove</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
