import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

type Source = "body" | "params";

const validate = (schema: Schema, source: Source = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source], {
      abortEarly: false, // Retorna todos os erros encontrados, e não apenas o primeiro
    });
    if (error) {
      return res.status(422).json({ error: error.details });
    } else next();
  };
};


export default validate;
