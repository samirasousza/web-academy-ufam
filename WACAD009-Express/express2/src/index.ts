import express from "express";
import getEnv from "./utils/validateEnv.js";
import morgan from "morgan"; //log
import logger from "./middlewares/logger.js";
import router from "./router/router.js";
import { engine } from "express-handlebars";
import helpers from "./views/helpers/helpers.js";

const env = getEnv();

const PORT = env.PORT;
const app = express();
const publicPath = `${process.cwd()}`;

app.use(router)
app.use(logger("complete"))
// app.use(morgan("short"));

app.engine("handlebars", engine({ helpers: helpers }))
app.set("view engine", "handlebars")
app.set("views", `${publicPath}/src/views`)

// http://localhost:3333/css/style.css
app.use("/css", express.static(`${publicPath}/public/css`))
// http://localhost:3333/img/wa.png
app.use("/img", express.static(`${publicPath}/public/img`))
app.use("/js", express.static(`${publicPath}/public/js`))

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}`);
});
