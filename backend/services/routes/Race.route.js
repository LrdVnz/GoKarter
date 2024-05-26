const express = require("express");
const Race = require("../models/Race.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const raceRoute = express.Router();

raceRoute.get("/", async (req, res) => {
  let result = await Race.find().populate("users.user");
  res.send(result);
});

raceRoute.get("/:id", async (req, res) => {
  let result = await Race.findById(req.params.id).populate("users.user");
  console.log(result)
  res.send(result);
});

raceRoute.post("/", async (req, res) => {
  try {
    let race = await Race.create(req.body);
    console.log(race);
    res.send(race).status(201);
  } catch (err) {
    console.log(err);
  }
});

raceRoute.put("/:id", async (req, res) => {
  try {
    const updatedBody = req.body;
    const result = await Race.updateOne({ _id: req.params.id }, updatedBody);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});


module.exports = raceRoute;
