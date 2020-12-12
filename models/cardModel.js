const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  netflixid: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  synopsis: { type: String, required: true },
  type: { type: String, required: true },
  released: { type: Number, required: true },
  runtime: { type: String, required: true },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
