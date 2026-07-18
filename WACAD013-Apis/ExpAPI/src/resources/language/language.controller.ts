import { Request, Response } from "express";
import type { ChangeLangDto } from "./language.types.js";
import { StatusCodes } from "http-status-codes";

function changeLanguage(req: Request, res: Response) {
  const { lang } = req.body as ChangeLangDto;
  res.cookie("lang", lang).status(StatusCodes.OK).json({ lang });
  res.json({ lang });
}

export default { changeLanguage };
