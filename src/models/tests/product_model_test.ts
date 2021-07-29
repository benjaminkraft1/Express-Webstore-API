import { User, UserStore } from '../user_model';
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
            name: "Test Product",
            price: 1.10,
            category: "test_cat"
        });

        expect(result.name).toEqual('Test Product');
        expect(result.price).toBeCloseTo(1.10);
        expect(result.category).toEqual('test_cat');

    });

    it('getProducts method should return a list of products', async () => {

        const result = await product.getProducts();
        expect(result[0].name).toEqual('Test Product');
        expect(result[0].price).toBeCloseTo(1.10);
        expect(result[0].category).toEqual('test_cat');
    });

    it('getProductsById method should return a product by id', async () => {

        const result = await product.getProductById(1);
        expect(result.name).toEqual('Test Product');
        expect(result.price).toBeCloseTo(1.10);
        expect(result.category).toEqual('test_cat');
    });
 
    it('getProductsByCat method should return a list of products in a specific category', async () => {

        const result = await product.getProductsByCat('test_cat');
        expect(result[0].name).toEqual('Test Product');
        expect(result[0].price).toBeCloseTo(1.10);
        expect(result[0].category).toEqual('test_cat');
    });
   

    it('deleteProduct method should remove the product', async () => {
        await product.deleteProduct(1);

        const result = await product.getProducts();
    
        expect(result).toEqual([]);

    });

});