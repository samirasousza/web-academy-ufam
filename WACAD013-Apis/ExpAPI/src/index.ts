import express from "express";
import dotenv from "dotenv";
import getEnv from "./utils/validateEnv.js";
import router from "./router/router.js";
import setLangCookie from "./middlewares/setLangCookie.js";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const cookieParser = require("cookie-parser");

dotenv.config({ quiet: true });

const app = express();
const env = getEnv();
const PORT = env.PORT;

app.use(express.json());
app.use(router);
app.use(cookieParser());
app.use(setLangCookie);
app.use(
  session({
    genid: () => uuidv4(),
    name: "sid",
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      secure: !!(process.env.NODE_ENV === "production"),
    },
  }),
);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ msg: "oi" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
