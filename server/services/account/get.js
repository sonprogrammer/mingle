const createError = require("http-errors");
const userSchema = require("../../db/models/userModel");
const playListSchema = require("../../db/models/playListModel");
const playListLikeSchema = require("../../db/models/playListLike");
const accountGet = async (userId) => {
	try {
		const user = await userSchema.findById(userId);
		if (!user) {
			throw createError(404, "사용자를 찾을 수 없습니다.");
		}
		user.userFile = user.userImage.slice(-17);
		user.userPassword = undefined;
		return {
			message: "사용자 정보 조회 성공",
			user,
		};
	} catch (error) {
		throw error;
	}
};

const getInfo = async (userId) => {
	try {
		const user = await userSchema.findById(userId).select("-userPassword");
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

					return {...playlist._doc, like: liked, likeCount };
				})
			);
			return {user:user,playListInfo:playListsInfo};
		}
	} catch (error) {
		throw error;
	}
};

module.exports = { accountGet, getInfo };
