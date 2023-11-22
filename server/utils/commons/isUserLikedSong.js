const SongLiked = require("../../db/models/songLikedModel");

async function verifyInSongLiked(userId, filteredSongs) {
  const songs = await Promise.all(
    filteredSongs.map(async (song) => {
      const songInfo = song.songId;
      const isUserLiked = await SongLiked.findOne({
        userId: userId,
        songId: songInfo._id,
      });
      return { song: songInfo, isCurrentUserLiked: Boolean(isUserLiked) };
    })
  );

  return songs;
}

async function verifyInSong(userId, filteredSongs) {
  const songs = await Promise.all(
    filteredSongs.map(async (song) => {
      const isUserLiked = await SongLiked.findOne({
        userId: userId,
        songId: song._id,
      });
      return { song, isCurrentUserLiked: Boolean(isUserLiked) };
    })
  );

  return songs;
}

module.exports = { verifyInSongLiked, verifyInSong };
