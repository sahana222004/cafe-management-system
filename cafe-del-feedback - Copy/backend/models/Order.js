// models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  deliveryInfo: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    pinCode: String,
    country: String,
    phone: String,
  },
  cartItems: {
    type: Map,
    of: Number, // key is food item id, value is quantity
  },
  totalAmount: Number,
  deliveryFee: Number,
  subtotal: Number,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
