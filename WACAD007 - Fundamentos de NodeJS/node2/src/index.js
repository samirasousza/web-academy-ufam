const http = require("http");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config( {quiet: true} );

const server = http.createServer((req, res) => {
  fs.readdir(process.argv[2], (err, files) => {
    if (err) console.log(err);