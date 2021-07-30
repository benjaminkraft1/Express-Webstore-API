import { ProductStore } from '../product_model';

/******************************************************** */
// Handler
/******************************************************** */
const product = new ProductStore();

describe('Product Model', () => {
  it('should have an getProducts method', () => {
    expect(product.getProducts).toBeDefined();
  });

  it('should have an getProductById method', () => {
    expect(product.getProductById).toBeDefined();
  });

  it('should have an getProductsByCat method', () => {
    expect(product.getProductsByCat).toBeDefined();
  });

  it('should have an createProduct method', () => {
    expect(product.createProduct).toBeDefined();
  });

  it('should have an deleteProduct method', () => {
    expect(product.deleteProduct).toBeDefined();
  });

  it('createProduct method should add a product', async () => {
    const result = await product.createProduct({
      name: 'Test Product',
      price: 1.1,
      category: 'test_cat'
    });

    expect(result.id).toBeDefined();
  });

  it('getProducts method should return a list of products', async () => {
    await product.createProduct({
      name: 'Test Product',
      price: 1.1,
      category: 'test_cat'
    });

    const result = await product.getProducts();
    expect(result.length).toBeGreaterThan(0);
  });

  it('getProductsById method should return a product by id', async () => {
    const p = await product.createProduct({
      name: 'Test Product getProductsById',
      price: 1.1,
      category: 'test_cat'
    });

    const result = await product.getProductById(p.id);
    expect(result.name).toEqual('Test Product getProductsById');
  });

  it('getProductsByCat method should return a list of products in a specific category', async () => {
    const p = await product.createProduct({
      name: 'Test Product getProductsByCat',
      price: 1.1,
      category: 'test_cat_test'
    });

    const result = await product.getProductsByCat('test_cat_test');
    expect(result[0].name).toEqual('Test Product getProductsByCat');
  });

  it('deleteProduct method should remove the product', async () => {
    const p = await product.createProduct({
      name: 'Test Product delete',
      price: 1.1,
      category: 'test_cat'
    });

    expect(p.id).toBeDefined();

    await product.deleteProduct(p.id);

    const result = await product.getProductById(p.id);

    expect(result).toBeUndefined();
  });
});
