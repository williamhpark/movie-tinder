const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  userId: { type: String },
  accepted: { type: Boolean },
  netflixId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String },
  synopsis: { type: String },
  type: { type: String, required: true },
  released: { type: String },
  runtime: { type: String },
});

const Show = mongoose.model("show", showSchema);

module.exports = Show;
