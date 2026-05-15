const fs = require("fs");
const http = require("http");
require('dotenv').config();

const PORT = process.env.PORT ?? 7777

const dirName = process.argv[2];

const servidor = http.createServer((req, res) => {
  fs.readdir(dirName, (err, files) => {
    if (err) console.log(err);
    else {
      res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
      files.forEach((file) => res.write(`${file}<br>`));
      res.end();
    }
  });
});

// http://localhost:7777/
servidor.listen(PORT);
