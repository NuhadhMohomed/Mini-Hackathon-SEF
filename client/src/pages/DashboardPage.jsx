import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader';
import BentoMetrics from '@/features/dashboard/components/BentoMetrics';
import RecentOrdersQueue from '@/features/dashboard/components/RecentOrdersQueue';
import { dashboardMockService } from '@/features/dashboard/services/dashboardMockService';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(dashboardMockService.getSummaryMetrics());
  const [recentOrders, setRecentOrders] = useState(dashboardMockService.getRecentOrders());

  return (
    <div className="space-y-8">
      <PageHeader
        title="Owner Dashboard"
        subtitle="Overview of total orders, sales metrics, and recent patron orders."
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
