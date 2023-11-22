const playListSchema = require("../../db/models/playListModel");
const createError = require("http-errors");
/**
 * 플레이리스트를 음악을 추가하는 함수
 * @param {string} playListid - 생성한 플레이리스트의 ObjectId
 * @param {string} songId - 추가할 음악의 ObjectId
 * @returns {Array} - [성공 여부(boolean), 메시지 객체(object)]
 */
async function playListAddSong(playListid, songId, userId) {
  try {
    const playlist = await playListSchema.findById(playListid);
    if (userId !== playlist.playListOwner.toString()) {
      throw createError(403, "자신의 플레이리스트가 아닙니다.");
    }
    if (!playlist) {
      throw createError(404, "플레이리스트를 찾을 수 없습니다.");
    }
    if (playlist.playListSongs.includes(songId)) {
      throw createError(409, "이미 추가된 곡입니다.");
    }
    playlist.playListSongs.push(songId);
    await playlist.save();
    return {
      message: "플레이리스트에 곡 추가가 되었습니다",
      playlistId: playlist._id.toString(),
    };
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = { playListAddSong };
