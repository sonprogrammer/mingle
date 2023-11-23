const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    genre: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "genre",
  }
);

module.exports = mongoose.model("Genre", genreSchema);
