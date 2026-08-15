import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  addProductToCart,
  getPurchaseItems,
  removeCartItem,
  updatePurchaseItem,
} from "./purchaseItem.service.js";

async function index(req: Request, res: Response) {
  res.status(StatusCodes.OK).json(getPurchaseItems(req));
}

async function addPurchaseItem(req: Request, res: Response) {
  const purchase = req.body;

  if (!purchase.productId || !purchase.quantity) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  try {
    const cart = await addProductToCart(
      req,
      purchase.productId,
      purchase.quantity,
    );

    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Produto não encontrado" });
    }

    res.status(StatusCodes.CREATED).json(cart);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

async function update(req: Request, res: Response) {
  const productId = req.params.productId;
  const { quantity } = req.body;

  if (!productId || Array.isArray(productId) || !quantity) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  const cart = updatePurchaseItem(req, productId, quantity);
  if (!cart) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Item não está no carrinho" });
  }
  res.status(StatusCodes.OK).json(cart);
}

async function removePurchaseItem(req: Request, res: Response) {
  const productId = req.params.productId;

  if (!productId || Array.isArray(productId)) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  res.status(StatusCodes.OK).json(removeCartItem(req, productId));
}

export default { index, addPurchaseItem, update, removePurchaseItem };
