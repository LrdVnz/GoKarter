const express = require("express");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
  let result = await User.find();
  res.send(result);
});

userRoute.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRoute.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    try {
      res.redirect(
        `${process.env.BACKEND_URL}/user/profile?accessToken=${req.user.accToken}`
      );
    } catch (error) {
      next(error);
    }
  }
);

userRoute.post("/", async (req, res) => {
  try {
    let user = await User.create(req.body);
    console.log(user);
    res.send(user).status(201);
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRoute;
