const express = require("express");
const router = express.Router();

const Show = require("../models/showModel");

// @route   POST
// @desc    Add a show to the database
// @access  Public
router.post("/", async (req, res) => {
  const {
    netflixid,
    title,
    image,
    synopsis,
    type,
    released,
    runtime,
  } = req.body;

  const newShow = new Show({
    netflixid,
    title,
    image,
    synopsis,
    type,
    released,
    runtime,
  });

  try {
    const savedShow = await newShow.save();
    res.json(savedShow);
  } catch (err) {
    console.error(err);
  }
});

// @route   GET
// @desc    Retreive all shows in the database
// @access  Public
router.get("/", async (req, res) => {
  const shows = await Show.find();
  res.json(shows);
});

// @route   GET
// @desc    Retreive a specific show in the database
// @access  Public
router.get("/:id", async (req, res) => {
  const show = await Show.findById(req.params.id);
  res.json(show);
});

module.exports = router;
