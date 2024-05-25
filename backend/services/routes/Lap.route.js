const express = require("express");
const Lap = require("../models/Lap.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const lapRoute = express.Router();

lapRoute.get("/", async (req, res) => {
  let result = await Lap.find().populate("race").populate("user");
  res.send(result);
});

lapRoute.post("/", async (req, res) => {
  try {
    let lap = await Lap.create(req.body);
    console.log(lap);
    res.send(lap).status(201);
  } catch (err) {
    console.log(err);
  }
});

module.exports = lapRoute;
