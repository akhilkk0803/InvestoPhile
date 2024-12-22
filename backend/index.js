const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const User = require("./model/userModel");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(8080, () => {
  console.log("server is running on port 8080");
});
