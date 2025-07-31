const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// ✅ CORS FIX: match Angular dev server port
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

// ✅ Apply same CORS config for Express
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user.route");
const jobRoutes = require("./routes/job.route");
const dashboardRoutes = require("./routes/dashboard.route");
const chatRoutes = require("./routes/chat.route");
const resumeRoutes = require("./routes/resume.route");
const chatSocket = require("./sockets/chat.socket");

chatSocket(io);

app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/chat", chatRoutes);
app.use("/resume", resumeRoutes);
app.use("/uploads", express.static('uploads'));
app.use("/dashboard", dashboardRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("🌐 Welcome to HireNet API Running .....");
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
