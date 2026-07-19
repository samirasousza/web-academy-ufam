import { User } from "../../generated/prisma/client.js";

export type CreateUserDto = Pick<User, "name" | "email" | "password" | "userTypeId">;
export type UpdateUserDto = Pick<User, "name" | "email" | "password" | "userTypeId">;