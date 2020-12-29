const express = require("express");
const router = express.Router();

const Show = require("../models/showModel");
const auth = require("../middleware/auth");

// @route   POST /accepted
// @desc    Add a show to the accepted collection
// @access  Public
router.post("/accepted", async (req, res) => {
  try {
    const {
      roomid,
      userid,
      netflixid,
      title,
      synopsis,
      image,
      type,
      released,
      runtime,
    } = req.body;
    const newShow = new Show({
      roomid,
      userid,
      accepted: true,
      netflixid,
      title,
      synopsis,
      image,
      type,
      released,
      runtime,
    });
    const acceptedShow = await newShow.save();
    res.json(acceptedShow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /rejected
// @desc    Add a show to the rejected collection
// @access  Public
router.post("/rejected", async (req, res) => {
  try {
    const {
      roomid,
      userid,
      netflixid,
      title,
      synopsis,
      image,
      type,
      released,
      runtime,
    } = req.body;
    const newShow = new Show({
      roomid,
      userid,
      accepted: false,
      netflixid,
      title,
      synopsis,
      image,
      type,
      released,
      runtime,
    });
    const rejectedShow = await newShow.save();
    res.json(rejectedShow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /accepted
// @desc    Retreive all shows that were accepted by a user
// @access  Public
router.get("/accepted/:roomid", async (req, res) => {
  try {
    const acceptedShows = await Show.find({
      roomid: req.params.roomid,
      accepted: true,
    });

    res.json(acceptedShows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /rejected
// @desc    Retreive all shows that were rejected by a user
// @access  Public
router.get("/rejected/:roomid", async (req, res) => {
  try {
    const rejectedShows = await Show.find({
      roomid: req.params.roomid,
      accepted: false,
    });
    res.json(rejectedShows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
