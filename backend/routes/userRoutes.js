const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../model/userModel");
const generateError = (err, code) => {
  const error = new Error(err);
  error.statusCode = code;
  return error;
};
const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY);
  return token;
};
router.post("/signup", async (req, res, next) => {
  const { name, email, password, age } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw generateError("User Already Exists", 409);
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name,
      email,
      passwordHash,
      age,
    });
    const token = createToken(newUser._id);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw generateError("User does not exsits", 401);
    }
    const isValidPassword = bcrypt.compareSync(password, user.passwordHash);
    if (!isValidPassword) {
      throw generateError("Wrong password", 404);
    }
    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});
router.get("/getGoals/:userId", (req, res, next) => {});
router.post("/createGoal", (req, res, next) => {});
module.exports = router;
