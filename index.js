const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`backend is running on port ${port}`);
});
connectDB();
