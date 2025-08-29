import { Request, Response, NextFunction } from "express";

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send("Unauthorized");
};

export { ensureAuthenticated };
