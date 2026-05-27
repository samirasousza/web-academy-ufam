import express from "express"
import getEnv from "./utils/validateEnv.js"

const env = getEnv()

const PORT = env.PORT
const app = express()

app.get("/", (req, res) => {
    res.send("Hello World!yes");
})

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}`)
})
