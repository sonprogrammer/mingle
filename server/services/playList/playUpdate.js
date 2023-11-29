const playListSchema = require("../../db/models/playListModel");
const createError = require("http-errors");
const fs = require("fs");
const path = require("path");

/**
 * 플레이리스트 정보를 수정하는 함수
 * @param {string} playlistId - 수정할 플레이리스트의 ID (objectId)
 * @param {string} jsonValue - 수정할 플레이리스트의 JSON 데이터
 * @returns {Object} - { 수정된 데이터, 메시지 객체, 수정된 플레이리스트 이미지 파일명 }
 */
async function playListUpdate(playlistId, jsonValue) {
	try {
		// 주어진 ID에 해당하는 정보를 수정한다
		const playListData = await playListSchema.findById(playlistId);
		if (!playListData) {
			throw createError(400, "수정할 데이터가 없습니다.");
		}
		if(jsonValue.playListName) {
			playListData.playListName = jsonValue.playListName;
		}
		if (jsonValue.playListImg) {
			const timestamp = new Date().getTime();
			const imageName = `${timestamp}.png`;
			const decodedImage = Buffer.from(jsonValue.playListImg, "base64");
			const imagePath = path.join(
				__dirname,
				`../../upload/playListCover/${imageName}`
			);
			fs.writeFileSync(imagePath, decodedImage);
			jsonValue.playListImg = imagePath; // 수정된 이미지 경로를 JSON 데이터에 저장
			jsonValue.playListImg = imageName;
		}

		// 플레이리스트 수정
		const data = await playListSchema.findOneAndUpdate(
			{ _id: playlistId },
			jsonValue,
			{ new: true } // 업데이트 후의 데이터를 반환하도록 설정
		);

		if (!data) {
			throw createError(400, "수정할 데이터가 없습니다.")
		} else {
			return {
				data: data,
				message: "수정이 정상적으로 이루어졌습니다.",
        playListId: data._id,
				playListImg: jsonValue.playListImg.slice(-17),
			};
		}
	} catch (error) {
		throw error;
	}
}

module.exports = { playListUpdate };
