import express from "express";
import dotenv from "dotenv";
import getEnv from "./utils/validateEnv.js";
import router from "./router/router.js";

dotenv.config({ quiet: true});

const app = express();
const env = getEnv();
const PORT = env.PORT;

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
    res.json({ msg: "oi"});
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
