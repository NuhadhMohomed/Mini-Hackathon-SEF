export const initialStaffOrdersData = [
  {
    id: 'ORD-1025',
    customer: 'Sarah Jenkins',
    phone: '+1 (555) 234-5678',
    deliveryAddress: '142 Baker Street, Porch Locker #04',
    pickupSlot: 'Friday Nov 15 • 08:00 - 09:30 AM',
    status: 'Pending',
    total: 38.50,
    items: [
      { name: 'Country Sourdough Batard', qty: 2, price: 12.00 },
      { name: 'Organic Wildflower Honey', qty: 1, price: 14.50 },
    ],
  },
  {
    id: 'ORD-1026',
    customer: 'Marcus Vance',
    phone: '+1 (555) 876-5432',
    deliveryAddress: '88 Hearth Lane, Porch Locker #08',
    pickupSlot: 'Friday Nov 15 • 09:30 - 11:00 AM',
    status: 'Processing',
    total: 24.00,
    items: [
      { name: 'Cardamom Morning Buns', qty: 2, price: 6.50 },
      { name: 'Country Sourdough Batard', qty: 1, price: 11.00 },
    ],
  },
  {
    id: 'ORD-1027',
    customer: 'Elena Rostova',
    phone: '+1 (555) 345-6789',
    deliveryAddress: '204 Mill Avenue, Porch Locker #02',
    pickupSlot: 'Friday Nov 15 • 08:00 - 09:30 AM',
    status: 'Ready',
    total: 34.00,
    items: [
      { name: 'Dark Chocolate Fudge Cake', qty: 1, price: 34.00 },
    ],
  },
  {
    id: 'ORD-1028',
    customer: 'David Miller',
    phone: '+1 (555) 987-6543',
    deliveryAddress: '55 Stoneground Way, Porch Locker #12',
    pickupSlot: 'Friday Nov 15 • 11:00 - 12:30 PM',
    status: 'Completed',
    total: 52.00,
    items: [
      { name: 'Country Sourdough Batard', qty: 2, price: 12.00 },
      { name: 'Artisan Red Velvet Cupcakes', qty: 4, price: 4.50 },
      { name: 'Cardamom Morning Buns', qty: 1, price: 10.00 },
    ],
  },
];

export const staffOrderMockService = {
  getOrders: () => initialStaffOrdersData,
  getOrderById: (id) => initialStaffOrdersData.find((o) => o.id === id) || initialStaffOrdersData[0],
};
