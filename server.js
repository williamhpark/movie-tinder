const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const socketio = require("socket.io");
const {
  sessionCreate,
  getSession,
  getRoomUsers,
} = require("./client/socketUtil/sessions");
dotenv.config();

// App Config
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// Middlewares
app.use(express.json());
app.use(cors());

// Routes Config
app.use("/api/shows", require("./routes/showRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// DB Config
console.log("Connecting to MongoDB.");
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("MongoDB connection established.");
  }
);

// Listener
server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

io.on("connection", (socket) => {
  console.log("ws connection");

  socket.on("sessioncreate", (room, creator, currentUser) => {
    if (creator == "true") {
      const session = sessionCreate(room, currentUser.user);
      session.users.push(currentUser.user);
      console.log(session);
    }
    const session = getSession(room);
    socket.join(session.roomCode);

    io.to(session.roomCode).emit("roomUsers", getRoomUsers(session.roomCode));
  });

  socket.on("userJoin", (roomCode, currentUser, callback) => {
    const session = getSession(roomCode);

    if (session) {
      session.users.push(currentUser.user);
      socket.join(session.roomCode);

      socket.emit("roomNotFound", "Room Found", roomCode);
    } else {
      socket.emit("roomNotFound", "Room does not exist", roomCode);
    }
    callback();
  });

  socket.on("disconnect", () => {
    console.log("user left");
  });
});
