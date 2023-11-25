const User = require("../../../db/models/userModel");
const createError = require("http-errors");
/**
 * 유저가 팔로우한 유저를 조회하는 함수
 * @param {string} user - 팔로우를 하는 유저의 ID
 * @returns {Promise<void>}
 */
async function viewFollow(user) {
	try {
		const searchUser = await User.findById(user);
	if(!searchUser) {
		throw createError(400, {message: "유저를 찾을 수 없습니다."});
	}
	const data = await User.find({_id: searchUser.userFollow}).lean();
		return data;
	} catch (error) {
		throw error;
	}
}

/**
 * 유저의 팔로워를 조회하는 함수
 * @param {string} user 
 * @returns {Promise<void>}
 */
async function viewFollower(user){
	try {
		const searchUser = await User.findById(user);
		if(!searchUser) {
			throw createError(400, "유저를 찾을 수 없습니다.");
		}	
		const data = await User.find({_id: searchUser.userFollower}).lean();
		if(Object.keys(data).length === 0) {
			throw createError(400,  "팔로워를 찾을 수 없습니다.");
		}
		return data;
	} catch (error) {
		throw error;	
	}

}

module.exports = { viewFollow,viewFollower };
