const router = require("express").Router();
const Card = require("../models/cardModel");

// @route   POST
// #desc    Add a post to the database
router.post("/", async (req, res) => {
  // Retreive the data from the request
  const {
    netflixid,
    title,
    image,
    synopsis,
    type,
    released,
    runtime,
  } = req.body;

  // Construct the Post model
  const newCard = new Card({
    netflixid,
    title,
    image,
    synopsis,
    type,
    released,
    runtime,
  });

  // Save Post model
  try {
    const savedCard = await newCard.save();
    res.json(savedCard);
  } catch (err) {
    console.error(err);
  }
});

// @route   GET
// @desc    Retreive all posts in the database
router.get("/", async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
});

// @route   GET
// @desc    Retreive a specific post in the database
router.get("/:id", async (req, res) => {
  const card = await Card.findById(req.params.id);
  res.json(card);
});

module.exports = router;
