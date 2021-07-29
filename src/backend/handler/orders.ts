import express, { Request, Response } from 'express';
import { authToken } from '../../utilities/auth';
import { Order, OrderStore } from '../models/order_model';

/******************************************************** */
// Express Routes
/******************************************************** */
export const orderRoutes = (app: express.Application) => {
  // Get Orders by user id
  app.get('/orders/current/:user_id', authToken, current_order_by_user_id);
  app.get('/orders/completed/:user_id', authToken, completed_orders_by_user_id);

  app.post('/orders/', authToken, create);
  // add product
  //app.post('/orders/', addProduct);
  //app.delete('/orders/:id', authToken, )

};

/******************************************************** */
// Handler
/******************************************************** */
const order = new OrderStore();

// Get Orders by id
const current_order_by_user_id = async (_req: Request, res: Response) => {
  const Id: number = parseInt(_req.params.id);
  const currentOrder: Order = await order.getCurrentOrderByUserId(Id);
  return res.json(currentOrder);
};

// Get Orders by user id
const completed_orders_by_user_id = async (_req: Request, res: Response) => {
  const userId: number = parseInt(_req.params.user_id);
  const completedOrder: Order[] = await order.getCompletedOrdersByUserId(userId);
  return res.json(completedOrder);
};

const create = async (_req: Request, res: Response) => {
  const new_order: Order = {
    user_id: _req.body.userId,
    status: 'active',
    product_id: _req.body.product_id,
    quantity: _req.body.quantity
  };

  try {
    const newOrder = await order.createOrder(new_order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/*
const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await order.addProduct(quantity, orderId, productId);
    res.json(addProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

*/

