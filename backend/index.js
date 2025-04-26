const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const User = require("./model/userModel");
const Goal = require("./model/Goal");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'investophile-api',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/user", userRoutes);
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message });
});
app.listen(9090, () => {
  console.log("server is running on port 8080");
});
