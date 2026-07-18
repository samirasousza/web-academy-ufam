import { compare } from "bcryptjs";
import { prisma } from "../../database/prisma.js";
import type { LoginDto } from "./auth.types.js";
import type { User } from "../../generated/prisma/client.js";

export const checkCredentials = async (
  data: LoginDto,
): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  const ok = await compare(data.password, user ? user.password : "FAKEHASH");

  return ok ? user : null;
};
