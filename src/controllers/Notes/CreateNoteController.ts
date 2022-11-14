import { Note } from "@prisma/client";

import { Request, Response } from "express";

import { prisma } from "../../database/prismaClient";

export class CreateNoteController {
  async create(req: Request, res: Response) {
    const { id: user_id } = req.params.id;
    const { title, description }: Note = req.body;

    const newNote = await prisma.note.create({
      data: {
        title,
        description,
        user_id
      }
    });

    return res.json({});
  }
}
