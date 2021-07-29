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
    status: 'active',
    product_id: _req.body.product_id,
    quantity: _req.body.quantity
  };

  try {
    console.log(new_order);

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
