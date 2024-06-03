const express = require("express");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const verifyToken = require("../middlewares/verifyToken");
const { uploadAvatar } = require("../middlewares/uploadFile");

require("dotenv").config();

const userRoute = express.Router();

userRoute.get("/", verifyToken, async (req, res) => {
  let result = await User.find();
  res.send(result);
});

userRoute.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRoute.get(
  "/callback",
  passport.authenticate("google", { session: false }), async (req, res, next) => {
    try {
    let user = JSON.stringify(req.user.user)
      res.redirect(
        `${process.env.BACKEND_URL}/user/profile?accessToken=${req.user.accToken}&user=${user}`
      );
    } catch (error) {
      res.send(error);
    }
  }
);

userRoute.get("/profile", async (req, res) => {
  try {
    let user = JSON.stringify(req.query.user)
    let authToken = req.query.accessToken;
  
    console.log("ytoooooooo")
    res.redirect(
      `${process.env.FRONTEND_URL}/googleLogin?currentUser=${user}&authToken=${authToken}`
    );
  } catch (err) {
    res.send(err);
  }
});

userRoute.post("/register", uploadAvatar, async (req, res) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    /* 
    cambiamo la password passata dall'utente con quella generata da bcrypt
    in questo modo possiamo copiare direttamente il body per creare l'utente senza scrivere ogni parametro a mano!  
    */
    req.body.password = hashedPassword;

    console.log(req.body);

    req.body.avatar = req.file.path;
    // per quando metto il form data tramite frontend
    // req.body.avatar = req.file.path;

    let user = await User.create(req.body);

    res.send(user).status(201);
  } catch (err) {
    res.send(err);
  }
});

userRoute.post("/login", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user == null) {
    res.send("user not found");
  }
  console.log(user);
  if (bcrypt.compare(req.body.password, user.password)) {
    const accessToken = createToken(user);
    res.json({ accessToken: accessToken, user: user });
  } else {
    res.send("you typed the wrong password");
  }
});

function createToken(user) {
  const userPayload = {
    user: user,
  };

  const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET);

  return accessToken;
}

module.exports = userRoute;
