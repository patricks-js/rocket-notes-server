import { Request, Response } from "express";

import { prisma } from "../../database/prismaClient";
import { AppError } from "../../utils/AppError";

export class DeleteNoteController {
  async deleteNote(req: Request, res: Response) {
    const idString = req.params.id;

    const id = Number(idString);

    try {
      const noteDeleted = await prisma.note.delete({ where: { id } });
      return res.json(noteDeleted);
    } catch (err) {
      if (err instanceof Error) {
        throw new AppError(err.message);
      }
    }
    return res.status(301).json({});
  }
}
