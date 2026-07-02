import { Request, Response } from "express";
import { createProduct, getProduct, updateProduct, productAlreadyExists, getAllProducts, removeProduct } from "./product.service.js";
import { Prisma } from "../../generated/prisma/client.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

async function create(req: Request, res: Response) {
  const product = req.body;
  try {
    if (await productAlreadyExists(product.name)) {
      //   return res.status(400).json({ msg: "Produto já existe" });
      res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
    }
    const newProduct = await createProduct(product);
    // res.status(201).json(newProduct);
    res.status(StatusCodes.OK).json(product);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);

    if (err instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({
        error: "Validation Error",
        message: "The data provided is invalid. ",
      });
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({
        error: "Database Error",
        message: err.message,
      });
    } else {
      res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong. Please try again later.",
      });
    }
  }
}

async function update(req: Request, res: Response) {
    const product = req.body;
    try{
        if (await getProduct(product.id)) {
            const updatedProduct = await updateProduct(product.id, product);
            res.status(StatusCodes.OK).json(updatedProduct);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ msg: "Produto não encontrado" });
        }
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

async function read(req: Request, res: Response) {
    const productId = req.body.id;

    try {
        const product = await getProduct(productId);
        res.status(StatusCodes.OK).json(product);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

async function index(req:Request, res: Response) {
    try {
    const products = await getAllProducts();
    res.status(StatusCodes.OK).json(products);
} catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err); 
}
}

async function remove(req: Request, res: Response) {
    const productId = req.body.id;

    try {
        const product = await getProduct(productId);
        if (product) {
            await removeProduct(productId);
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
  remove
};