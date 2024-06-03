const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: false,
    },

    avatar: {
      type: String,
      required: false,
    },

    googleId: {
      type: String,
      required: false,
    },
  },

  {
    collection: "Users",
  }
);

module.exports = model("User", userSchema);


/* 
password: {
    type: String, 
    required: false, 
  },

  googleId: {
    type: String, 
    required: false,   
  },
*/ 
