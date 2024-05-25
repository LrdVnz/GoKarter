const { Schema, model } = require("mongoose");

const lapsSchema = new Schema(
  {
    race: {
      type: Schema.Types.ObjectId,
      ref: "Race",
      required: true
    }, 

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    
    time: {
      type: Number, 
      required: true
    }
  },

  {
    collection: "Laps",
  }
);

module.exports = model("Lap", lapsSchema);
