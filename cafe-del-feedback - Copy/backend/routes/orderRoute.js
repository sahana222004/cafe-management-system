// routes/orderRoutes.js
import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/create', createOrder); // existing
orderRouter.get('/list', getOrders);      // ✅ new

export default orderRouter;
