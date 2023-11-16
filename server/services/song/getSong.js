const Song = require("../../db/models/songModel");

async function getSongInfo(songId) {
  const findSong = await Song.findById(songId).populate("songUploader");

  // 노래를 찾지 못하면 null 반환
  return findSong;
}

module.exports = { getSongInfo };
