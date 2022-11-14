import { Router } from "express";

import { CreateNoteController } from "../controllers/Notes/CreateNoteController";
import { DeleteNoteController } from "../controllers/Notes/DeleteNoteController";
import { ShowNotesController } from "../controllers/Notes/ShowNotesController";
import { userAuthenticated } from "../middleware/userAuthenticated";

export const notesRoutes = Router();

const { create } = new CreateNoteController();
const { index } = new ShowNotesController();
const { deleteNote } = new DeleteNoteController();

notesRoutes.use(userAuthenticated);

notesRoutes.get("/", index);
notesRoutes.post("/create", create);
notesRoutes.delete("/delete/:id", deleteNote);
