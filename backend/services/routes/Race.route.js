const express = require("express");
const Race = require("../models/Race.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
const verifyToken = require("../middlewares/verifyToken.js");

const raceRoute = express.Router();

raceRoute.get("/", verifyToken ,async (req, res) => {
  let result = await Race.find().populate("users.user");
  res.send(result);
});

raceRoute.get("/:id", verifyToken , async (req, res) => {
  let result = await Race.findById(req.params.id).populate("users.user");
  console.log(result)
  res.send(result);
});

raceRoute.post("/", verifyToken ,async (req, res) => {
  try {
    let race = await Race.create(req.body);
   
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
});

raceRoute.put("/:id", verifyToken ,async (req, res) => {
  try {
    const updatedBody = req.body;
    const result = await Race.updateOne({ _id: req.params.id }, updatedBody);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

raceRoute.put("/:id/users", verifyToken ,async (req, res) => {
  try {
    const race = await Race.findById({ _id: req.params.id})

    const updatedBody = req.body;
    const result = await Race.updateOne({ _id: req.params.id }, updatedBody);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = raceRoute;
