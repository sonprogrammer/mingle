const playListSchema = require("../../db/models/playListModel");

/**
 * 플레이리스트를 음악을 추가하는 함수
 * @param {string} playListid - 생성한 플레이리스트의 ObjectId
 * @param {string} songId - 추가할 음악의 ObjectId
 * @returns {Array} - [성공 여부(boolean), 메시지 객체(object)]
 */
async function playListDeleteSong(playListid, songId) {
  try {
    const playlist = await playListSchema.findById(playListid);
    const index = playlist.playListSongs.indexOf(songId);
    if (index > -1) {
      return [false, { message: "플레이리스트가 존재하지 않습니다." }];
    }
    await playlist.save();
    return [
      true,
      {
        message: "플레이리스트에 곡 추가가 되었습니다",
        playlistId: playlist._id.toString(),
      },
    ];
  } catch (error) {
    console.log(error);
    return [false, { message: "플레이리스트에 곡 추가를 실패했습니다." }];
  }
}

module.exports = { playListDeleteSong };
