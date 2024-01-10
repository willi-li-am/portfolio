const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const skillRouter = require("./routes/skills.js");

const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB!");
});

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/skills", skillRouter);

app.listen(port, () => {
  console.log(`Backend is now running on port ${port}!`);
});
