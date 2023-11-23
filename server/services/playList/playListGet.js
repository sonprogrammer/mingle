const playListSchema = require("../../db/models/playListModel");
const playListLikeSchema = require("../../db/models/playListLike");
const userSchema = require("../../db/models/userModel");
const createError = require("http-errors");
const playListLike = require("../../db/models/playListLike");

async function playListGetOne(userId, playListId) {
	try {
		const playList = await playListSchema.findById(playListId);
		if (!playList) {
			throw createError(404, "플레이리스트를 찾을 수 없습니다.");
		}
		const like = await playListLikeSchema.findOne({
			playListId: playListId,
			userId: userId,
		});
		const likeCount = await playListLikeSchema.countDocuments({
			playListId: playListId,
		});
		if (!like) {
			return { ...playList._doc, like: false, likeCount };
		} else {
			return { ...playList._doc, like: true, likeCount };
		}
	} catch (error) {
		throw error;
	}
}

async function playListGetAll(userId) {
	try {
		const playLists = await playListSchema.find({ playListOwner: userId });

		if (playLists.length > 0) {
			const like = await playListLikeSchema.find({ userId: userId });

			const playListsInfo = await Promise.all(
				playLists.map(async (playlist) => {
					const liked = like.some(
						(likeItem) =>
							likeItem.playListId.toString() === playlist._id.toString()
					);

					const likeCount = await playListLikeSchema.countDocuments({
						playListId: playlist._id.toString(),
					});

					return { ...playlist._doc, like: liked, likeCount };
				})
			);
			return playListsInfo;
		} else {
			throw createError(404, "플레이리스트를 찾을 수 없습니다.");
		}
	} catch (error) {
		throw error;
	}
}
async function recommendPlayList(userId) {
	try {
		const userPreference = await userSchema.findById(userId);

		if (userPreference.userPreference.length === 0) {
			const randomPlayLists = await playListSchema.aggregate([
				{ $sample: { size: 8 } },
			]);
			return ["random", randomPlayLists];
		} else if (userPreference.userPreference.length === 1) {
			const genrePlayLists = await playListSchema.aggregate([
				{ $match: { genre: userPreference.userPreference[0] } },
				{ $sample: { size: 4 } },
			]);
			const randomPlayLists = await playListSchema.aggregate([
				{ $sample: { size: 4 } },
			]);
			return [
				[userPreference.userPreference[0], ...genrePlayLists],
				["random", ...randomPlayLists],
			];
		} else {
			const selectedSongs = [];
			for (const genre of userPreference.userPreference.slice(0, 5)) {
				const genrePlayLists = await playListSchema.aggregate([
					{ $match: { genre } },
					{ $sample: { size: 4 } },
				]);
				selectedSongs.push(...genrePlayLists);
			}
			return selectedSongs;
		}
	} catch (error) {
		throw error;
	}
}

module.exports = { playListGetOne, playListGetAll, recommendPlayList };

