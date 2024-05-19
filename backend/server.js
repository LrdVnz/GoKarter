require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 3000;
const User = require("./models/User.model");
const Score = require("./models/Scores.model")

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  lres.send("success!!")
});

app.get("/users", async (req, res) => {
  let result = await User.find();
  res.send(result);
});

app.get("/scores", async (req, res) => {
  let result = await Score.find();
  res.send(result);
});

app.post("/", async (req, res) => {
  try {
    let user = await User.create(req.body);
    console.log(user);
    res.send(user).status(201);
  } catch (err) {
    console.log(err);
  }
});

async function initServer() {
  try {
    await mongoose.connect(process.env.DB_URL, { dbName: "main_data" });

    console.log("connection successful!");
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (err) {
    console.log("connection error!");
    console.log(err);
  }
}

initServer();
