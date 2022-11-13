import { User } from "@prisma/client";

import { prisma } from "../database/prismaClient";

type UserExists = User | null;

export async function verifyEmail(email: string): Promise<UserExists> {
  const emailExists = await prisma.user.findUnique({ where: { email } });
  return emailExists;
}
