const fs = require("fs");
const http = require("http");
const dotenv = require("dotenv");

const strings = require("../utils/strings");

dotenv.config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
  quiet: true,
});

const PORT = process.env.PORT ?? 7777;
const FOLDER = process.argv[2];

const servidor = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readdir(`${process.cwd()}/${FOLDER}`, (err, files) => {
      if (err) console.log(err);
      else {
        res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
        files.forEach((file) => res.write(strings.createLink(file)));
        res.end();
      }
    });
  } else {
    const fileName = req.url.slice(1);

    fs.readFile(`${FOLDER}/${fileName}`, "utf-8", (err, data) => {
      if (err) console.log(err);
      else {
        res.writeHead(200, {
          "content-type": "text/html;charset=utf-8",
        });

        res.write(`<pre>${data}</pre>`);
        res.write(`<br><a href="/">Voltar</a>`);
        res.end();
      }
    });
  }
});

// http://localhost:7777/
servidor.listen(PORT);
// node .\index.js .\arquivo\
