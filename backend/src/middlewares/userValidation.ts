import { NextFunction, Request, Response } from 'express';
import { registerSchema } from '../schema/userSchema';

export const registerValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const validate = registerSchema(username, password);

  if (validate === false) {
    return res.status(400).json({ message: "Dados de inválidos!" });
  }
  next();
};

