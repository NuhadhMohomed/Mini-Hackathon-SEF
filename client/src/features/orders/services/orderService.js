import { api } from '@/lib/api';
import { initialStaffOrdersData } from '@/features/staff-orders/services/staffOrderMockService';

export function transformBackendOrder(bo) {
  if (!bo) return null;

  const orderId = bo.orderId || bo.id || bo._id;
  const customerName = bo.customer?.name || (typeof bo.customer === 'string' ? bo.customer : 'Valued Patron');
  const customerPhone = bo.customer?.phone || '+1 (555) 000-0000';
  const customerEmail = bo.customer?.email || '';
  const customerNotes = bo.customer?.notes || '';
  const customerAddress = bo.customer?.address || '42 Orchard Lane Porchside Locker';

  const items = (bo.items || []).map((item) => ({
    id: item.productId || item.id || `item-${Date.now()}`,
    productId: item.productId || item.id,
    name: item.name || item.productName || 'Artisan Bake',
    quantity: Number(item.quantity || item.qty || 1),
    qty: Number(item.quantity || item.qty || 1),
    price: Number(item.price || item.unitPrice || 0),
  }));

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  const total = Number(bo.total || (subtotal + 1.5).toFixed(2));

  // Map status to customer-facing display
  let statusVariant = 'warning';
  if (bo.status === 'Processing') statusVariant = 'default';
  if (bo.status === 'Ready') statusVariant = 'success';
  if (bo.status === 'Completed') statusVariant = 'success';
  if (bo.status === 'Cancelled') statusVariant = 'destructive';

  const isActive = bo.status !== 'Completed' && bo.status !== 'Cancelled';

  return {
    id: orderId,
    _id: bo._id,
    orderId,
    orderNumber: `#${orderId}`,
    createdAt: bo.createdAt || new Date().toISOString(),
    displayDate: bo.createdAt
      ? new Date(bo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Today',
    status: bo.status || 'Pending',
    statusVariant,
    isActive,
    type: isActive ? 'active' : 'past',
    pickupSlot: bo.pickupSlot || 'Friday Nov 15 • 08:30 - 09:30 AM',
    pickupLocation: customerAddress,
    deliveryAddress: customerAddress,
    pickupCode: `CRUMB-${bo.pickupPin || '4289'}`,
    cubbyNumber: bo.porchLocker || 'Porch Cubby B-3',
    accessPin: bo.pickupPin || '4289',
    customer: {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      address: customerAddress,
      notes: customerNotes,
      smsAlerts: true,
    },
    // For staff components that expect customer string and phone
    customerName,
    phone: customerPhone,
    items,
    subtotal,
    packagingFee: 1.5,
    total,
    notes: customerNotes,
  };
}

export const orderService = {
  async getOrders(statusFilter) {
    try {
      const endpoint = statusFilter && statusFilter !== 'All'
        ? `/orders?status=${encodeURIComponent(statusFilter)}`
        : '/orders';
      const res = await api.get(endpoint);
      const list = res.data || res.orders || (Array.isArray(res) ? res : []);
      if (list.length > 0) {
        return list.map(transformBackendOrder);
      }
      return initialStaffOrdersData.map(transformBackendOrder);
    } catch (error) {
      console.warn('Backend orders fetch failed, using fallback:', error.message);
      return initialStaffOrdersData.map(transformBackendOrder);
    }
  },

  async getOrderById(id) {
    try {
      const res = await api.get(`/orders/${id}`);
      const raw = res.data || res.order || res;
      if (raw && (raw.orderId || raw._id || raw.id)) {
        return transformBackendOrder(raw);
      }
      const match = initialStaffOrdersData.find((o) => o.id === id);
      return match ? transformBackendOrder(match) : null;
    } catch (error) {
      console.warn(`Order ${id} fetch error, using local fallback:`, error.message);
      const match = initialStaffOrdersData.find((o) => o.id === id);
      return match ? transformBackendOrder(match) : null;
    }
  },

  async createOrder({ customer, items, pickupSlot }) {
    const payload = {
      customer: {
        name: customer.fullName || customer.name,
        phone: customer.phone,
        email: customer.email || '',
        address: '42 Orchard Lane Porchside Locker',
        notes: customer.notes || '',
      },
      items: items.map((i) => ({
        productId: i.id || i.productId,
        name: i.name,
        quantity: Number(i.quantity || 1),
        price: Number(i.price || 0),
      })),
      pickupSlot: pickupSlot?.timeWindow
        ? `${pickupSlot.day || 'Friday Nov 15'} • ${pickupSlot.timeWindow}`
        : (typeof pickupSlot === 'string' ? pickupSlot : 'Friday Nov 15 • 08:30 - 09:30 AM'),
    };

    const res = await api.post('/orders', payload);
    return res.data ? transformBackendOrder(res.data) : res;
  },

  async updateOrderStatus(id, newStatus) {
    const res = await api.put(`/orders/${id}`, { status: newStatus });
    return res.data ? transformBackendOrder(res.data) : res;
  },
};

export default orderService;
