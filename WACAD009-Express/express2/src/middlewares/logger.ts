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
      const log = `${new Date().toISOString()} | ${req.method} | ${req.url}`;
      await fs.appendFile(fileLog, log + "\n");
      console.log("simple");
      next();
    };
  } else {
    return async (req: Request, res: Response, next: NextFunction) => {
      await createLoggerPath();
      const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | HTTP/${req.httpVersion} | ${req.get("User-Agent")}`;
      await fs.appendFile(fileLog, log + "\n");
      console.log("complete");
      next();
    };
  }
}

export default logger;
