import { PurchaseItem } from "../../generated/prisma/client.js";

export type AddItemToPurchaseCartDto = Pick<
  PurchaseItem,
  "productId" | "quantity"
>;
