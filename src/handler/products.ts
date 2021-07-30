import express, { Response, Request } from 'express';
import { Product, ProductStore } from '../models/product_model';
import { authToken } from '../utilities/auth';

/******************************************************** */
// Express Routes
/******************************************************** */
export const productRoutes = (app: express.Application) => {
  app.get('/products/', index);
  app.get('/products/:id', show);
  app.get('/products/cat/:category', show_by_cat);
  // add product
  app.post('/products/', authToken, create);
  // delete product
  app.delete('/products/:id', authToken, deleteProduct);
};

/******************************************************** */
// Handler
/******************************************************** */
const product_store = new ProductStore();

// Get all products
const index = async (_req: Request, res: Response) => {
  const allProducts: Product[] = await product_store.getProducts();
  return res.json(allProducts);
};

// Get product by id
const show = async (_req: Request, res: Response) => {
  const productId: number = parseInt(_req.params.id);
  const productById: Product = await product_store.getProductById(productId);
  return res.json(productById);
};

// Get products by category
const show_by_cat = async (_req: Request, res: Response) => {
  const category: string = String(_req.params.category);
  const productByCat: Product[] = await product_store.getProductsByCat(
    category
  );
  return res.json(productByCat);
};

// Create product
const create = async (_req: Request, res: Response) => {
  const createdProduct: Product = await product_store.createProduct(_req.body);
  return res.json(createdProduct);
};

// Delete product by id
const deleteProduct = async (_req: Request, res: Response) => {
  const id: number = parseInt(_req.params.id);
  const deletedProduct = await product_store.deleteProduct(id);
  return res.json(deletedProduct);
};
