import type { User } from "../../generated/prisma/client.js";

export type SignUpDto = Pick<User, "name" | "email" | "password">;

export type LoginDto = Pick<User, "email" | "password">;
