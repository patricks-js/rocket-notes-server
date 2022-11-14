import { verify } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

import { jwtConfig } from "../config/jwt.config";
import { AppError } from "../utils/AppError";

type UserId = {
  id: string;
};

export function userAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("BLOCKED! Não autorizado!", 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError("BLOCKED! Não autorizado!", 401);
  }

  try {
    const { id: user_id } = verify(token, jwtConfig.secret) as UserId;

    req.user = { id: user_id };

    next();
  } catch (err) {
    throw new AppError(
      `Não autorizado, verifique as informações de Login! Erro: ${err}`,
      401
    );
  }
}
