import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHead: string | undefined = req.headers.authorization;
    const token: string = authHead ? authHead : '';

    const decoded: string | object = jsonwebtoken.verify(
      token,
      process.env.TOKEN_SECRET as string
    );
    res.locals.userData = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export const generateToken: Function = (id: number): string => {
  return jsonwebtoken.sign(id.toString(), process.env.TOKEN_SECRET as string);
};
