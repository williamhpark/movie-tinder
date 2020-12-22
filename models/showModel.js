const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  // sessionid: { type: String, required: true, unique: true },
  sessionid: { type: String, required: true },
  userid: { type: String, required: true },
  accepted: { type: Boolean, default: undefined },
  netflixid: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String },
  synopsis: { type: String },
  type: { type: String },
  released: { type: String },
  runtime: { type: String },
});

const Show = mongoose.model("shows", showSchema);

module.exports = Show;
