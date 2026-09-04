import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive-bg text-destructive-text border-destructive/20',
        outline: 'border-border text-foreground bg-card',
        success: 'border-transparent bg-success-bg text-success-text border-success/20',
        warning: 'border-transparent bg-warning-bg text-warning-text border-warning/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant = 'default', dot = false, dotClass, children, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            'inline-block h-1.5 w-1.5 rounded-full shrink-0',
            variant === 'success' && 'bg-success',
            variant === 'warning' && 'bg-warning animate-pulse',
            variant === 'destructive' && 'bg-destructive',
            variant === 'default' && 'bg-primary-foreground',
            (!variant || variant === 'secondary' || variant === 'outline') && 'bg-muted-foreground',
            dotClass
          )}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
