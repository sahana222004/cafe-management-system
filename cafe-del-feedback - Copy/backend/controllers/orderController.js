// controllers/orderController.js
import Order from '../models/Order.js';

// POST - Create order (already done)
export const createOrder = async (req, res) => {
  const { deliveryInfo, cartItems, totalAmount, deliveryFee, subtotal } = req.body;
  try {
    const order = new Order({
      deliveryInfo,
      cartItems,
      totalAmount,
      deliveryFee,
      subtotal,
      createdAt: new Date(),
    });
    await order.save();
    res.json({ success: true, message: 'Order created successfully!', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating order', error });
  }
};

// ✅ NEW: GET - List all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // optional: sort by latest
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching orders', error });
  }
};
