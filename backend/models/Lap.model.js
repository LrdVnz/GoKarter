const { Schema, model } = require("mongoose");

const lapsSchema = new Schema(
  {
    score: {
      type: Number,
      required: true,
    }
  },

  {
    collection: "Laps",
  }
);

module.exports = model("Lap", lapsSchema);
