import { Router } from "express";
import productController from "./product.controller.js";
import { createProductSchema, updateProductSchema, productIdSchema  } from './product.schema.js';
import validate from '../../middlewares/validate.js';

const router = Router();

router.get("/", productController.index);
router.post("/", validate(createProductSchema), productController.create);
router.get("/:id", validate(productIdSchema, "params"), productController.read);
router.put("/:id", validate(productIdSchema, "params"), validate(updateProductSchema), productController.update);
router.delete("/:id", validate(productIdSchema, "params"), productController.remove);

export default router;