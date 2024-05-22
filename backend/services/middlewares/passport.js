const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken")

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CB,
};

const googleStrategy = new GoogleStrategy(
  options,
  async (_accessToken, _refreshToken, profile, passportNext) => {
    try {
      const { email, given_name, family_name, sub, picture } = profile._json;
     
      const user = await User.findOne({ email });

      if (user) {
        const accToken = createToken({
          _id: user._id,
        });
        
        passportNext(null, { accToken });
      } else {
        const newUser = new User({
          name: given_name,
          lastName: family_name,
          email: email, 
          googleId: sub,
          avatar: picture
        });

        console.log("il nuovo autore che viene creato : ")
        console.log(newUser)
        console.log("--------------------------------- ")
        
        await newUser.save();
        
        const accToken = createToken({
          name: newUser.name,
          _id: newUser._id 
        });
        
        passportNext(null, { accToken });
      }
    } catch (error) {
      passportNext(error);
    }
  }
);

function createToken(user, id) {
    const userPayload = {
      user: user,
    };

    console.log("il payload passato nel jwt sign : ")
    console.log(userPayload)
    const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET);
    console.log("-------------------------------------")

    return accessToken;
  }  

module.exports = googleStrategy; 