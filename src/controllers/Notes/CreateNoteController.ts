import { Note } from "@prisma/client";

import { Request, Response } from "express";

import { prisma } from "../../database/prismaClient";
import { AppError } from "../../utils/AppError";

type NewNoteType = {
  links: string[];
  tags: string[];
} & Note;

export class CreateNoteController {
  async create(req: Request, res: Response) {
    const { id: user_id } = req.user;

    const { title, description, links, tags }: NewNoteType = req.body;
    try {
      const newNote = await prisma.note.create({
        data: {
          title,
          description,
          user_id
        }
      });

      if (!links || !tags) {
        return res.json({ newNote });
      }

      const linksToInsert = links.map(link => {
        return {
          url: link,
          note_id: newNote.id
        };
      });

      linksToInsert.forEach(async link => {
        await prisma.link.create({ data: link });
      });

      if (links && !tags) {
        return res.json({ newNote, linksToInsert });
      }

      const tagsToInsert = tags.map(name => {
        return {
          name,
          user_id,
          note_id: newNote.id
        };
      });

      tagsToInsert.forEach(async tag => {
        await prisma.tag.create({ data: tag });
      });

      if (!links && tags) {
        return res.json({ newNote, tagsToInsert });
      }

      return res.json({ newNote, linksToInsert, tagsToInsert });
    } catch (err) {
      throw new AppError("Erro ao cadastrar nota!");
    }
  }
}
