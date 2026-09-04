import React from 'react';
import { ShoppingBag, Clock, Flame, CheckCircle2, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function BentoMetrics({ metrics }) {
  const cards = [
    {
      title: 'TOTAL ORDERS',
      value: metrics.totalOrders,
      subtitle: 'All drop pre-orders',
      icon: ShoppingBag,
      iconBg: 'bg-primary/10 text-primary',
    },
    {
      title: 'PENDING ORDERS',
      value: metrics.pendingOrders,
      subtitle: 'Awaiting allocation',
      icon: Clock,
      iconBg: 'bg-warning/10 text-warning',
    },
    {
      title: 'PROCESSING ORDERS',
      value: metrics.processingOrders,
      subtitle: 'In oven / proofing',
      icon: Flame,
      iconBg: 'bg-primary/10 text-primary',
    },
    {
      title: 'COMPLETED ORDERS',
      value: metrics.completedOrders,
      subtitle: 'Picked up at porch',
      icon: CheckCircle2,
      iconBg: 'bg-success/10 text-success',
    },
    {
      title: 'TOTAL SALES',
      value: `$${metrics.totalSales.toFixed(2)}`,
      subtitle: 'Revenue this drop',
      icon: DollarSign,
      iconBg: 'bg-success/10 text-success',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card
            key={idx}
            tactile
            className="p-4 space-y-2 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground font-sans">
                {card.title}
              </span>
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-foreground tracking-tight">
                {card.value}
              </div>
              <p className="text-xs text-secondary-foreground font-body-sm mt-0.5">
                {card.subtitle}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
