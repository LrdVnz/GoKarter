require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoute = require("./services/routes/User.route")
const scoreRoute = require("./services/routes/Score.route")
const lapRoute = require("./services/routes/Lap.route")
const passport = require("passport")
const googleStrategy = require("./services/middlewares/passport")

app.use(cors());
app.use(express.json());

passport.use("google", googleStrategy);

app.get("/", async (req, res) => {
  res.send("success!!")
});

app.use("/user", userRoute)
app.use("/score", scoreRoute)
app.use("/lap", lapRoute)

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
