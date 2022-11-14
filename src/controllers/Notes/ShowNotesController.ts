import { Request, Response } from "express";

import { prisma } from "../../database/prismaClient";
import { AppError } from "../../utils/AppError";

export class ShowNotesController {
  async index(req: Request, res: Response) {
    const { id: user_id } = req.user;

    const notesOfUser = await prisma.note.findMany({
      where: { user_id },
      include: { links: true, tags: true }
    });

    if (!notesOfUser) {
      throw new AppError("Nenhuma nota cadastrada!");
    }

    return res.json(notesOfUser);
  }
}
