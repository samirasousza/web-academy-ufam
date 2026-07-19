import "dotenv/config";
import { User } from "../../generated/prisma/client.js";
import { CreateUserDto } from "./user.types.js";
import { prisma } from "../../database/prisma.js";

export async function getAllUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function createUser(user: CreateUserDto) {
  return await prisma.user.create({ data: user });
}

export async function userAlreadyExists(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { email } });
  return user !== null;
}

export async function getUser(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { id: id } });
  return user;
}

export async function updateUser(
  id: string,
  user: CreateUserDto,
): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: user,
  });
  return updatedUser;
}

export async function removeUser(id: string): Promise<string> {
  const deletedUser = await prisma.user.delete({ where: { id: id } });
  return deletedUser.id;
}
