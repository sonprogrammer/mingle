const playListSchema = require("../../db/models/playListModel");
const userSchema = require("../../db/models/userModel");
const mongoose = require("mongoose");
const createError = require("http-errors");
const playListLIkeSchema = require("../../db/models/playListLike");

// 플레이리스트 좋아요 추가 함수

const addLike = async (playListId, userId) => {
	try {
		const playList = await playListSchema.findById(playListId);
		if (!playList) {
			throw createError(404, "플레이리스트를 찾을 수 없습니다.");
		}
		const user = await userSchema.findById(userId);
		if (!user) {
			throw createError(404, "유저를 찾을 수 없습니다.");
		}
		const like = await playListLIkeSchema.findOne({
			playListId: playListId,
			userId: userId,
		});
		if (like) {
			throw createError(400, "이미 좋아요를 누른 플레이리스트입니다.");
		}
		const newLike = {
			userId: userId,
			playListId: playListId,
		};
		await playListLIkeSchema(newLike).save();
		return newLike;
	} catch (error) {
		throw error;
	}
};

//플레이리스트 좋아요 삭제 함수

const deleteLike = async (playListId, userId) => {
	try {
		const playList = await playListSchema.findById(playListId);
		if (!playList) {
			throw createError(404, "플레이리스트를 찾을 수 없습니다.");
		}
		const user = await userSchema.findById(userId);
		if (!user) {
			throw createError(404, "유저를 찾을 수 없습니다.");
		}
		const like = await playListLIkeSchema.findOne({
			playListId: playListId,
			userId: userId,
		});
		if (!like) {
			throw createError(400, "좋아요를 누르지 않은 플레이리스트입니다.");
		}

		await playListLIkeSchema.deleteOne({
			playListId: playListId,
			userId: userId,
		});
		return { playListId: playListId, userId: userId };
	} catch (error) {
		throw error;
	}
};

//유저가 좋아요를 누른 플레이리스트를 찾는 함수
async function searchUserLike(userId) {
	try {
		const user = await userSchema.findById(userId);
		if (!user) {
			throw createError(404, "유저를 찾을 수 없습니다.");
		}
		const like = await playListLIkeSchema.find({ userId: userId });
		if (!like) {
			throw createError(400, "좋아요를 누른 플레이리스트가 없습니다.");
		}
		const playListId = like.map((like) => like.playListId);
		const playList = await playListSchema.find({
			_id: { $in: playListId },
		});
		return playList;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	searchUserLike,
	addLike,
	deleteLike,
};
