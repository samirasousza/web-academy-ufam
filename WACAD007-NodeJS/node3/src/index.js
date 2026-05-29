import fs from "fs/promises";
import http from "http";
import { URL } from "url";
import { loremIpsum } from "lorem-ipsum";
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
  }else if (req.url.startsWith("/lorem")) {
    res.writeHead(200, { "content-type": "text/html;charset=utf8" });
    const partial1 = await fs.readFile("public/html/partial1.html");

    const url = new URL (req.url, `http://${req.headers.host}`)
    const qtdParam = url.searchParams.get("qtd");
    
    const lorem = loremIpsum({ count: qtdParam, suffix: "\n", units: "paragraphs" })
    
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
