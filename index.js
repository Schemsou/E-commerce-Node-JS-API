const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require('./routes/products')
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/products', productRouter)
app.listen(port, () => {
  console.log(`backend is running on port ${port}`);
});
