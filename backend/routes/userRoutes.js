const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../model/userModel");
const Goal = require("../model/Goal");

const generateError = (err, code) => {
  const error = new Error(err);
  error.statusCode = code;
  return error;
};
const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY);
  return token;
};

const getUserFromToken = (token) => {
  try {
    const userId = jwt.verify(token, process.env.JWT_KEY);
    return userId;
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

router.post("/signup", async (req, res, next) => {
  const { name, email, password, age } = req.body;
  console.log(name);
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

router.post("/getGoals", async (req, res, next) => {
  const { userToken } = req.body;
  console.log(userToken);
  const userId = getUserFromToken(userToken).id;
  console.log(userId);
  if (!userToken) {
    return res.status(401).json({ error: "Authorization token missing" });
  }
  try {
    const goals = await Goal.find({ userId });
    if (!goals || goals.length == 0) {
      throw generateError("No Existing Goals", 409);
      //res.status(500).send("Err");
    }
    res.status(200).json(goals);
  } catch (error) {
    next(error);
    //console.log(error);
  }
});

router.post("/createGoal", async (req, res, next) => {
  const { userToken, goalDetails } = req.body;
  const {
    goalName,
    investmentType,
    investmentAmount,
    targetAmount,
    riskTolerance,
    frequency,
    duration,
  } = goalDetails;
  // console.log(goalDetails);
  const userId = getUserFromToken(userToken).id;
  //console.log(userId);
  //console.log(goal);
  if (!userToken) {
    return res.status(401).json({ error: "Authorization token missing" });
  }
  console.log(
    userId,
    goalName,
    investmentType,
    investmentAmount,
    targetAmount,
    riskTolerance,
    frequency,
    duration
  );
  try {
    const newGoal = await Goal.create({
      userId,
      goalName,
      investmentType,
      investmentAmount,
      targetAmount,
      riskTolerance,
      frequency,
      duration,
    });
    console.log(newGoal);
    if (!newGoal) {
      throw generateError("Goal Insertion Failed!", 500);
    }
    res.status(200).json({ message: "New Goal Created Successfully" });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
