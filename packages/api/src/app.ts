import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// Setup socket.io server
const io = new Server(server, {
  cors: {
    origin: "*", // For now allow all origins, you can restrict this later
  },
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("pingFromClient", (msg) => {
    console.log("Received from client:", msg);
    socket.emit("pongFromServer", "pong");
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", ({ roomId, message }) => {
    // Send message to all in room, including sender:
    io.to(roomId).emit("roomMessage", { sender: socket.id, message });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
