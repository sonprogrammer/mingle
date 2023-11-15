const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    songName: { type: String, required: true },
    // 외부에서 긁어오는 음원일 시 songArtist란에 가수명이 채워짐.
    songArtist: { type: String, default: null },
    // 유저가 직접 올린 음원일 시 User 모델을 참조하여 해당 유저의 정보가 들어감.
    songUploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    songDuration: { type: String, required: true },
    // 이미지가 없을 시에는 기본 이미지로 대체
    songImage: { type: String, default: null },
    // 음원
    songStream: { type: String, required: true },
    songCategory: { type: mongoose.Schema.Types.ObejectId, ref: "Category" },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "song", // 몽고디비 컬렉션 이름 설정
  }
);

module.exports = mongoose.model("Song", songSchema);
