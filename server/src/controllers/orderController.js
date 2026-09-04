import mongoose from 'mongoose';
import Order from '../models/order.js';
import { isDbConnected, memoryStore } from '../config/db.js';

const normalizeItems = (items = []) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Order must include at least one item');
  }

  return items.map((item) => {
    const quantity = Number(item.quantity || item.qty || 1);
    const price = Number(item.price || item.unitPrice || 0);
    const name = item.name || item.productName || 'Artisan Bake';

    return {
      productId: item.productId || item.id || null,
      name: name.trim(),
      quantity,
      price,
    };
  });
};

export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;

    if (isDbConnected()) {
      const filter = status && status !== 'All' ? { status } : {};
      const orders = await Order.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } else {
      let filtered = [...memoryStore.orders];
      if (status && status !== 'All') {
        filtered = filtered.filter((o) => o.status === status);
      }
      return res.status(200).json({
        success: true,
        count: filtered.length,
        data: filtered,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch orders',
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      let order = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        order = await Order.findById(id);
      }
      if (!order) {
        order = await Order.findOne({ orderId: id });
      }
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      return res.status(200).json({ success: true, data: order });
    } else {
      const order = memoryStore.orders.find(
        (o) => o._id === id || o.orderId === id || o.id === id
      );
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      return res.status(200).json({ success: true, data: order });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch order',
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customer, items, pickupSlot, status } = req.body;

    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and phone number are required',
      });
    }

    const normalizedItems = normalizeItems(items);
    const calculatedSubtotal = normalizedItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    // Include the $1.50 porch packaging fee
    const packagingFee = 1.5;
    const total = Number((calculatedSubtotal + packagingFee).toFixed(2));

    const generatedOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const generatedPin = `${Math.floor(1000 + Math.random() * 9000)}`;
    const assignedLocker = `Porch Cubby ${['A-1', 'A-2', 'B-3', 'B-4', 'C-1'][Math.floor(Math.random() * 5)]}`;

    if (isDbConnected()) {
      const order = await Order.create({
        orderId: generatedOrderId,
        customer: {
          name: customer.name.trim(),
          phone: customer.phone.trim(),
          address: customer.address || 'Porchside Pickup · 42 Orchard Lane',
          email: customer.email || '',
          notes: customer.notes || '',
        },
        items: normalizedItems,
        total,
        status: status || 'Pending',
        pickupSlot: pickupSlot || 'Friday Nov 15 • 08:00 - 09:30 AM',
        pickupPin: generatedPin,
        porchLocker: assignedLocker,
      });

      return res.status(201).json({
        success: true,
        data: order,
      });
    } else {
      const newOrder = {
        _id: `ord-${Date.now()}`,
        orderId: generatedOrderId,
        customer: {
          name: customer.name.trim(),
          phone: customer.phone.trim(),
          address: customer.address || 'Porchside Pickup · 42 Orchard Lane',
          email: customer.email || '',
          notes: customer.notes || '',
        },
        items: normalizedItems,
        total,
        status: status || 'Pending',
        pickupSlot: pickupSlot || 'Friday Nov 15 • 08:00 - 09:30 AM',
        pickupPin: generatedPin,
        porchLocker: assignedLocker,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryStore.orders.unshift(newOrder);

      return res.status(201).json({
        success: true,
        data: newOrder,
      });
    }
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || 'Failed to create order',
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, customer, items } = req.body;

    if (isDbConnected()) {
      let order = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        order = await Order.findById(id);
      }
      if (!order) {
        order = await Order.findOne({ orderId: id });
      }
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      if (status) order.status = status;
      if (customer) order.customer = { ...order.customer, ...customer };
      if (items) {
        const normalized = normalizeItems(items);
        order.items = normalized;
        order.total = normalized.reduce((sum, i) => sum + i.quantity * i.price, 0) + 1.5;
      }

      const updated = await order.save();
      return res.status(200).json({ success: true, data: updated });
    } else {
      const idx = memoryStore.orders.findIndex(
        (o) => o._id === id || o.orderId === id || o.id === id
      );
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      const existing = memoryStore.orders[idx];
      const updated = {
        ...existing,
        status: status || existing.status,
        customer: customer ? { ...existing.customer, ...customer } : existing.customer,
        updatedAt: new Date().toISOString(),
      };
      memoryStore.orders[idx] = updated;

      return res.status(200).json({ success: true, data: updated });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update order',
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      return res.status(200).json({ success: true, message: 'Order deleted successfully', data: order });
    } else {
      const idx = memoryStore.orders.findIndex((o) => o._id === id || o.orderId === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      const removed = memoryStore.orders.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Order deleted successfully', data: removed[0] });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete order',
    });
  }
};
