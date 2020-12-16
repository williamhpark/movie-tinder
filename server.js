const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// App Config
const app = express();
const PORT = process.env.PORT || 5000;

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
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
