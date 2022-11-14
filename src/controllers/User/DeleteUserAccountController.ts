import { Request, Response } from "express";

import { prisma } from "../../database/prismaClient";

export class DeleteUserAccountController {
  async deleteAccount(req: Request, res: Response) {
    const { id } = req.user;
    await prisma.user.delete({ where: { id } });

    return res.json({});
  }
}
