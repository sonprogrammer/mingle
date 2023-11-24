const playListSchema = require("../../db/models/playListModel");

/**
 * 플레이리스트에서 음악을 삭제하는 함수
 * @param {string} playListid - 플레이리스트의 ObjectId
 * @param {string} songId - 삭제할 음악의 ObjectId
 * @returns {Array} - [성공 여부(boolean), 메시지 객체(object)]
 */
async function playListDeleteSong(playListid, songId) {
  try {
    const playlist = await playListSchema.findById(playListid);
    const index = playlist.playListSongs.indexOf(songId);
    if (index > -1) {
      playlist.playListSongs.splice(index, 1);
      await playlist.save();
      return [true, { message: "플레이리스트에서 곡이 삭제되었습니다" }];
    } else {
      return [false, { message: "플레이리스트에 해당 곡이 존재하지 않습니다." }];
    }
  } catch (error) {
    console.log(error);
    return [false, { message: "플레이리스트에서 곡 삭제에 실패했습니다." }];
  }
}

module.exports = { playListDeleteSong };
