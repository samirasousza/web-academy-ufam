import "dotenv/config";
import { genSalt, hash } from "bcryptjs";
import type { CreateUserDto, UpdateUserDto, UserDto } from "./user.types.js";
import getEnv from "../../utils/validateEnv.js";
import { prisma } from "../../database/prisma.js";
// import { prisma } from "../../utils/prismaClient.js";

const env = getEnv();

export async function getAllUsers(): Promise<UserDto[]> {
  const users = await prisma.user.findMany();
  return users.map((u) => {
    const { password, ...user } = u;
    return user;
  });
}

export async function findUserByEmail(email: string): Promise<UserDto | null> {
    const tempUser = await prisma.user.findFirst({ where: { email }});
    if (!tempUser) return null;
    const { password, ...user } = tempUser;
    return user;
}

export async function createUser(data: CreateUserDto): Promise<UserDto> {
  const salt = await genSalt(env.ROUNDS_BCRYPT);
  const passwordHash = await hash(data.password, salt);
  const { password, ...user } = await prisma.user.create({
    data: { ...data, password: passwordHash },
  });
  return user;
}

export async function userAlreadyExists(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { email } });
  return user !== null;
}

export async function getUser(id: string): Promise<UserDto | null> {
    const tempUser = await prisma.user.findFirst({ where: { id }});
    if (!tempUser) return null;
    const { password, ...user } = tempUser;
    return user;
}

export async function updateUser(id: string, data: UpdateUserDto): Promise<UserDto | null> {
    const tempUser = await prisma.user.findFirst({ where: { id }});
    if (!tempUser) return null;
    const { password, ...user } = await prisma.user.update({ where: { id }, data })
    return user;
}

export async function removeUser(id: string): Promise<UserDto> {
    const { password, ...user } = await prisma.user.delete({ where: { id }});
    return user;
}