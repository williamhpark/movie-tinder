const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  netflixid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  synopsis: { type: String, required: true },
  type: { type: String, required: true },
  released: { type: String, required: true },
  runtime: { type: String, required: true },
});

const Show = mongoose.model("Show", showSchema);

module.exports = Show;
