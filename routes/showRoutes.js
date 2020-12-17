const express = require("express");
const router = express.Router();

const Show = require("../models/showModel");
const auth = require("../middleware/auth");

// @route   POST /accepted
// @desc    Add a show to the accepted collection
// @access  Public
router.post("/accepted", async (req, res) => {
  try {
    const { userid, netflixid, title } = req.body;
    const newShow = new Show({
      sessionid: "test",
      userid,
      accepted: true,
      netflixid,
      title,
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
    const { userid, netflixid, title } = req.body;
    const newShow = new Show({
      sessionid: "test",
      userid,
      accepted: false,
      netflixid,
      title,
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
router.get("/accepted", auth, async (req, res) => {
  try {
    const acceptedShows = await Show.find({
      sessionid: "1",
      userid: req.user,
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
router.get("/rejected", auth, async (req, res) => {
  try {
    const rejectedShows = await Show.find({
      sessionid: "1",
      userid: req.user,
      accepted: false,
    });
    res.json(rejectedShows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // @route   POST /owner
// // @desc    Add all the shows the users will be selecting from
// // @access  Public
// router.post("/owner", auth, async (req, res) => {
//   try {
//     const { netflixId, title, type, released, runtime } = req.body;
//     const newShow = new Show({
//       ownerId: req.user,
//       netflixId,
//       title,
//       image,
//       synopsis,
//       type,
//       released,
//       runtime,
//     });
//     const acceptedShow = await newShow.save();
//     res.json(acceptedShow);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // @route   GET /owner
// // @desc    Get all the shows the users will be selecting from
// // @access  Public
// router.get("/owner", auth, async (req, res) => {
//   try {
//     const shows = await Show.find({ ownerId: req.user });
//     res.json(shows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
