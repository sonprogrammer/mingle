const createError = require("http-errors");
const userSchema = require("../../db/models/userModel");
const HmacConvert = require("../../utils/commons/passwordConvert");
const fs = require("fs");
const path = require("path");
const { findById } = require("../../db/models/playListModel");
/**
 * 유저 데이터를 수정하는 함수.
 * @param {string} userId - 수정할 유저의 아이디.
 * @param {object} jsonValue - 수정할 유저의 JSON 데이터.
 */
// 업데이트 하면 안되는 필드는 여기에 배열로 입력
const noUpdateKey = ["userEmail"];

async function userEdit(userId, jsonValue) {
	try {
		// 업데이트 하면 안되는 필드를 제거
		noUpdateKey.map((data) => {
			if (jsonValue.hasOwnProperty(data)) {
				delete jsonValue[data];
			}
		});

		if (jsonValue.userImage) {
			// 기존 이미지가 있으면 삭제
			const timestamp = new Date().getTime();
			const imageName = `${timestamp}.png`;
			const decodedImage = Buffer.from(jsonValue.userImage, "base64");
			const imagePath = path.join(
				__dirname,
				`../../upload/profile/${imageName}`
			);
			fs.writeFileSync(imagePath, decodedImage);

			// Update userFile field using Mongoose updateOne method
			await userSchema.updateOne(
				{ _id: userId },
				{ $set: { userFile: imageName } }
			);

			jsonValue.userImage = imagePath;
		}

		// 비밀번호를 Hmac SHA256 방식으로 암호화한다
		if (jsonValue.userPassword) {
			jsonValue.userPassword = HmacConvert(jsonValue.userPassword);
		}

		// 유저 데이터를 업데이트하고 수정된 항목 수를 가져온다
		const data = await userSchema.updateOne({ _id: userId }, jsonValue);
		// 수정된 항목이 1개인 경우 수정 성공으로 간주하고 true 반환
		if (data.modifiedCount !== 0) {
			const userData = await userSchema
				.findById(userId)
				.select("-userPassword")
				.lean();
			return { message: "수정이 정상적으로 이루어졌습니다.", userData };
		} else {
			// 수정된 항목이 없는 경우 수정 실패로 간주하고 false 반환
			throw createError(400, "수정할 데이터가 없습니다.");
		}
	} catch (error) {
		if (error.code == 11000) {
			throw createError(409, "이미 존재하는 이메일입니다.");
		} else {
			console.log(error);
			throw createError(400, "수정에 실패했습니다.");
		}
	}
}

async function userDescriptionEdit(userId, userDescription) {
	const user = await userSchema.findByIdAndUpdate(
		userId,
		{ userDescription },
		{ new: true }
	);
	return user;
}

module.exports = { userEdit, userDescriptionEdit };
