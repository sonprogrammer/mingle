const playLIstSchema = require("../../db/models/playListModel");
const playListLikeSchema = require("../../db/models/playListLike");
const createError = require("http-errors");

async function playListGetOne(userId, playListId) {
	try {
		const playList = await playLIstSchema.findById(playListId);
		if (!playList) {
			throw createError(404, "플레이리스트를 찾을 수 없습니다.");
		}
		const like = await playListLikeSchema.findOne({
			playListId: playListId,
			userId: userId,
		});
		if (!like) {
			return {...playList._doc, like: false};
		} else {
			return { ...playList._doc, like: true };
		}
	} catch (error) {
		throw error;
	}
}

async function playListGetAll(userId) {
    try {
        const playList = await playLIstSchema.find();
        if (!playList) {
            throw createError(404, "플레이리스트를 찾을 수 없습니다.");
        }
        const like = await playListLikeSchema.find({
            userId: userId,
        });
        if (!like) {
            return { ...playList._doc, like: false };
        } else {
            return { ...playList._doc, like: true };
        }
    } catch (error) {
        throw error;
    }
}


module.exports = { playListGetOne ,playListGetAll};
