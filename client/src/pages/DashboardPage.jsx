import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '@/components/common/PageHeader';
import BentoMetrics from '@/features/dashboard/components/BentoMetrics';
import RecentOrdersQueue from '@/features/dashboard/components/RecentOrdersQueue';
import { orderService } from '@/features/orders/services/orderService';
import { dashboardMockService } from '@/features/dashboard/services/dashboardMockService';

export default function DashboardPage() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getOrders(),
    staleTime: 1000 * 15,
  });

  const metrics = useMemo(() => {
    if (!orders || orders.length === 0) {
      return dashboardMockService.getSummaryMetrics();
    }
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
    const processingOrders = orders.filter((o) => o.status === 'Processing').length;
    const completedOrders = orders.filter((o) => o.status === 'Completed').length;
    const totalSales = Number(
      orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0).toFixed(2)
    );

    return {
      totalOrders,
      pendingOrders,
      processingOrders,
      completedOrders,
      totalSales,
    };
  }, [orders]);

  const recentOrders = useMemo(() => {
    if (!orders || orders.length === 0) {
      return dashboardMockService.getRecentOrders();
    }
    return orders.slice(0, 5).map((o) => ({
      id: o.orderId || o.id,
      customer: o.customerName || o.customer?.name || (typeof o.customer === 'string' ? o.customer : 'Artisan Patron'),
      total: o.total,
      status: o.status,
    }));
  }, [orders]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Owner Dashboard"
        subtitle="Live overview of total orders, sales metrics, and recent patron orders persisted in the bakery database."
        breadcrumbs={[
          { label: 'Bakehouse Hub', href: '/app' },
          { label: 'Dashboard' },
        ]}
      />

      {/* 1. Metric Bento Grid */}
      <BentoMetrics metrics={metrics} />

      {/* 2. Recent Orders Queue */}
      <RecentOrdersQueue orders={recentOrders} />
    </div>
  );
}
