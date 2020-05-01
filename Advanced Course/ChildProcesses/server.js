const http = require("http"),
  { fork } = require("child_process");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/compute") {
    // const sum = longComputation();
    // return res.end(`Sum is: ${sum}`);
    const compute = fork("compute.js");
    compute.send("Start");
    compute.on("message", sum => {
      res.end(`Sum is: ${sum}`);
    });
  } else {
    res.end("OK");
  }
});

server.listen(3000);
