const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join private chat room
    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // Send private message only inside this room
    socket.on("sendPrivateMessage", (data) => {
      const { roomId, message } = data;

      io.to(roomId).emit("receivePrivateMessage", {
        message,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = setupSocket;
