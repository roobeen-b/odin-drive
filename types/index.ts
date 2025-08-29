import 'express';

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      username: string;
      password: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export type TUser = Express.User;
