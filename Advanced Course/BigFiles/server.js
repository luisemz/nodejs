const fs = require("fs"),
  server = require("http").createServer();

server.on("request", (req, res) => {
  // NEED A LOT OF MEMORY
  //   fs.readFile("./big.file", (err, data) => {
  //     if (err) throw err;

  //     res.end(data);
  //   });

  fs.createReadStream("./big.file").pipe(res);
});

server.listen(8000);
