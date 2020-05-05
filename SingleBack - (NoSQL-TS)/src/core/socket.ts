import webSocket, { Server as SocketServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";

let IO: SocketServer, SOCKET: Socket;

export default (server: HttpServer) => {
  IO = webSocket(server);

  IO.on("connection", socket => {
    SOCKET = socket;
    console.log(`New socket connection ${SOCKET.id}`);

    SOCKET.on("disconnect", () => {
      console.log(`New socket connection ${SOCKET.id}`);
    });
  });
};

export { IO, SOCKET };
