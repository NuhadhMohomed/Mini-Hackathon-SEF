/**
 * Crumb & Bloom Artisan Bakery — Customer Order Mock Data
 * Aligned with client/DESIGN.md & client/FRONTEND_RULES.md
 *
 * Supports:
 * - Active pickups vs past hearth drops
 * - Digital Porchside Pickup Pass (Pickup Code, Cubby #, Time Slot, Address)
 * - Itemized billing breakdown (Subtotal, Packaging Fee, Total)
 */

export const MOCK_ORDERS = [
  {
    id: 'ORD-1025',
    orderNumber: '#ORD-1025',
    createdAt: '2026-11-14T08:15:00Z',
    displayDate: 'Nov 14, 2026',
    status: 'Ready for Porch',
    statusVariant: 'success', // matches Badge variant
    isActive: true,
    type: 'active',
    pickupSlot: 'Friday Nov 15 · 08:30 – 10:00 AM',
    pickupLocation: 'Crumb & Bloom Porchside Locker, 42 Orchard Lane',
    pickupCode: 'CRUMB-8492',
    cubbyNumber: 'Porch Cubby B-4',
    accessPin: '8492',
    customer: {
      name: 'Eleanor Vance',
      phone: '(555) 382-9104',
      email: 'eleanor.vance@example.com',
      smsAlerts: true,
    },
    items: [
      {
        id: 'item-1',
        productId: 'prod-country-sourdough',
        name: 'Country Sourdough Boule',
        weight: '850g',
        quantity: 1,
        unitPrice: 14.0,
        lineTotal: 14.0,
      },
      {
        id: 'item-2',
        productId: 'prod-cardamom-morning-bun',
        name: 'Cardamom Sourdough Morning Bun',
        weight: '160g',
        quantity: 2,
        unitPrice: 6.5,
        lineTotal: 13.0,
      },
    ],
    subtotal: 27.0,
    packagingFee: 1.5,
    tax: 0.0,
    total: 28.5,
    notes: 'Please double wrap the boule in breathable linen if available.',
  },
  {
    id: 'ORD-1021',
    orderNumber: '#ORD-1021',
    createdAt: '2026-11-13T16:40:00Z',
    displayDate: 'Nov 13, 2026',
    status: 'In Oven',
    statusVariant: 'warning',
    isActive: true,
    type: 'active',
    pickupSlot: 'Friday Nov 15 · 10:00 – 11:30 AM',
    pickupLocation: 'Crumb & Bloom Porchside Locker, 42 Orchard Lane',
    pickupCode: 'CRUMB-5219',
    cubbyNumber: 'Porch Cubby A-2',
    accessPin: '5219',
    customer: {
      name: 'Marcus Thorne',
      phone: '(555) 491-2208',
      email: 'm.thorne@example.com',
      smsAlerts: true,
    },
    items: [
      {
        id: 'item-3',
        productId: 'prod-brown-butter-olive-oil-cake',
        name: 'Brown Butter & Blood Orange Olive Oil Cake',
        weight: '1100g',
        quantity: 1,
        unitPrice: 38.0,
        lineTotal: 38.0,
      },
      {
        id: 'item-4',
        productId: 'prod-valrhona-sourdough-brownies',
        name: 'Valrhona 70% Dark Sourdough Brownies',
        weight: '140g each',
        quantity: 2,
        unitPrice: 5.5,
        lineTotal: 11.0,
      },
    ],
    subtotal: 49.0,
    packagingFee: 2.0,
    tax: 0.0,
    total: 51.0,
    notes: 'Gift box wrapping requested for the olive oil cake.',
  },
  {
    id: 'ORD-0988',
    orderNumber: '#ORD-0988',
    createdAt: '2026-11-07T09:20:00Z',
    displayDate: 'Nov 7, 2026',
    status: 'Fulfilled',
    statusVariant: 'secondary',
    isActive: false,
    type: 'past',
    pickupSlot: 'Friday Nov 8 · 09:00 – 10:30 AM',
    pickupLocation: 'Crumb & Bloom Porchside Locker, 42 Orchard Lane',
    pickupCode: 'CRUMB-1904',
    cubbyNumber: 'Porch Cubby C-1',
    accessPin: '1904',
    customer: {
      name: 'Eleanor Vance',
      phone: '(555) 382-9104',
      email: 'eleanor.vance@example.com',
      smsAlerts: false,
    },
    items: [
      {
        id: 'item-5',
        productId: 'prod-country-sourdough',
        name: 'Country Sourdough Boule',
        weight: '850g',
        quantity: 2,
        unitPrice: 14.0,
        lineTotal: 28.0,
      },
      {
        id: 'item-6',
        productId: 'prod-rosemary-garlic-focaccia',
        name: 'Rosemary & Confit Garlic Focaccia',
        weight: '650g',
        quantity: 1,
        unitPrice: 12.0,
        lineTotal: 12.0,
      },
    ],
    subtotal: 40.0,
    packagingFee: 1.5,
    tax: 0.0,
    total: 41.5,
    notes: '',
  },
  {
    id: 'ORD-0942',
    orderNumber: '#ORD-0942',
    createdAt: '2026-10-31T11:05:00Z',
    displayDate: 'Oct 31, 2026',
    status: 'Fulfilled',
    statusVariant: 'secondary',
    isActive: false,
    type: 'past',
    pickupSlot: 'Friday Nov 1 · 08:30 – 10:00 AM',
    pickupLocation: 'Crumb & Bloom Porchside Locker, 42 Orchard Lane',
    pickupCode: 'CRUMB-4318',
    cubbyNumber: 'Porch Cubby B-1',
    accessPin: '4318',
    customer: {
      name: 'Eleanor Vance',
      phone: '(555) 382-9104',
      email: 'eleanor.vance@example.com',
      smsAlerts: false,
    },
    items: [
      {
        id: 'item-7',
        productId: 'prod-seeded-heritage-rye',
        name: 'Seeded Heritage Rye Batard',
        weight: '900g',
        quantity: 1,
        unitPrice: 16.0,
        lineTotal: 16.0,
      },
      {
        id: 'item-8',
        productId: 'prod-spiced-carrot-cupcakes',
        name: 'Heritage Spiced Carrot Cupcakes (Box of 4)',
        weight: '4 x 110g',
        quantity: 1,
        unitPrice: 18.0,
        lineTotal: 18.0,
      },
    ],
    subtotal: 34.0,
    packagingFee: 1.5,
    tax: 0.0,
    total: 35.5,
    notes: '',
  },
];

