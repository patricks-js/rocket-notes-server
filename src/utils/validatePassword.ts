import { User } from "@prisma/client";
import { compare } from "bcrypt";

import { AppError } from "./AppError";

export async function verifyPassword(
  passwordToCheck: string,
  { password }: User
) {
  if (password) {
    const validPassword = await compare(password, passwordToCheck);
    return validPassword;
  }

  return new AppError("Usuário não existe");
}
