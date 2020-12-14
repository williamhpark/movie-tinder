const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

// @route   POST
// @desc    Add a user to the database
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all data fields are filled
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists." });

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          res.json({
            user: { id: user.id, name: user.name, email: user.email },
          });
        });
      });
    });
  });
});

// // @route   GET
// // @desc    Retreive all users in the database
// // @access  Public
// router.get("/", async (req, res) => {
//   const shows = await Show.find();
//   res.json(shows);
// });

// // @route   GET
// // @desc    Retreive a specific user in the database
// // @access  Public
// router.get("/:id", async (req, res) => {
//   const show = await Show.findById(req.params.id);
//   res.json(show);
// });

module.exports = router;
