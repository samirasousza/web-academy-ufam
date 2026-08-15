import "express-session";
import { CartItem } from "../resources/purchase/purchase.types.ts";
declare module "express-session" {
  interface SessionData {
    userId: string;
    userTypeId: string;
    cart?: CartItem[];
  }
}
