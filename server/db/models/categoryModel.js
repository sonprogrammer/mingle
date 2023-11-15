const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "category", // 몽고디비 컬렉션 이름 설정
  }
);

module.exports = mongoose.model("Category", categorySchema);
