const http = require("http"),
  pid = process.pid,
  port = 8000;

http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++) {
      // Simulate CPU work
      res.end(`Handled by PID: ${pid}`);
    }
  })
  .listen(port, () => {
    console.log(`Started server port: ${port} - Worker PID: ${pid}`);
  });

// Broadcasting
// process.on("message", msg => {
//   console.log(`Message from cluster: ${msg}`);
// });

// Crashed Worker
// setTimeout(() => {
//   process.exit(1);
// }, Math.random() * 10000);
