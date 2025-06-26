const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.url}`);

  let filePath = "./Html" + req.url;
  if (req.url === "/") {
    filePath = "./Html/index.html";
  }

  const extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".avif":
      contentType = "image/avif";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
