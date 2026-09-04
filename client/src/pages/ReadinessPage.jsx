import React, { useState } from 'react';
import { ShieldCheck, Package, Flame, AlertTriangle, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '@/components/common/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReadinessSummaryBanner from '@/features/readiness/components/ReadinessSummaryBanner';
import ReadinessTable from '@/features/readiness/components/ReadinessTable';
import { calculateOrderReadiness } from '@/features/readiness/services/readinessCalculator';
import { orderService } from '@/features/orders/services/orderService';
import { inventoryService } from '@/features/inventory/services/inventoryService';

export default function ReadinessPage() {
  const [selectedOrderId, setSelectedOrderId] = useState('ALL');

  const { data: orders = [], isLoading: isOrdersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getOrders(),
  });

  const { data: inventory = [], isLoading: isInventoryLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => inventoryService.getInventory(),
  });

  // Aggregate items across all pending/processing/ready orders or pick specific order
  const activeOrders = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Processing' || o.status === 'Ready'
  );

  let itemsToAudit = [];
  if (selectedOrderId === 'ALL') {
    // Combine all active orders
    const combined = [];
    activeOrders.forEach((o) => {
      (o.items || []).forEach((item) => {
        const itemName = item.name || '';
        const itemQty = item.qty || item.quantity || 1;
        const existing = combined.find((c) => c.name.toLowerCase() === itemName.toLowerCase());
        if (existing) {
          existing.qty += itemQty;
        } else {
          combined.push({ ...item, qty: itemQty });
        }
      });
    });
    itemsToAudit = combined;
  } else {
    const found = orders.find((o) => o.id === selectedOrderId || o.orderId === selectedOrderId);
    itemsToAudit = (found?.items || []).map((i) => ({ ...i, qty: i.qty || i.quantity || 1 }));
  }

  const readinessResult = calculateOrderReadiness(itemsToAudit, inventory);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ingredient Readiness Engine"
        subtitle="Batch audit grain, dairy, and botanical requirements against live larder stock in the bakery database."
        breadcrumbs={[
          { label: 'Bakehouse Hub', href: '/app' },
          { label: 'Readiness Engine' },
        ]}
      />

      {/* Scope Selector Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card p-3 rounded-xl border border-border">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm text-foreground">Audit Scope:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedOrderId('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedOrderId === 'ALL'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-surface-container text-secondary-foreground hover:bg-surface-container-high'
            }`}
          >
            All Active Orders ({activeOrders.length})
          </button>

          {activeOrders.map((ord) => (
            <button
              key={ord.id || ord.orderId}
              type="button"
              onClick={() => setSelectedOrderId(ord.id || ord.orderId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedOrderId === (ord.id || ord.orderId)
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-surface-container text-secondary-foreground hover:bg-surface-container-high'
              }`}
            >
              #{ord.orderId || ord.id}
            </button>
          ))}
        </div>
      </div>

      {isOrdersLoading || isInventoryLoading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground font-mono">Running ingredient deficit audit...</p>
        </div>
      ) : (
        <>
          {/* Readiness Summary Banner */}
          <ReadinessSummaryBanner
            isReady={readinessResult.isReady}
            deficitCount={readinessResult.deficitCount}
          />

          {/* Audit Detail Breakdown */}
          <ReadinessTable auditRows={readinessResult.auditRows} />
        </>
      )}
    </div>
  );
}
