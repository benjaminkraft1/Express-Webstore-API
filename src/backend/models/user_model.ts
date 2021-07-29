import bcrypt from 'bcrypt';
import Client from '../database';
import { generateToken } from '../../utilities/auth';

export type User = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  token: string;
};

export class UserStore {
  // define table
  table: string = `users`;

  // select all users
  async getUsers(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM ${this.table}`;
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all users. Error: ${err}`);
    }
  }

  // select user by id
  async getUserById(userId: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM ${this.table} WHERE id = $1`;
      const result = await conn.query(sql, [userId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user by id. Error: ${err}`);
    }
  }

  // create a user
  async createUser(user: User): Promise<string> {
    try {
        
      const { first_name, last_name, username, password } = user;
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const salt: string = process.env.SALT_ROUNDS as string;

      const hash: string = bcrypt.hashSync(
        password + pepper,
        parseInt(salt)
      );
      const conn = await Client.connect();
      const sql = `INSERT INTO ${this.table} (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *`;
      const result = await conn.query(sql, [first_name, last_name, username, hash]);
      conn.release();

      const id: number = result.rows[0].id;
      const token: string = generateToken(id);
      return token;

    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`);
    }
  }


  // delete user
  async deleteUser(id: number): Promise<User> {
    try {
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
