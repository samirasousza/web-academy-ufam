import { Router } from "express";
import productRouter from "../resources/product/product.router.js";
import userRouter from "../resources/user/user.router.js";
import languageRouter from "../resources/language/language.router.js";
import authRouter from "../resources/auth/auth.router.js";
import purchaseItemRoutes from "../resources/purchaseItem/purchaseItem.router.js";
import purchaseRoutes from "../resources/purchase/purchase.router.js";

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/language", languageRouter);
router.use("/auth", authRouter);
router.use("/cart", purchaseItemRoutes);
router.use("/purchases", purchaseRoutes);

export default router;
