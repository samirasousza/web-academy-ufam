import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/wasm-compiler-edge";
import type { Response } from "express";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes.js";
import { ReasonPhrases } from "http-status-codes"; 

export function authErrors(err: any, res: Response) {
  if (err instanceof NotFoundError) {
    res.status(StatusCodes.NOT_FOUND).json({
      error: ReasonPhrases.NOT_FOUND,
      message: err.message,
    });
  } else if (err instanceof PrismaClientValidationError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "Validation Error",
      message: "The data provided is invalid.",
    });
  } else if (err instanceof PrismaClientKnownRequestError) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      error: "Database Error", 
      message: err.message 
    });
  } else {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Something went wrong. Please try again later.",
    });
  }
}

export class NotFoundError extends Error {
  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}