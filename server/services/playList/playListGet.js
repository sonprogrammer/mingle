const playListSchema = require("../../db/models/playListModel");
const playListLikeSchema = require("../../db/models/playListLike");
const userSchema = require("../../db/models/userModel");
const songSchema = require("../../db/models/songModel");
const createError = require("http-errors");
const playListLike = require("../../db/models/playListLike");

async function playListGetOne(userId, playListId) {
	try {
		const playList = await playListSchema
			.findById(playListId)
			.populate(
				"playListOwner",
				"_id userEmail userNickname userFile userImage userFollow userPreference"
			);
		const songDetails = await Promise.all(
			playList.playListSongs.map(async (songId) => {
				const song = await songSchema.findById(songId);
				return song;
			})
		);
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
			return { ...playList._doc, like: false, likeCount, songDetails };
		} else {
			return { ...playList._doc, like: true, likeCount, songDetails };
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
				selectedSongs.push([genre, ...genrePlayLists]);
			}
			return selectedSongs; // 문자열과 배열을 반환
		}
	} catch (error) {
		throw error;
	}
}

async function userFollowPlayList(userId) {
	try {
		// 1. userId로 유저를 찾아서 유저가 팔로잉하고 있는 사람들 가져오기
		const following = await userSchema
			.findById(userId)
			.select("userFollow")
			.populate("userFollow");
		const playlists = [];

		// 2. 그 유저들이 올린 플레이리스트들을 최근순으로 찾아 3개씩만 반환
		await Promise.all(
			following.userFollow.map(async (user) => {
				const userPlaylists = await playListSchema
					.find({ playListOwner: user._id })
					.populate("playListOwner")
					.sort({ createdAt: -1 });

				const likeInfo = await Promise.all(
					userPlaylists.map(async (playlist) => {
						const like = await playListLikeSchema.findOne({
							playListId: playlist._id,
							userId: userId,
						});
						const likeCount = await playListLikeSchema.countDocuments({
							playListId: playlist._id,
						});

						return { ...playlist._doc, like: !!like, likeCount };
					})
				);

				playlists.push(...likeInfo);
			})
		);

		return { feedPlaylists: playlists };
	} catch (error) {
		throw error;
	}
}

module.exports = {
	playListGetOne,
	playListGetAll,
	recommendPlayList,
	userFollowPlayList,
};
