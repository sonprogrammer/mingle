const playListSchema = require("../../db/models/playListModel");
const playListLikeSchema = require("../../db/models/playListLike");
const createError = require("http-errors");

async function playListDelete(userId, playListId) {
	try {
		const playlist = await playListSchema.findById(playListId);
		if (userId !== playlist.playListOwner.toString()) {
			throw createError(403, "자신의 플레이리스트가 아닙니다.");
		}
		const data = await playListSchema.findOneAndDelete({ _id: playListId });
		if (data === null) {
			throw createError(404, "플레이리스트를 찾을 수 없습니다.");
		}
		const like = await playListLikeSchema.deleteMany({
			playListId: playListId,
		});
		return { message: "플레이리스트가 삭제되었습니다.",like };
	} catch (error) {
		throw error;
	}
}

module.exports = { playListDelete };
