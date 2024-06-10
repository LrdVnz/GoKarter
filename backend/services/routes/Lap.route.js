const express = require("express");
const Lap = require("../models/Lap.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
const verifyToken = require("../middlewares/verifyToken.js");

const lapRoute = express.Router();

lapRoute.get("/", verifyToken, async (req, res) => {
  let result = await Lap.find().populate("race").populate("user");
  res.send(result);
});

lapRoute.get("/:id", verifyToken, async (req, res) => {
  let result = await Lap.find({
    race: req.params.id,
  })
    .populate("race")
    .populate("user");
  res.send(result);
});

lapRoute.post("/", verifyToken, async (req, res) => {
  try {
    let lap = await Lap.create(req.body);
    console.log(lap);
    res.send(lap).status(201);
  } catch (err) {
    console.log(err);
  }
});

lapRoute.delete("/:id", verifyToken, async (req, res) => {
  try {
    let result = await Lap.deleteOne({ _id: req.params.id });
    
    res.send(result).status(201);
  } catch (err) {
    console.log(err);
  }
});


module.exports = lapRoute;
