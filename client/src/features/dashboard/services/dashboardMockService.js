export const dashboardMockService = {
  getSummaryMetrics: () => ({
    totalOrders: 45,
    pendingOrders: 12,
    processingOrders: 18,
    completedOrders: 15,
    totalSales: 1485.50,
  }),
  getRecentOrders: () => [
    {
      id: 'ORD-1025',
      customer: 'Sarah Jenkins',
      total: 38.50,
      status: 'Pending',
    },
    {
      id: 'ORD-1026',
      customer: 'Marcus Vance',
      total: 24.00,
      status: 'Processing',
    },
    {
      id: 'ORD-1027',
      customer: 'Elena Rostova',
      total: 34.00,
      status: 'Ready',
    },
    {
      id: 'ORD-1028',
      customer: 'David Miller',
      total: 52.00,
      status: 'Completed',
    },
  ],
};
