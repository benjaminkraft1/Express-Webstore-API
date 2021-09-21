import express, { Request, Response } from 'express';
import { authToken } from '../utilities/auth';
import { Order, OrderStore } from '../models/order_model';

/******************************************************** */
// Express Routes
/******************************************************** */
export const orderRoutes = (app: express.Application) => {
  // Get Orders by user id
  app.get('/current_orders/:user_id', authToken, currentOrderByUserId);
  app.get('/completed_orders/:user_id', authToken, completedOrdersByUserId);
  // Create new order
  app.post('/orders/', authToken, createOrder);
  // Delete order by id
  app.delete('/orders/:id', authToken, deleteOrder);
  // add product
  app.post('/orders/:id/products', addProduct)
};

/******************************************************** */
// Handler
/******************************************************** */
const order = new OrderStore();

// Get Orders by id
const currentOrderByUserId = async (_req: Request, res: Response) => {
  const userId: number = parseInt(_req.params.user_id);
  const currentOrder: Order = await order.getCurrentOrderByUserId(userId);
  return res.json(currentOrder);
};

// Get Orders by user id
const completedOrdersByUserId = async (_req: Request, res: Response) => {
  const userId: number = parseInt(_req.params.user_id);
  const completedOrder: Order[] = await order.getCompletedOrdersByUserId(
    userId
  );
  return res.json(completedOrder);
};

const createOrder = async (_req: Request, res: Response) => {
  const new_order: Order = {
    user_id: _req.body.user_id,
    status: 'active'
  };

  try {
    const newOrder = await order.createOrder(new_order);

    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Delete order by id
const deleteOrder = async (_req: Request, res: Response) => {
  const id: number = parseInt(_req.params.id);
  const deletedOrder = await order.deleteOrder(id);
  return res.json(deletedOrder);
};

// Add Product to Order
const addProduct = async (_req: Request, res: Response) => {
  const orderId: number = parseInt(_req.params.id)
  const productId: number = parseInt(_req.body.productId)
  const quantity: number = parseInt(_req.body.quantity)
  
  try {
    const addedProduct = await order.addProduct(quantity, orderId, productId);

    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
