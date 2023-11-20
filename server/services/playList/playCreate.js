const playListSchema = require("../../db/models/playListModel");
const fs = require("fs"); 
const path = require("path");

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
    if (jsonValue.playListImg) {
      const decodedImage = Buffer.from(jsonValue.playListImg, 'base64');
      const imagePath = path.join(__dirname, `../../upload/playListCover/${jsonValue.playListTitle}.png`);
      fs.writeFileSync(imagePath, decodedImage);
      jsonValue.userImage = imagePath;
    }
    // 플레이리스트 데이터를 생성하여 저장한다
    const data = await playListSchema(jsonValue).save();

    return [true, { message: "플레이리스트가 생성되었습니다", playlistId: data._id.toString() }];
  } catch (error) {
    console.log(error);
    return [false, { message: "플레이리스트 생성에 실패했습니다." }];
  }
}

module.exports = { playListCreate };
