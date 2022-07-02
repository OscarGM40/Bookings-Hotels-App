import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { createError } from "./error";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.cookies["access_token"];

  if (!bearerHeader) return next(createError(403, "Unauthenticated.Please provide a token"));

  jwt.verify(bearerHeader, process.env.JWT!, (err: VerifyErrors | null, decoded: any) => {
    if (err) return next(createError(401, "Unauthorized.Please revise the token"));
    req.user = decoded;
    next();
  });
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user?.id === req.params.id || req.user?.isAdmin) {
      next();
    } else {
      next(createError(403, "Unauthorized.You are not allowed to perform this action"));
    }
  });
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req,res,() => {
    if (req.user?.isAdmin) {
      next();
    } else {
      next(createError(401, "Unauthorized.You are not admin"));
    }
  })
}
