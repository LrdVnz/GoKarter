const express = require("express");
const Score = require("../models/Score.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const scoreRoute = express.Router();

scoreRoute.get("/", async (req, res) => {
  let result = await Score.find();
  res.send(result);
});

scoreRoute.post("/", async (req, res) => {
    try {
      let score = await Score.create(req.body);
      console.log(score);
      res.send(score).status(201);
    } catch (err) {
      console.log(err);
    }
  });
  
  module.exports = scoreRoute;