const { Schema, model } = require("mongoose");

const racesSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },

    users: [
      [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
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
