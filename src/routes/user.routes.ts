import { Router } from "express";

import { CreateUserController } from "../controllers/User/CreateUserController";
import { DeleteUserAccountController } from "../controllers/User/DeleteUserAccountController";
import { SignInUserController } from "../controllers/User/SignInUserController";
import { UpdateUserController } from "../controllers/User/UpdateUserController";
import { userAuthenticated } from "../middleware/userAuthenticated";

export const userRoutes = Router();

const { create } = new CreateUserController();
const { update } = new UpdateUserController();
const { deleteAccount } = new DeleteUserAccountController();
const { signIn } = new SignInUserController();

userRoutes.post("/register", create);
userRoutes.post("/session", signIn);
userRoutes.put("/update", userAuthenticated, update);
userRoutes.delete("/delete", userAuthenticated, deleteAccount);
