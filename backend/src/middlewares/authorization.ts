import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { verify } from 'jsonwebtoken';

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

export const verifyAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization === undefined) return res.status(401).json({ message: 'Token not found' });
  try {
    verify(authorization, SECRET);
  } catch (_) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};
