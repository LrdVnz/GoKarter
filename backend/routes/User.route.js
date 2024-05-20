const express = require("express");
const data = require("../../src/data/posts.json");
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

