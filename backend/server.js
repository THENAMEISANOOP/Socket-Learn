const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const setupSocket = require("./sockets/socket");

require("dotenv").config(); 

const app = express();
const server = http.createServer(app);

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Register Routes
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/messages", messageRoutes);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
setupSocket(io);

// Example route
app.get("/", (req, res) => res.send("Server running"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
