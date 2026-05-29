import express from "express";
import getEnv from "./utils/validateEnv.js";
import morgan from "morgan"; //log
import logger from "./middlewares/logger.js";
import router from "./router/router.js";

const env = getEnv();

const PORT = env.PORT;
const app = express();
app.use(router)

app.use(logger("simple"))

app.use("/css", express.static(`${process.cwd()}/public/css`))
app.use("/img", express.static(`${process.cwd()}/public/img`))
app.use("/js", express.static(`${process.cwd()}/public/js`))

// app.use(morgan("short"));

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}`);
});
