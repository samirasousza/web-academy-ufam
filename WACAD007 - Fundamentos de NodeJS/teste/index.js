const fs = require("fs");

fs.rename("1.txt", "2.txt", (err) => {
  if (err) console.log(err);
  else console.log("arquivo renomeado");
});

// const http = require('http')

// const servidor = http.createServer((req, res) => {
//     res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
//     res.write("Hello World! e coração")
//     res.end()
// })

// // http://localhost:7777/
// servidor.listen(7777)
