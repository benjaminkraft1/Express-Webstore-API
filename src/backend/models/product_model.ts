import Client from '../database';

export type Product = {
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  // define table
  table: string = 'products';

  async getProducts(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM ${this.table}`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const sql = `SELECT * FROM ${this.table} WHERE id=($1)`;
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async getProductsByCat(cat: string): Promise<Product[]> {
    try {
      const sql = `SELECT * FROM ${this.table} WHERE category=($1)`;
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [cat]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find products for ${cat}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql = `INSERT INTO ${this.table} (name, price, category) VALUES($1, $2, $3) RETURNING *`;
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [p.name, p.price, p.category]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = `DELETE FROM ${this.table} WHERE id=($1)`;
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
