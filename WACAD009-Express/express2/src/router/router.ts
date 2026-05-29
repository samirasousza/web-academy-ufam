import { Router } from "express";
import { loremIpsum } from "lorem-ipsum";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/about", (req, res) => {
  res.send(`Oi, sou eu`);
});

router.get("/lorem/:paragrafos", (req, res) => {
  res.send(loremIpsum({ count: Number(req.params.paragrafos), units: "sentences" }));
});

export default router;
