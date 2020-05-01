const server = require("net").createServer();

let port = 8000,
  count = 0,
  sockets = {};

function timestamp() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}}`;
}

server.on("connection", socket => {
  socket.id = count++;

  console.log("Client connect");
  socket.write("Welcome new client!\n");
  socket.write("Please type your name: ");

  socket.on("data", data => {
    if (!sockets[socket.id]) {
      socket.name = data.toString().trim();
      socket.write(`Welcome ${socket.name}!\n`);
      sockets[socket.id] = socket;
      return;
    }
    Object.entries(sockets).forEach(([key, cs]) => {
      if (socket.id == key) return;
      cs.write(`${socket.name} ${timestamp()}: `);
      cs.write(data);
    });
  });

  socket.on("end", () => {
    delete sockets[socket.id];
    console.log("Client disconnect");
  });
});

server.listen(port, () => console.log(`Server Running on: ${port}`));
