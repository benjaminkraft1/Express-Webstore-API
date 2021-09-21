import { OrderStore } from '../order_model';
import { UserStore } from '../user_model';
import { ProductStore } from '../product_model';

/******************************************************** */
// Handler
/******************************************************** */
const order = new OrderStore();

// foreign key related Stores
const user = new UserStore();
const product = new ProductStore();

describe('Product Model', () => {
  it('should have an getCurrentOrderByUserId method', () => {
    expect(order.getCurrentOrderByUserId).toBeDefined();
  });

  it('should have an getCompletedOrdersByUserId method', () => {
    expect(order.getCompletedOrdersByUserId).toBeDefined();
  });

  it('should have an createOrder method', () => {
    expect(order.createOrder).toBeDefined();
  });

  it('should have an deleteOrder method', () => {
    expect(order.deleteOrder).toBeDefined();
  });

  it('createOrder method should add a order', async () => {
    // Create a test user and product to fit foreign key constraints
    const u1 = await user.createUser({
      first_name: 'testuser1',
      last_name: 'last',
      username: 'test_user',
      password: 'xxxxx'
    });

    // Create Order
    const result = await order.createOrder({
      user_id: u1.id,
      status: 'active'
    });

    expect(result).toBeDefined();
  });

  it('getCompletedOrdersByUserId method should return a list of completed orders by user', async () => {
    // Create a test user and product to fit foreign key constraints
    const u1 = await user.createUser({
      first_name: 'testuser1',
      last_name: 'last',
      username: 'test_user',
      password: 'xxxxx'
    });

    // Create complete Order
    const o = await order.createOrder({
      user_id: u1.id,
      status: 'complete'
    });

    const result = await order.getCompletedOrdersByUserId(u1.id);
    expect(result[0].status).toEqual(o.status);
  });

  it('getCurrentOrderByUserId method should return the latest active order by a user', async () => {
    // Create a test user and product to fit foreign key constraints
    const u1 = await user.createUser({
      first_name: 'testuser1',
      last_name: 'last',
      username: 'test_user',
      password: 'xxxxx'
    });

    // Create active Order
    const o = await order.createOrder({
      user_id: u1.id,
      status: 'active'
    });

    const result = await order.getCurrentOrderByUserId(u1.id);
    expect(result.status).toEqual(o.status);
  });

  it('deleteOrder method should remove the order', async () => {
    // Create a test user and product to fit foreign key constraints
    const u1 = await user.createUser({
      first_name: 'testuser1',
      last_name: 'last',
      username: 'test_user',
      password: 'xxxxx'
    });

    const p = await product.createProduct({
      name: 'Test Product Order',
      price: 1.1,
      category: 'test_cat'
    });

    // Create active Order
    const o = await order.createOrder({
      user_id: u1.id,
      status: 'active'
    });

    expect(o).toBeDefined();

    const result = await order.deleteOrder(o.id);

    expect(result).toBeDefined();
  });
});
