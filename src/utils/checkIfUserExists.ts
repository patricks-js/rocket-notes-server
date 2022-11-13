import { User } from "@prisma/client";

import { prisma } from "../database/prismaClient";

type UserExists = User | null;

export async function checkIfUserExists(id: string): Promise<UserExists> {
  const userExists = await prisma.user.findUnique({
    where: {
      id
    }
  });

  return userExists;
}
