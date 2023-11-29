const playListSchema = require("../../db/models/playListModel");
const createError = require("http-errors");
/**
 * 플레이리스트를 음악을 추가하는 함수
 * @param {string} playListid - 생성한 플레이리스트의 ObjectId
 * @param {string} songId - 추가할 음악의 ObjectId
 */
async function playListAddSong(playListid, songIds, userId) {
	try {
		if(!songIds){
			throw createError(400, "추가할 곡이 없습니다.");
		}
		const playlist = await playListSchema.findById(playListid);
		if (userId !== playlist.playListOwner.toString()) {
			throw createError(403, "자신의 플레이리스트가 아닙니다.");
		}
		if (!playlist) {
			throw createError(404, "플레이리스트를 찾을 수 없습니다.");
		}
		const alreadyAddedSongs = playlist.playListSongs.filter((song) =>
			songIds.includes(song)
		);
		if (alreadyAddedSongs.length > 0) {
			throw createError(409, "이미 추가된 곡들이 포함되어 있습니다.");
		}

		playlist.playListSongs = [...playlist.playListSongs, ...songIds];
		await playlist.save();
    return {
      message: "플레이리스트에 곡들이 추가되었습니다",
      playlistId: playlist._id.toString(),
      playListSongs : playlist.playListSongs
    };
	} catch (error) {
		throw error;
	}
}

module.exports = { playListAddSong };
