import { Request, Response } from "express";
import {
  createUser,
  getUser,
  updateUser,
  findUserByEmail,
  getAllUsers,
  removeUser,
} from "./user.service.js";
import { Prisma } from "../../generated/prisma/client.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { userErrors } from "./user.errors.js";
import type { CreateUserDto, UpdateUserDto } from "./user.types.js";

const create = async (req: Request, res: Response) => {
  const data = req.body as CreateUserDto;
  try {
    if (await findUserByEmail(data.email)) {
      return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT)
    }
    const user = await createUser(data);
    res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    userErrors(err, res);
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
    try {
      const updatedUser = req.body as UpdateUserDto;
      const result = await updateUser(id, updatedUser);
      if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Usuário não encontrado" });
      }
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      userErrors(err, res);
    }
};

const read = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const user = await getUser(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Usuário não encontrado" });
    }
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    userErrors(err, res);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(StatusCodes.OK).json(users);
  } catch(err) {
    userErrors(err, res);
  }
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;
    try {
      const result = await removeUser(id);
      if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Usuário não encontrado" });
      }
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      userErrors(err, res);
    }

};

export default {
  create,
  update,
  read,
  index,
  remove,
};
