const playListSchema = require("../../db/models/playListModel");

/**
 * 플레이리스트 정보를 수정하는 함수
 * @param {string} playlistId - 수정할 플레이리스트의 ID (objectId)
 * @param {string} newTitle - 새로운 플레이리스트 제목
 * @returns {Array} - [수정 여부(boolean), 메시지 객체(object)]
 */
async function playListUpdate(playlistId, jsonValue) {
  try {
    // 주어진 ID에 해당하는 정보를 수정한다
    const data = await playListSchema.findOneAndUpdate(
        { _id: playlistId },
        jsonValue
    );

    // 수정된 데이터가 없는 경우 false 반환
    if (!data) {
      return [false, { message: "플레이리스트 정보가 없습니다." }];
    } else {
      // 수정이 성공적으로 이루어진 경우 true 반환
      return [true, { message: "수정이 정상적으로 이루어졌습니다." }];
    }
  } catch (error) {
    // 에러가 발생한 경우 false 반환
    console.log(error);
    return [false, { message: "수정에 실패했습니다." }];
  }
}

module.exports = { playListUpdate };
