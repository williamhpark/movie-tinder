const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const auth = require("../middleware/auth");

// @route   POST /register
// @desc    Register a user to the database
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, passwordCheck } = req.body;

    // Validation
    if (!name || !email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long" });
    }
    if (password != passwordCheck) {
      return res
        .status(400)
        .json({ msg: "The password and password verification do not match" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    }

    // Hash the password so that it is unreadable for security
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Save the user to the database
    const newUser = new User({ name, email, password: passwordHash });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /login
// @desc    User login
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account has been registered with this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create a JSON web token for the logged in user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: { id: user._id, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   DELETE /delete
// @desc    Delete logged in user, using custom auth middleware
// @access  Public
router.delete("/delete", auth, async (req, res) => {
  try {
    // Remove the deleted user from the database
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /isTokenValid
// @desc    Check if a token is valid
// @access  Public
router.post("/isTokenValid", async (req, res) => {
  try {
    // Check for empty token
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    // Check for unverified user
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }
    // Check for deleted user
    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /loggedInUser
// @desc    Get the data of the logged in user
// @access  Public
router.get("/loggedInUser", auth, async (req, res) => {
  const user = await User.findById(req.user);
  // Only return the user's ID and name
  res.json({ id: user._id, name: user.name });
});

module.exports = router;
