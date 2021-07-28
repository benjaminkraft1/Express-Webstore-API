
import { Application, Router } from 'express';

import { ProductController } from './handler/product_controller';
//import { UserController } from './controller/UserController';
//import { OrderController } from './controller/OrderController';

const _routes: [string, Router][] = [
  ['/products', ProductController]
  //['/users', UserController],
  //['/orders', OrderController]
];

export const routes: Function = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};