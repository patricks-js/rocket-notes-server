import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";

import { Request, Response } from "express";

import { prisma } from "../../database/prismaClient";
import { AppError } from "../../utils/AppError";
import { checkIfUserExists } from "../../utils/checkIfUserExists";

type CreateUserData = {
  oldPassword: string;
} & User;

export class UpdateUserController {
  async update(req: Request, res: Response) {
    const { id: user_id } = req.user;

    const {
      email,
      name,
      password: newPassword,
      oldPassword
    }: CreateUserData = req.body;

    const userExists = await checkIfUserExists(user_id);

    if (!userExists) {
      throw new AppError("Usuário não encontrado!");
    }

    if (userExists?.email === email) {
      throw new AppError("Este email já esta em uso!");
    }

    if (newPassword && oldPassword) {
      if (newPassword === oldPassword) {
        throw new AppError("As senhas não podem ser iguais!");
      }
    }

    const userUpdatedData = {
      email: email ?? userExists.email,
      name: name ?? userExists.name,
      password: userExists.password
    };

    if (newPassword && oldPassword) {
      const checkOldPassword = await compare(oldPassword, userExists.password);
      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere!");
      }

      userUpdatedData.password = await hash(newPassword, 8);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user_id
      },
      data: userUpdatedData
    });

    return res.json(updatedUser);
  }
}
