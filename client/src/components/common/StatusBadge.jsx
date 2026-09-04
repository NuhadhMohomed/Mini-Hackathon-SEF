import React from 'react';
import { Clock, Flame, CheckCircle, PackageCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StatusBadge({ status = 'pending', label, className }) {
  const normStatus = (status || '').toLowerCase();

  let config = {
    bg: 'bg-[#FEF3E2] text-[#8A4A00] border-[#F4D3A1]',
    dot: 'bg-[#D97706]',
    icon: Clock,
    defaultLabel: 'Pending',
  };

  if (normStatus === 'pending') {
    config = {
      bg: 'bg-[#FEF3E2] text-[#8A4A00] border-[#F4D3A1]',
      dot: 'bg-[#D97706]',
      icon: Clock,
      defaultLabel: 'Pending',
    };
  } else if (normStatus === 'baking' || normStatus === 'processing') {
    config = {
      bg: 'bg-[#FCEEE6] text-[#712F0F] border-[#E8C2AF]',
      dot: 'bg-[#C05621]',
      icon: Flame,
      defaultLabel: 'Baking / In Hearth',
    };
  } else if (normStatus === 'porchside' || normStatus === 'ready') {
    config = {
      bg: 'bg-[#E8EFE9] text-[#2D4733] border-[#C2D7C6]',
      dot: 'bg-[#4A6B53]',
      icon: CheckCircle,
      defaultLabel: 'Ready for Pickup',
    };
  } else if (normStatus === 'fulfilled' || normStatus === 'completed') {
    config = {
      bg: 'bg-muted/70 text-secondary-foreground border-border',
      dot: 'bg-muted-foreground',
      icon: PackageCheck,
      defaultLabel: 'Completed',
    };
  } else if (normStatus === 'in-stock') {
    config = {
      bg: 'bg-[#E8EFE9] text-[#2D4733] border-[#C2D7C6]',
      dot: 'bg-[#4A6B53]',
      icon: CheckCircle,
      defaultLabel: 'In Stock',
    };
  } else if (normStatus === 'out-of-stock' || normStatus === 'insufficient') {
    config = {
      bg: 'bg-[#FDE8E8] text-[#7F1D1D] border-[#F8B4B4]',
      dot: 'bg-[#BA1A1A]',
      icon: AlertCircle,
      defaultLabel: 'Out of Stock',
    };
  }

  const Icon = config.icon;
  const displayLabel = label || config.defaultLabel;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border select-none shrink-0 font-sans',
        config.bg,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', config.dot)} aria-hidden="true" />
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{displayLabel}</span>
    </span>
  );
}
