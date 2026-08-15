import { Request } from "express";
import { prisma } from "../../database/prisma.js";
import { Prisma, Purchase } from "../../generated/prisma/client.js";
import { PurchaseStatus } from "./purchase.constants.js";
import {
  clearCart,
  getPurchaseItems,
} from "../purchaseItem/purchaseItem.service.js";

export class EmptyCartError extends Error {
  constructor() {
    super("Carrinho vazio");
    this.name = "EmptyCartError";
  }
}

export class InsufficientStockError extends Error {
  constructor(public productName: string) {
    super(`Estoque insuficiente para "${productName}"`);
    this.name = "InsufficientStockError";
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Usuário não autenticado");
    this.name = "UnauthorizedError";
  }
}

export async function checkoutCart(req: Request): Promise<Purchase> {
  const userId = req.session.userId!;

  if (!userId) {
    throw new UnauthorizedError();
  }

  const cart = getPurchaseItems(req);

  if (cart.length === 0) {
    throw new EmptyCartError();
  }

  const purchase = await prisma.$transaction(async (tx) => {
    const products = await tx.product.findMany({
      where: { id: { in: cart.map((item) => item.productId) } },
    });

    for (const item of cart) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Prisma.PrismaClientKnownRequestError(
          `Produto ${item.productId} não encontrado`,
          { code: "P2025", clientVersion: Prisma.prismaVersion.client },
        );
      }
      if (product.stockQuantity < item.quantity) {
        throw new InsufficientStockError(product.name);
      }
    }

    const created = await tx.purchase.create({
      data: {
        userId,
        status: PurchaseStatus.finished,
        items: {
          create: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    for (const item of cart) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stockQuantity: { decrement: item.quantity } },
      });
    }

    return created;
  });

  clearCart(req);
  return purchase;
}

export async function getAllPurchasesByUser(
  userId: string,
): Promise<Purchase[]> {
  return await prisma.purchase.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
  });
}

export async function getPurchase(id: string): Promise<Purchase | null> {
  return await prisma.purchase.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });
}
