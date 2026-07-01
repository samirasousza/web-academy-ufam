import express from "express";
import dotenv from "dotenv";
import getEnv from "./utils/validateEnv.js";

dotenv.config({ quiet: true});

const app = express();
const env = getEnv();
const PORT = env.PORT;

app.get("/", (req, res) => {
    res.json({ msg: "oi"});
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})