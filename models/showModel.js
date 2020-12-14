const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  netflixid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  synopsis: { type: String, required: true },
  type: { type: String, required: true },
  released: { type: String, required: false },
  runtime: { type: String, required: false },
});

const Show = mongoose.model("show", showSchema);

module.exports = Show;
