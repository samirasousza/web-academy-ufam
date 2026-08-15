import { Request } from "express";
import { getProduct } from "../product/product.service.js";
import { CartItem } from "../purchase/purchase.types.js";

export function getPurchaseItems(req: Request): CartItem[] {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  return req.session.cart;
}

export async function addProductToCart(
  req: Request,
  productId: string,
  quantity: number,
): Promise<CartItem[] | null> {
  const product = await getProduct(productId);
  if (!product) {
    return null;
  }

  const cart = getPurchaseItems(req);
  const item = cart.find((item) => item.productId === productId);

  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  return cart;
}

export function updatePurchaseItem(
  req: Request,
  productId: string,
  quantity: number,
): CartItem[] | null {
  const cart = getPurchaseItems(req);
  const item = cart.find((item) => item.productId === productId);

  if (!item) {
    return null;
  }

  item.quantity = quantity;
  return cart;
}

export function removeCartItem(req: Request, productId: string): CartItem[] {
  const cart = getPurchaseItems(req).filter((item) => item.productId !== productId);
  req.session.cart = cart;
  return cart;
}

export function clearCart(req: Request): void {
  req.session.cart = [];
}