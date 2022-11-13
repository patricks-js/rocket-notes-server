import { Router } from "express";

import { notesRoutes } from "./note.routes";
import { userRoutes } from "./user.routes";

export const routes = Router();

routes.use("/user", userRoutes);
routes.use("/note", notesRoutes);
