import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import StaffOrdersLedger from '@/features/staff-orders/components/StaffOrdersLedger';
import BagTagPrintModal from '@/features/staff-orders/components/BagTagPrintModal';
import { staffOrderMockService } from '@/features/staff-orders/services/staffOrderMockService';

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState(staffOrderMockService.getOrders());
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState(null);

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handlePrintBagTag = (order) => {
    setSelectedOrderForPrint({
      id: order.id,
      customerName: order.customer,
      phone: order.phone || '+1 (555) 234-5678',
      porchLocker: 'Porch Locker #04',
      pickupSlot: order.pickupSlot || 'Friday 08:00 AM',
      items: order.items.map((i) => ({ name: i.name, qty: i.qty, unitPrice: i.price || 12.0 })),
      totalAmount: order.total,
      orderDate: '2026-09-04',
    });
    setPrintModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Order Management"
        subtitle="Search, filter by status (All, Pending, Processing, Ready, Completed), and update order status."
        breadcrumbs={[
          { label: 'Bakehouse Hub', href: '/app' },
          { label: 'Orders' },
        ]}
      />

      <StaffOrdersLedger
        orders={orders}
        onUpdateStatus={handleUpdateStatus}
        onPrintBagTag={handlePrintBagTag}
      />

      <BagTagPrintModal
        open={printModalOpen}
        onOpenChange={setPrintModalOpen}
        order={selectedOrderForPrint}
      />
    </div>
  );
}
