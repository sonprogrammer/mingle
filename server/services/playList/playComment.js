const PlayList = require("../../db/models/playListModel");
const createError = require("http-errors");

/**
 * playlist comment 생성
 * @param {string} userId - user의 ObjectId
 * @param {string} playlistId - playlist의 ObjectId
 * @param {object} comment - 생성할 playlist comment의 JSON 데이터
 */
async function playCommentCreate(userId, playlistId, comment) {
	try {
		const playlist = await PlayList.findById(playlistId);
		if (!playlist) {
			throw createError(404, "플레이리스트를 찾을 수 없습니다.");
		}
		const newComment = {
			author: userId,
			comment: comment.comment,
		};
		playlist.playListComments.push(newComment);
		await playlist.save();
		return comment;
	} catch (error) {
		throw error;
	}
}

/**
 * playlist comment 조회
 * @param {string} playlistId - playlist의 ObjectId
 * @returns {Object} - playlist comment의 JSON 데이터
 */
async function playCommentRead(playlistId) {
	try {
		const playlist = await PlayList.findById(playlistId).populate(
			"playListComments.author",
			"username userNickname"
		);
		if (!playlist) {
			throw createError(404, "플레이리스트를 찾을 수 없습니다.");
		}
		playlist.playListComments;
		return playlist.playListComments;
	} catch (error) {
		throw error;
	}
}

/*
 * playlist comment 수정
 * @param {string} userId - user의 ObjectId
 * @param {string} playlistId - playlist의 ObjectId
 * @param {object} comment - 수정할 playlist comment의 JSON 데이터
 */
async function playCommentUpdate(userId, commentId, comment) {
	try {
		const playlist = await PlayList.findOne({
			"playListComments._id": commentId,
		});
		if (!playlist) {
			throw createError(404, "플레이리스트를 찾을 수 없습니다.");
		}

		const targetComment = playlist.playListComments.id(commentId);
		if (!targetComment) {
			throw createError(404, "댓글을 찾을 수 없습니다.");
		}
		console.log(targetComment.author.toString());
		if (targetComment.author.toString() !== userId) {
			throw createError(403, "댓글을 수정할 권한이 없습니다.");
		}

		targetComment.comment = comment.comment;
		await playlist.save();
		return targetComment;
	} catch (error) {
		throw error;
	}
}
/*
 * playlist comment 삭제
 * @param {string} userId - user의 ObjectId
 * @param {string} commentId - 삭제할 playlist comment의 ObjectId
 */
async function playCommentDelete(userId, playlistId, commentId) {
    try {
        const playlist = await PlayList.findById(playlistId);
        if (!playlist) {
            throw createError(404, "플레이리스트를 찾을 수 없습니다.");
        }
        playlist.playListComments = playlist.playListComments.filter(comment => comment._id.toString() !== commentId);

        await playlist.save();
        return { message: "댓글이 성공적으로 삭제되었습니다." };
    } catch (error) {
        throw error;
    }
}


module.exports = { playCommentCreate, playCommentRead, playCommentUpdate,playCommentDelete };
