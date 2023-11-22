const User = require("../../../db/models/userModel");
const createError = require("http-errors");
/**
 * 유저 팔로우 기능 함수
 * @param {string} user - 팔로우를 하는 유저의 ID
 * @param {string} followUser - 팔로우 당하는 유저의 ID
 * @returns {Promise<void>}
 */
async function userFollow(user, followUser) {
	try {
		const searchUser = await User.findById(user);

		if (!searchUser) {
			throw createError(400, { message: "유저를 찾을 수 없습니다." });
		}

		if (searchUser.userFollow.includes(followUser)) {
			throw createError(400, { message: "이미 팔로우한 유저입니다." });
		}

		searchUser.userFollow.push(followUser);
		await searchUser.save();

		const followerUser = await User.findById(followUser);

		if (!followerUser) {
			throw createError(400, { message: "유저를 찾을 수 없습니다." });
		}

		followerUser.userFollower.push(user);
		await followerUser.save();
	} catch (error) {
		throw error;
	}
}
/**
 * 유저 언팔 기능 함수
 * @param {string} user - 팔로우를 하는 유저의 ID
 * @param {string} followUser - 팔로우 당하는 유저의 ID}
 */
async function userUnFollow(user, followUser) {
    try{
        const searchUser = await User.findById(user);
        if(!searchUser){
            throw createError(400,{message:"유저를 찾을 수 없습니다."});
        }
        if(!searchUser.userFollow.includes(followUser)){
            throw createError(400,{message:"팔로우하지 않은 유저입니다."});
        }   
        const followerUser = await User.findById(followUser);
        if(!followerUser){
            throw createError(400,{message:"유저를 찾을 수 없습니다."});
        }
        searchUser.userFollow.pull(followUser);
        followerUser.userFollower.pull(user);
        await searchUser.save();
        await followerUser.save();
    }catch(error){
        throw error;        

}
}

module.exports = { userFollow,userUnFollow };
