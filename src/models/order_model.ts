import Client from '../database';

export type Order = {
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};

export type OrderCreated = {
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
  id: number;
};

export class OrderStore {
  // define table
  table: string = 'orders';

  // Get current order by user id
  async getCurrentOrderByUserId(userId: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM ${this.table} WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`;
      const result = await conn.query(sql);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get current order. Error: ${err}`);
    }
  }

  // select completed order by user id
  async getCompletedOrdersByUserId(userId: number): Promise<Order[]> {
    try {
      const status = 'complete';
      const conn = await Client.connect();
      const sql = `SELECT * FROM ${this.table} WHERE user_id = ${userId} AND status = $1`;
      const result = await conn.query(sql, [status]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get completed orders. Error: ${err}`);
    }
  }

  // create an order
  async createOrder(order: Order): Promise<OrderCreated> {
    try {
      // eslint-disable-next-line camelcase
      const { product_id, quantity, user_id, status } = order;

      const conn = await Client.connect();
      const sql = `INSERT INTO ${this.table} (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *`;
      const result = await conn.query(sql, [
        // eslint-disable-next-line camelcase
        product_id,
        quantity,
        // eslint-disable-next-line camelcase
        user_id,
        status
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    try {
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
