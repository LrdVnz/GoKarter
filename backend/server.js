require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 3000;
const User = require("./models/User.model");
const Score = require("./models/Scores.model")
const userRoute = require("./routes/User.route")
const scoreRoute = require("./routes/Score.route")

app.use(cors());

app.get("/", async (req, res) => {
  res.send("success!!")
});

app.use(express.json());

app.use("/user", userRoute)
app.use("/score", scoreRoute)

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
