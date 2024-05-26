const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const racesSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },

    users: [
      usersSchema
    ],
    /* 
    Da calcolare in automatico! 
    average: {
      type: Number,
      required: true,
    }, */

    //l'oggetto lap si collegherà a race.
  },

  {
    collection: "Races",
  }
);

module.exports = model("Race", racesSchema);
