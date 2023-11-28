const User = require("../../../db/models/userModel");
const createError = require("http-errors");
const mongoose = require("mongoose");

async function userFollow(user, followUser) {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const searchUser = await User.findById(user).session(session);
		const followerUser = await User.findById(followUser).session(session);

		if (!searchUser || !followerUser) {
			throw createError(400, { message: "유저를 찾을 수 없습니다." });
		}

		if (searchUser.userFollow.includes(followUser)) {
			throw createError(400, { message: "이미 팔로우한 유저입니다." });
		}

		searchUser.userFollow.push(followUser);
		await searchUser.save();

		followerUser.userFollower.push(user);
		await followerUser.save();

		await session.commitTransaction();
		session.endSession();
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
}

async function userUnFollow(user, followUser) {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const searchUser = await User.findById(user).session(session);
		const followerUser = await User.findById(followUser).session(session);

		if (!searchUser || !followerUser) {
			throw createError(400, { message: "유저를 찾을 수 없습니다." });
		}

		if (!searchUser.userFollow.includes(followUser)) {
			throw createError(400, { message: "팔로우하지 않은 유저입니다." });
		}

		searchUser.userFollow.pull(followUser);
		await searchUser.save();

		followerUser.userFollower.pull(user);
		await followerUser.save();

		await session.commitTransaction();
		session.endSession();
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
}

module.exports = { userFollow, userUnFollow };
