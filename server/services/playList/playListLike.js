const playListSchema = require("../../db/models/playListModel");
const userSchema = require("../../db/models/userModel");
const mongoose = require("mongoose");	
/**
 * 플레이리스트 좋아요 추가/삭제 함수
 * @param {string} playlistId - 좋아요를 추가/삭제할 플레이리스트의 ObjectId
 * @param {string} userId - 좋아요를 누른/취소한 유저의 ObjectId
 * @returns {Array} - [성공 여부(boolean), 메시지 객체(object)]
 */
async function togglePlayListLike(playlistId, userId) {
	try {
		const playlist = await playListSchema.findById(playlistId);
		if (!playlist) {
			return [false, { message: "플레이리스트를 찾을 수 없습니다." }];
		}

		const index = playlist.playListLiked.indexOf(userId);
		if (index > -1) {
			playlist.playListLiked.splice(index, 1);
		} else {
			playlist.playListLiked.push(userId);
		}

		await playlist.save();

		const user = await userSchema.findById(userId);
		if (!user) {
			return [false, { message: "유저를 찾을 수 없습니다." }];
		}

		if (index > -1) {
			user.likePlayList.splice(user.likePlayList.indexOf(playlistId), 1);
		} else {
			user.likePlayList.push(playlistId);
		}

		await user.save();

		return [true, { message: "좋아요가 업데이트되었습니다" }];
	} catch (error) {
		console.log(error);
		return [false, { message: "좋아요 업데이트에 실패했습니다." }];
	}
}


async function handlePlaylistLike(req, res, next) {
	try {
	  const playlistId = req.params.playlistId;
	  const userId = req.user.userId;
	  const playlistObjectId = new mongoose.Types.ObjectId(playlistId);
	  const [success, result] = await togglePlayListLike(
		playlistObjectId,
		userId
	  );
	  
	  if (success) {
		res.json(result);
	  } else {
		res.status(500).json(result);
	  }
	} catch (error) {
	  console.log(error);
	  next({ code: 500 });
	}
  };

async function searchUserLike(userId){
	try{
		const user = await userSchema.findById(userId);
		if(!user){
			throw createError(404, "유저를 찾을 수 없습니다.");
		}
		const userLikePlayList =  user.likePlayList;
		const playlist = await playListSchema.find({_id:{$in:userLikePlayList}});
		return playlist;
	} catch(error){
		throw error;
	}	
}

module.exports = { togglePlayListLike ,handlePlaylistLike,searchUserLike};
