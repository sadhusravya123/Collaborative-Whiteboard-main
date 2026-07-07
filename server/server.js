import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import ConnectionDB from "./db/db.js";
import mainRoute from "./routes/main.routes.js";
import { socketHandlers } from "./socket/socketHandlers.js";

// Load environment variables FIRST


// Then connect to the database
// ConnectionDB();
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/v1", mainRoute);

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "Server is ready" });
});

// Socket.IO setup
socketHandlers(io);

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});