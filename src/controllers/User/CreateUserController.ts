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
    if (!req.body) {
      throw new AppError("Preencha o formulário!");
    }

    const { email, name, password, confirmPassword }: CreateUserData = req.body;

    const userEmailExists = await prisma.user.findFirst({
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

    const passwordHashed = await hash(password, 8);

    const userData = {
      name,
      email,
      password: passwordHashed
    };

    const newUser = await prisma.user.create({
      data: userData
    });

    return res.status(201).json(newUser);
  }
}
