import fs from "fs/promises";
import { createServer } from "http";
import { config } from "dotenv";
import { inc } from "./utils/counter.mjs";

const PORT = process.env.PORT ?? 7777;

const promise = new Promise((resolve, reject) => {
  fs.readFile(`${process.cwd()}/public/1.txt`, "utf-8", (err, content) => {
    if (err) reject(err);
    else resolve(parseInt(content));
  });
});

promise
.then((c) => console.log(c))
.catch((c) => console.log(c))

// const servidor = createServer((req, res) => {});

// servidor.listen(PORT);
