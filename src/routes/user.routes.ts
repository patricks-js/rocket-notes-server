import { Request, Response, Router } from "express";

import { CreateUserController } from "../controllers/User/CreateUserController";
import { UpdateUserController } from "../controllers/User/UpdateUserController";
import { prisma } from "../database/prismaClient";

export const userRoutes = Router();

const { create } = new CreateUserController();
const { update } = new UpdateUserController();

userRoutes.post("/register", create);
userRoutes.put("/update/:id", update);
userRoutes.get("/", async (req: Request, res: Response) => {
  const user = await prisma.user.findMany();
  res.json(user);
});
