import { Router } from "express";
import v1ROuter from "./v1ROuter.js";

const router = Router();

router.use("/v1", v1ROuter);

export default router;