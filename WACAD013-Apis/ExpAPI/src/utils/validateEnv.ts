import { cleanEnv, port, url, num, str } from "envalid";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

function getEnv() {
  return cleanEnv(process.env, {
    PORT: port({ default: 3333 }),
    LOGGER_PATH: str({ default: "logs" }),
    DATABASE_URL: url(),
    ROUNDS_BCRYPT: num({ default: 10 }),
    DEFAULT_LANG: str({ default: "pt-BR" }),
    SESSION_SECRET: str(),
  });
}

export default getEnv;
