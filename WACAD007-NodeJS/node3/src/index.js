import fs from "fs/promises";
import http from "http";
import { createServer } from "http";
import { config } from "dotenv";
import { inc } from "./utils/counter.mjs";

const PORT = process.env.PORT ?? 7777;

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html;charset=utf8" });
    const partial1 = await fs.readFile("public/html/partial1.html");
    const partial2 = await fs.readFile("public/html/partial2.html");

    res.write(partial1);
    res.write(partial2);
    res.end();
  }else if (req.url === "/lorem") {
    res.writeHead(200, { "content-type": "text/html;charset=utf8" });
    const partial1 = await fs.readFile("public/html/partial1.html");
    
    const lorem = "COnjunto de parágrafos lorem"
    
    const partial2 = await fs.readFile("public/html/partial2.html");

    res.write(partial1);
    res.write(lorem)
    res.write(partial2);
    res.end();
  } else if (req.url === "/style.css") {
    const css = await fs.readFile("public/css/style.css");
    res.write(css);
    res.end();
  } else {
    res.end();
  }
});

server.listen(PORT);

// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

// const promise = new Promise((resolve, reject) => {
//   fs.readFile(`${process.cwd()}/public/1.txt`, "utf-8", (err, content) => {
//     if (err) reject(err);
//     else resolve(parseInt(content));
//   });
// });

// promise
// .then((c) => console.log(c))
// .catch((c) => console.log(c))
