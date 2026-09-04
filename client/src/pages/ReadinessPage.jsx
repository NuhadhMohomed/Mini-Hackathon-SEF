import React, { useState } from 'react';
import { ShieldCheck, Package, Flame, AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReadinessSummaryBanner from '@/features/readiness/components/ReadinessSummaryBanner';
import ReadinessTable from '@/features/readiness/components/ReadinessTable';
import { calculateOrderReadiness } from '@/features/readiness/services/readinessCalculator';
import { initialStaffOrdersData } from '@/features/staff-orders/services/staffOrderMockService';
import { initialLarderInventory } from '@/features/inventory/services/inventoryMockService';

export default function ReadinessPage() {
  const [selectedOrderId, setSelectedOrderId] = useState('ALL');
  const [inventory] = useState(initialLarderInventory);

  // Aggregate items across all pending/processing orders or pick specific order
  const activeOrders = initialStaffOrdersData.filter(
    (o) => o.status === 'Pending' || o.status === 'Processing' || o.status === 'Ready'
  );

  let itemsToAudit = [];
  if (selectedOrderId === 'ALL') {
    // Combine all active orders
    const combined = [];
    activeOrders.forEach((o) => {
      o.items.forEach((item) => {
        const existing = combined.find((c) => c.name === item.name);
        if (existing) {
          existing.qty += item.qty;
        } else {
          combined.push({ ...item });
        }
      });
    });
    itemsToAudit = combined;
  } else {
    const found = initialStaffOrdersData.find((o) => o.id === selectedOrderId);
    itemsToAudit = found ? found.items : [];
  }

  const readinessResult = calculateOrderReadiness(itemsToAudit, inventory);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ingredient Readiness Engine"
        subtitle="Batch audit grain, dairy, and botanical requirements against live larder stock before firing the hearth."
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
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedOrderId === 'ALL'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-surface-container text-secondary-foreground hover:bg-surface-container-high'
            }`}
          >
            All Active Orders ({activeOrders.length})
          </button>

          {activeOrders.map((ord) => (
            <button
              key={ord.id}
              type="button"
              onClick={() => setSelectedOrderId(ord.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-colors ${
                selectedOrderId === ord.id
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-surface-container text-secondary-foreground hover:bg-surface-container-high'
              }`}
            >
              #{ord.id}
            </button>
          ))}
        </div>
      </div>

      {/* Readiness Summary Banner */}
      <ReadinessSummaryBanner
        isReady={readinessResult.isReady}
        deficitCount={readinessResult.deficitCount}
      />

      {/* Audit Detail Breakdown */}
      <ReadinessTable auditRows={readinessResult.auditRows} />
    </div>
  );
}
