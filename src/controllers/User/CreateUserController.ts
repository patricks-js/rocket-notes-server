import { User } from "@prisma/client";
import { hash } from "bcrypt";

import { Request, Response } from "express";

import { prisma } from "../../database/prismaClient";
import { AppError } from "../../utils/AppError";

type CreateUserData = {
  confirmPassword: string;
} & User;

export class CreateUserController {
  async create(req: Request, res: Response) {
    const { email, name, password, confirmPassword }: CreateUserData = req.body;

    const userEmailExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userEmailExists) {
      throw new AppError("Este email já foi cadastrado!");
    }

    if (password !== confirmPassword) {
      throw new AppError("As senhas não coincidem!");
    }
    const STEP = 8;

    const passwordHash = await hash(password, STEP);

    const userData = {
      name,
      email,
      password: passwordHash
    };

    const newUser = await prisma.user.create({
      data: userData
    });

    return res.json(newUser);
  }
}
