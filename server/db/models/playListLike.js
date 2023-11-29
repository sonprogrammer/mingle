const mongoose = require("mongoose");

const songLikedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    playListId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
      required: true,
      index: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "playListLiked", 
  }
);

module.exports = mongoose.model("PlayListLiked", songLikedSchema);
