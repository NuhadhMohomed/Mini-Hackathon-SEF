import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuantityControl({
  quantity = 1,
  onQuantityChange,
  min = 1,
  max = 99,
  disabled = false,
  className,
  size = 'default', // 'sm' | 'default' | 'lg'
}) {
  const handleDecrement = () => {
    if (disabled || quantity <= min) return;
    onQuantityChange?.(quantity - 1);
  };

  const handleIncrement = () => {
    if (disabled || quantity >= max) return;
    onQuantityChange?.(quantity + 1);
  };

  const isMin = quantity <= min || disabled;
  const isMax = quantity >= max || disabled;

  const buttonSizeClass =
    size === 'sm'
      ? 'w-8 h-8'
      : size === 'lg'
      ? 'w-11 h-11'
      : 'w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px]';

  const textClass =
    size === 'sm'
      ? 'w-8 text-xs font-mono'
      : size === 'lg'
      ? 'w-12 text-base font-mono'
      : 'w-10 text-sm font-mono';

  return (
    <div
      role="group"
      aria-label="Quantity adjustment"
      className={cn(
        'inline-flex items-center rounded-lg border border-input bg-card p-0.5 shadow-xs transition-colors',
        disabled && 'opacity-60 pointer-events-none',
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={isMin}
        aria-label="Decrease quantity"
        className={cn(
          buttonSizeClass,
          'flex items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        )}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          textClass,
          'text-center font-semibold text-foreground select-none'
        )}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={isMax}
        aria-label="Increase quantity"
        className={cn(
          buttonSizeClass,
          'flex items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        )}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
