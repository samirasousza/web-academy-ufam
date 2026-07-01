import { Router } from "express";
import productController from "./product.controller"
import router = Router();


router.get("/", productController.index);
router.post("/", productController.create);
router.get("/:id", productController.read);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);
