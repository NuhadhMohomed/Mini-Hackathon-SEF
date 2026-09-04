import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageHeader from '@/components/common/PageHeader';
import StaffOrdersLedger from '@/features/staff-orders/components/StaffOrdersLedger';
import BagTagPrintModal from '@/features/staff-orders/components/BagTagPrintModal';
import { orderService } from '@/features/orders/services/orderService';
import { Loader2 } from 'lucide-react';

export default function ManageOrdersPage() {
  const queryClient = useQueryClient();
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getOrders(),
    staleTime: 1000 * 15,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, newStatus }) => orderService.updateOrderStatus(orderId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const handleUpdateStatus = (orderId, newStatus) => {
    updateStatusMutation.mutate({ orderId, newStatus });
  };

  const handlePrintBagTag = (order) => {
    setSelectedOrderForPrint({
      id: order.id,
      customerName: order.customerName || order.customer,
      phone: order.phone || '+1 (555) 234-5678',
      porchLocker: order.cubbyNumber || 'Porch Locker #04',
      pickupSlot: order.pickupSlot || 'Friday 08:00 AM',
      items: (order.items || []).map((i) => ({ name: i.name, qty: i.qty || i.quantity, unitPrice: i.price || 12.0 })),
      totalAmount: order.total,
      orderDate: order.displayDate || '2026-09-04',
    });
    setPrintModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Order Management"
        subtitle="Live backend orders. Filter by status, inspect item lists, and update hearth order status."
        breadcrumbs={[
          { label: 'Bakehouse Hub', href: '/app' },
          { label: 'Orders' },
        ]}
      />

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground font-mono">Fetching active batch orders...</p>
        </div>
      ) : (
        <StaffOrdersLedger
          orders={orders}
          onUpdateStatus={handleUpdateStatus}
          onPrintBagTag={handlePrintBagTag}
        />
      )}

      <BagTagPrintModal
        open={printModalOpen}
        onOpenChange={setPrintModalOpen}
        order={selectedOrderForPrint}
      />
    </div>
  );
}
