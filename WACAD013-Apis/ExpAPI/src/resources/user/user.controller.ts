import { Request, Response } from "express";
import {
  createUser,
  getUser,
  updateUser,
  userAlreadyExists,
  getAllUsers,
  removeUser,
} from "./user.service.js";
import { Prisma } from "../../generated/prisma/client.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

async function create(req: Request, res: Response) {
  const user = req.body;
  try {
    if (await userAlreadyExists(user.name)) {
      //   return res.status(400).json({ msg: "Produto já existe" });
      res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
    }
    const newUser = await createUser(user);
    // res.status(201).json(newUser);
    res.status(StatusCodes.CREATED).json(newUser);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);

    if (err instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({
        error: "Validation Error",
        message: "The data provided is invalid. ",
      });
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({
        error: "Database Error",
        message: err.message,
      });
    }
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Something went wrong. Please try again later.",
    });
  }
}

async function update(req: Request, res: Response) {
  const userId = req.params.id;
  const userData = req.body;

  if (!userId || Array.isArray(userId)) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  try {
    if (await getUser(userId)) {
      const updatedUser = await updateUser(userId, userData);
      res.status(StatusCodes.OK).json(updatedUser);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Produto não encontrado" });
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

async function read(req: Request, res: Response) {
  const userId = req.params.id;

  if (!userId || Array.isArray(userId)) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  try {
    const user = await getUser(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

async function index(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

async function remove(req: Request, res: Response) {
  const userId = req.params.id;

  if (!userId || Array.isArray(userId)) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  try {
    const user = await getUser(userId);
    if (user) {
      await removeUser(userId);
      res.status(StatusCodes.OK).json({ msg: "Produto removido com sucesso" });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Produto não encontrado" });
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

export default {
  create,
  update,
  read,
  index,
  remove,
};