/**
 * Find order by ID from session storage or static mock orders
 */
export function getOrderById(id) {
  if (!id) return null;

  // 1. Check if order was freshly created in session
  try {
    const saved = sessionStorage.getItem('crumb_bloom_latest_order');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (
        parsed.id?.toLowerCase() === id.toLowerCase() ||
        parsed.orderNumber?.replace('#', '').toLowerCase() === id.replace('#', '').toLowerCase()
      ) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Unable to read session order', e);
  }

  // 2. Check static mock orders
  const cleanSearch = id.replace('#', '').toLowerCase();
  return (
    MOCK_ORDERS.find(
      (order) =>
        order.id.toLowerCase() === cleanSearch ||
        order.orderNumber.replace('#', '').toLowerCase() === cleanSearch
    ) || null
  );
}

/**
 * Save newly confirmed order to session storage for seamless confirmation page lookup
 */
export function saveCreatedOrder(order) {
  try {
    sessionStorage.setItem('crumb_bloom_latest_order', JSON.stringify(order));
  } catch (e) {
    console.warn('Unable to store order in session', e);
  }
}

/**
 * Retrieve all orders combining static history and active session orders
 */
export function getAllOrders() {
  const orders = [...MOCK_ORDERS];
  try {
    const saved = sessionStorage.getItem('crumb_bloom_latest_order');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!orders.some((o) => o.id === parsed.id)) {
        orders.unshift(parsed);
      }
    }
  } catch (e) {
    console.warn('Unable to read session order', e);
  }
  return orders;
}


