const { spawn } = require("child_process");

const child = spawn("find", [".", "-type", "f"]);

child.stdout.on("data", data => {
  console.log(`Child stdout:\n${data}`);
});

child.stderr.on("data", data => {
  console.log(`Child stderr:\n${data}`);
});

child.on("exit", (code, signal) => {
  console.log(`Child process exited with code ${code}, signal ${signal}`);
});
