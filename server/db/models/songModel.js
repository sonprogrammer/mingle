const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    songName: { type: String, required: true },
    songDescription: { type: String, default: "" },
    // 외부에서 긁어오는 음원일 시 songArtist란에 가수명이 채워짐.
    songArtist: { type: String, default: null },
    // 유저가 직접 올린 음원일 시 User 모델을 참조하여 해당 유저의 정보가 들어감.
    songUploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // 곡의 길이
    songDuration: { type: Number, required: true },
    // 곡 이미지 파일 이름
    songImageName: { type: String },
    // 곡 이미지 경로
    songImageLocation: { type: String },
    // 곡 재생 파일 이름
    audioName: { type: String, required: true },
    // 곡 재생 경로
    audioLocation: { type: String, required: true },
    // 곡 카테고리
    songCategory: { type: String, required: true },
    // 곡의 템포
    songTempo: { type: String, required: true },
    // 곡에 달린 좋아요 (유저 참조)
    songLiked: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    // 곡에 달린 좋아요 수
    songLikedCount: { type: Number, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "song", // 몽고디비 컬렉션 이름 설정
  }
);

module.exports = mongoose.model("Song", songSchema);
