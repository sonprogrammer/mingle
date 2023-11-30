const createError = require("http-errors");
const userSchema = require("../../db/models/userModel");

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

const getInfo = async ( userId) => {
	try {
		const user = await userSchema.findById(userId).select("-userPassword");
		if (!user) {
			throw createError(404, "사용자를 찾을 수 없습니다.");
		}
		return {
			message: "사용자 정보 조회 성공",
			user,
		};
	} catch (error) {
		throw error;
	}
};

module.exports = {accountGet, getInfo};
