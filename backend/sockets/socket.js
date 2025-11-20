// socket.js
const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Listen for messages from clients
    socket.on("sendMessage", (data) => {
      // Broadcast the message to all connected clients
      io.emit("receiveMessage", data);
    });

    // Optional: handle typing indicator
    socket.on("typing", (username) => {
      socket.broadcast.emit("typing", username); // notify everyone else
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = setupSocket;
