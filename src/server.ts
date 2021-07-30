import express from 'express';
// import { routes } from './backend/routes';
import bodyParser from 'body-parser';
import logger from './utilities/logger';

import { orderRoutes } from './handler/orders';
import { productRoutes } from './handler/products';
import { userRoutes } from './handler/users';

const app: express.Application = express();

// Setup port to 3000
const port = 3000;

// Start server
app.listen(port, () => {
  console.log(`Webstore Server started at localhost:${port}`);
});

app.get('/', function(req: express.Request, res: express.Response) {
  res.send('Hello World!');
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// console log all requests
app.use(logger);

orderRoutes(app);
productRoutes(app);
userRoutes(app);

// export app for unit test
export default app;