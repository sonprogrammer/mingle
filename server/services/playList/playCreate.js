const playListSchema = require("../../db/models/playListModel");
const fs = require("fs");
const path = require("path");
const createError = require("http-errors");

/**
 * 플레이리스트 생성 함수
 * @param {object} jsonValue - 생성할 플레이리스트의 JSON 데이터
 * @param {string} userId - 생성한 플레이리스트의 사용자 ObjectId
 * @returns {Array} - [성공 여부(boolean), 메시지 객체(object)]
 */
async function playListCreate(jsonValue, userId) {
  try {
    // 플레이리스트 데이터에 userId 추가
    jsonValue.playListOwner = userId.toString();
    if (!jsonValue.genre) {
      throw createError(400, "genre가 없습니다.");
    }
    const timestamp = new Date().getTime();
    const imageName = `${timestamp}.png`;
    if (jsonValue.playListImg) {
      const decodedImage = Buffer.from(jsonValue.playListImg, "base64");
      const imagePath = path.join(
        __dirname,
        `../../upload/playListCover/${imageName}`
      );
      fs.writeFileSync(imagePath, decodedImage);
      jsonValue.playListImg = imagePath.slice(-17);
    }
    // 플레이리스트 데이터를 생성하여 저장한다
    const data = await playListSchema(jsonValue).save();

    if (data) {
      return { message: "플레이리스트가 생성되었습니다." , playListId: data._id, playListImg: imageName};
    } else {
      throw createError(500, "플레이리스트 생성에 실패하였습니다.");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { playListCreate };
