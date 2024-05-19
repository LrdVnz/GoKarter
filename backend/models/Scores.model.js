const { Schema, model } = require("mongoose");

const scoresSchema = new Schema(
  {
    average: {
      type: Number,
      required: true,
    },

    lap1: {
      type: Number,
      required: true,
    },

    lap2: {
      type: Number,
      required: false,
    },

    lap3: {
      type: Number,
      required: false,
    },

    lap4: {
      type: Number,
      required: false,
    },

    lap5: {
      type: Number,
      required: false,
    },
  },

  {
    collection: "Scores",
  }
);

module.exports = model("Score", scoresSchema);
