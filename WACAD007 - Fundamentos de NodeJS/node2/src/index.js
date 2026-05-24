import { createLink } from "../utils/util.mjs";
import fs from "fs";
import { createServer } from "http";
import { config } from "dotenv";

config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
  quiet: true,
});

const PORT = process.env.PORT ?? 7777;
const FOLDER = process.argv[2];

const servidor = createServer((req, res) => {

  if (req.url === "/") {

    fs.readdir(`${process.cwd()}/${FOLDER}`, (err, files) => {

      if (err) {
        console.log(err);

        res.writeHead(500, {
          "content-type": "text/html;charset=utf-8",
        });

        res.end("Erro ao ler diretório");

      } else {

        res.writeHead(200, {
          "content-type": "text/html;charset=utf-8",
        });

        files.forEach((file) => {
          res.write(createLink(file));
        });

        res.end();
      }
    });

  } else {

    const fileName = req.url.slice(1);

    fs.readFile(
      `${FOLDER}/${fileName}`,
      "utf-8",
      (err, data) => {

        if (err) {

          res.writeHead(404, {
            "content-type": "text/html;charset=utf-8",
          });

          res.end("Arquivo não encontrado");

        } else {

          res.writeHead(200, {
            "content-type": "text/html;charset=utf-8",
          });

          res.write(`<pre>${data}</pre>`);
          res.write(`<br><a href="/">Voltar</a>`);

          res.end();
        }
      }
    );
  }
});


// http://localhost:7777
servidor.listen(PORT);