import { Request, Response } from "express";
import {
  checkoutCart,
  EmptyCartError,
  getAllPurchasesByUser,
  getPurchase,
  InsufficientStockError,
} from "./purchase.service.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Prisma } from "../../generated/prisma/client.js";

async function create(req: Request, res: Response) {
  try {
    const purchase = await checkoutCart(req);
    res.status(StatusCodes.CREATED).json(purchase);
  } catch (err) {
    if (err instanceof EmptyCartError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
    }
    if (err instanceof InsufficientStockError) {
      return res.status(StatusCodes.CONFLICT).json({ msg: err.message });
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Database Error",
        message: err.message,
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

async function index(req: Request, res: Response) {
  try {
    const purchases = await getAllPurchasesByUser(req.session.userId!);
    res.status(StatusCodes.OK).json(purchases);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

async function read(req: Request, res: Response) {
  const purchaseId = req.params.id;

  if (!purchaseId || Array.isArray(purchaseId)) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  try {
    const purchase = await getPurchase(purchaseId);
    if (!purchase) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json(purchase);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

export default {
  create,
  index,
  read,
};
