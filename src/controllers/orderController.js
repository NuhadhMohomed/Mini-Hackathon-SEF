import Order from '../models/order.js';

const normalizeItems = (items = []) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Order must include at least one item');
  }

  return items.map((item) => {
    const quantity = Number(item.quantity);
    const price = Number(item.price);

    if (!item.name || !item.name.trim()) {
      throw new Error('Each order item must include a product name');
    }

    if (!Number.isFinite(quantity) || quantity < 1) {
      throw new Error('Each item quantity must be at least 1');
    }

    if (!Number.isFinite(price) || price < 0) {
      throw new Error('Each item price must be a valid non-negative number');
    }

    return {
      productId: item.productId || null,
      name: item.name.trim(),
      quantity,
      price,
    };
  });
};

export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch orders',
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch order',
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customer, items, status } = req.body;

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({
        success: false,
        message: 'Customer name, phone, and address are required',
      });
    }

    const normalizedItems = normalizeItems(items);
    const total = normalizedItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const order = await Order.create({
      customer,
      items: normalizedItems,
      total,
      status: status || 'Pending',
    });

    res.status(201).json({
      success: true,
      data: order,
    });
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
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const { customer, items, status } = req.body;

    if (customer) order.customer = customer;

    if (Array.isArray(items)) {
      const normalizedItems = normalizeItems(items);
      order.items = normalizedItems;
      order.total = normalizedItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
    }

    if (status) {
      order.status = status;
    }

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      message: error.message || 'Failed to update order',
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete order',
    });
  }
};
