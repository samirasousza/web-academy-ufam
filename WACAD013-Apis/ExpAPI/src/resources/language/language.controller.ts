import { Request, Response } from "express";
import type { ChangeLangDto } from "./language.types.js";
import { StatusCodes } from "http-status-codes";

function changeLanguage(req: Request, res: Response) {
  const { lang } = req.body as ChangeLangDto;

   res.cookie("lang", lang, {
    maxAge: 360000,
  });
  
  return res.status(StatusCodes.OK).json({ lang });
}

function getLanguage(req: Request, res: Response) {
  const lang = req.cookies.lang || "en";

  return res.status(StatusCodes.OK).json({ lang });
}

function clearLanguage(req: Request, res: Response) {
  res.clearCookie("lang");

  return res.status(StatusCodes.OK).json({
    msg: "Idioma removido com sucesso",
  });
}

export default { changeLanguage, getLanguage, clearLanguage };
