import fs from "fs/promises";
import getEnv from "../utils/validateEnv.js";
import { type Request, type Response, type NextFunction } from "express";

type LogType = "simple" | "complete";
const env = getEnv();
const pathLog = `${process.cwd()}/${env.LOGGER_PATH}`;
const fileLog = `${pathLog}/logs.log`;

async function createLoggerPath() {
  try {
    await fs.access(pathLog);
  } catch (err) {
    await fs.mkdir(pathLog);
  }
}

function logger(type: LogType) {
  if (type === "simple") {
    return async (req: Request, res: Response, next: NextFunction) => {
      await createLoggerPath();
      const log = `${(new Date().toISOString(), req.url, req.method)}`;
      // await fs.appendFile(fileLog.log)
      console.log("simple");
      next();
    };
  } else {
    return async (req: Request, res: Response, next: NextFunction) => {
      await createLoggerPath();
      const log = `${
        (new Date().toISOString(),
        req.url,
        req.method,
        req.httpVersion,
        req.get("User-Agent"))
      }`;
      console.log("simple");
      next();
    };
  }
}

export default logger;
