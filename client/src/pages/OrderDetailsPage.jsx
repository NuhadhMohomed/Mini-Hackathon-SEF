import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, ShieldCheck, Printer, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageHeader from '@/components/common/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/common/StatusBadge';
import ReadinessSummaryBanner from '@/features/readiness/components/ReadinessSummaryBanner';
import ReadinessTable from '@/features/readiness/components/ReadinessTable';
import BagTagPrintModal from '@/features/staff-orders/components/BagTagPrintModal';
import { calculateOrderReadiness } from '@/features/readiness/services/readinessCalculator';
import { orderService } from '@/features/orders/services/orderService';
import { inventoryService } from '@/features/inventory/services/inventoryService';

const WORKFLOW_STAGES = ['Pending', 'Processing', 'Ready', 'Completed'];

export default function OrderDetailsPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [showReadiness, setShowReadiness] = useState(true);

  const { data: order, isLoading: isOrderLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderById(id),
  });

  const { data: inventory = [] } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => inventoryService.getInventory(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus) => orderService.updateOrderStatus(order?.orderId || order?.id || id, newStatus),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const handleUpdateStatus = (newStatus) => {
    updateStatusMutation.mutate(newStatus);
  };

  const getStatusType = (status) => {
    switch (status) {
      case 'Pending': return 'pending';
      case 'Processing': return 'baking';
      case 'Ready': return 'porchside';
      case 'Completed': return 'fulfilled';
      default: return 'pending';
    }
  };

  if (isOrderLoading || !order) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-mono">Loading order details...</p>
      </div>
    );
  }

  const customerName = order.customerName || (typeof order.customer === 'string' ? order.customer : order.customer?.name) || 'Patron';
  const customerPhone = order.phone || order.customer?.phone || '+1 (555) 234-5678';
  const customerAddress = order.deliveryAddress || order.customer?.address || '42 Orchard Lane Porchside Locker';
  const orderItems = order.items || [];
  const readinessResult = calculateOrderReadiness(orderItems, inventory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/app/orders">
          <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Orders</span>
          </Button>
        </Link>
      </div>

      <PageHeader
        title={`Order Details #${order.orderId || order.id}`}
        subtitle={`Customer: ${customerName}`}
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-xs"
              onClick={() => setPrintModalOpen(true)}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Bag Tag</span>
            </Button>
            <StatusBadge status={getStatusType(order.status)} label={order.status} />
          </div>
        }
      />

      {/* 1. Workflow Progression Buttons */}
      <Card tactile className="p-4 space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sans">
          Order Status Progression (Live Database Persistence)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {WORKFLOW_STAGES.map((st) => {
            const isCurrent = order.status === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => handleUpdateStatus(st)}
                disabled={updateStatusMutation.isPending}
                className={`p-2.5 rounded-lg border text-xs font-semibold transition-all text-center cursor-pointer ${
                  isCurrent
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-surface-container-low border-border text-secondary-foreground hover:bg-surface-container'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </Card>

      {/* 2. Customer, Phone, Delivery Address, Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card tactile className="p-4 space-y-3">
          <h3 className="font-serif text-base font-semibold text-foreground border-b border-border pb-2">
            Customer Information
          </h3>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-muted-foreground block">Customer Name</span>
              <span className="font-semibold text-foreground text-sm">{customerName}</span>
            </div>
            <div className="flex items-center gap-2 text-secondary-foreground">
              <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{customerPhone}</span>
            </div>
            <div className="flex items-start gap-2 text-secondary-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>{customerAddress}</span>
            </div>
          </div>
        </Card>

        <Card tactile className="p-4 space-y-3 md:col-span-2">
          <h3 className="font-serif text-base font-semibold text-foreground border-b border-border pb-2 flex justify-between">
            <span>Ordered Products</span>
            <span className="font-mono text-primary font-bold">Total: ${(Number(order.total) || 0).toFixed(2)}</span>
          </h3>
          <ul className="divide-y divide-border text-xs">
            {orderItems.map((item, idx) => (
              <li key={idx} className="py-2.5 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-foreground">{item.name}</span>
                  <span className="text-muted-foreground block">
                    Quantity: {item.qty || item.quantity} x ${(item.price || item.unitPrice || 0).toFixed(2)}
                  </span>
                </div>
                <span className="font-mono font-semibold text-foreground">
                  ${((item.qty || item.quantity) * (item.price || item.unitPrice || 0)).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 3. Ingredient Readiness Section / Clear Path CTA */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Check Ingredient Readiness
            </h2>
          </div>
          <Button
            variant={showReadiness ? 'secondary' : 'default'}
            size="sm"
            onClick={() => setShowReadiness(!showReadiness)}
          >
            {showReadiness ? 'Hide Readiness Audit' : 'Check Ingredients'}
          </Button>
        </div>

        {showReadiness && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <ReadinessSummaryBanner
              isReady={readinessResult.isReady}
              deficitCount={readinessResult.deficitCount}
            />
            <ReadinessTable auditRows={readinessResult.auditRows} />
          </div>
        )}
      </div>

      <BagTagPrintModal
        open={printModalOpen}
        onOpenChange={setPrintModalOpen}
        order={{
          id: order.orderId || order.id,
          customerName,
          phone: customerPhone,
          porchLocker: order.cubbyNumber || 'Porch Locker #04',
          pickupSlot: order.pickupSlot || 'Friday 08:00 AM',
          items: orderItems.map((i) => ({ name: i.name, qty: i.qty || i.quantity, unitPrice: i.price || 12.0 })),
          totalAmount: order.total,
          orderDate: order.displayDate || '2026-09-04',
        }}
      />
    </div>
  );
}
