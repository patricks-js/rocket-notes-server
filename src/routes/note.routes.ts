import { Router } from "express";

import { CreateNoteController } from "../controllers/Notes/CreateNoteController";
import { userAuthenticated } from "../middleware/userAuthenticated";

export const notesRoutes = Router();

const { create } = new CreateNoteController();

notesRoutes.use(userAuthenticated);

notesRoutes.get("/");
notesRoutes.post("/create", create);
notesRoutes.delete("/delete");
