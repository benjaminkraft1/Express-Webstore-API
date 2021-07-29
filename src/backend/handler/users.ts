import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user_model';
import { authToken } from '../../utilities/auth';

/******************************************************** */
// Express Routes
/******************************************************** */
export const userRoutes = (app: express.Application) => {
  app.get('/user/', authToken, index);
  app.get('/user/:id', authToken, show);
  // add user
  app.post('/user/', authToken, createUser);
  // delete user
  app.delete('/user/:id', authToken, deleteUser);
};

/******************************************************** */
// Handler
/******************************************************** */
const user = new UserStore();

// Get all users
const index = async (_req: Request, res: Response) => {
  const allUsers: User[] = await user.getUsers();
  return res.json(allUsers);
};

// Show user by id
const show = async (_req: Request, res: Response) => {
  const userId: number = parseInt(_req.params.id);
  const allUsers: User = await user.getUserById(userId);
  return res.json(allUsers);
};

// Create user
const createUser = async (_req: Request, res: Response) => {
  const token: string = await user.createUser(_req.body);
  return res.json(token);
};

// Delete user
const deleteUser = async (_req: Request, res: Response) => {
  async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const deletedOrder: User = await user.deleteUser(id);
    return res.json(deletedOrder);
  };
};
