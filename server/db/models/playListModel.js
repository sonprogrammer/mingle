const mongoose = require("mongoose");

const playListSchema = new mongoose.Schema(
  {
    playListSongs: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
      default: [],
    },
    playListTitle: { type: String, required: true },
    playListExplain: { type: String, required: true },
    playListCategory: { type: Array },
    playListOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    playListComment: {
      type: [
        {
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            reuqired: true,
          },
          comment: { type: String, required, reuired: true },
          // 작성 일시도 들어가야 할까?
        },
      ],
      default: [],
    },
    // 이미지가 없을 시에는 기본 이미지로 대체
    playListImg: { type: string, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "playlist", // 몽고디비 컬렉션 이름 설정
  }
);

module.exports = mongoose.model("Playlist", playListSchema);
