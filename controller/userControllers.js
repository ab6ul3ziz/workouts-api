const mongoose = require("mongoose");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const logingUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  logingUser,
  signupUser,
};
