import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { Request, Response } from "express";

import { jwtConfig } from "../../config/jwt.config";
import { prisma } from "../../database/prismaClient";
import { AppError } from "../../utils/AppError";

export class SignInUserController {
  async signIn(req: Request, res: Response) {
    const { email, password }: User = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new AppError("O usuário não existe!");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError("Login inválido!");
    }

    const { secret, expiresIn } = jwtConfig;

    const token = sign({ id: user.id }, secret, { expiresIn });

    return res.json({ token, user });
  }
}
