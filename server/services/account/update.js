const userSchema = require("../../db/models/userModel");
const HmacConvert = require("../../utils/commons/passwordConvert");
const fs = require("fs");
const path = require("path");
/**
 * 유저 데이터를 수정하는 함수.
 * @param {string} userId - 수정할 유저의 아이디.
 * @param {object} jsonValue - 수정할 유저의 JSON 데이터.
 * @returns {Array} - [수정 여부(boolean), 메시지 객체(object)]
 */
// 업데이트 하면 안되는 필드는 여기에 배열로 입력
const noUpdateKey = ["userEmail"];
async function userEdit(userEmail, jsonValue) {
	try {
		// 업데이트 하면 안되는 필드를 제거
		noUpdateKey.map((data) => {
			if (jsonValue.hasOwnProperty(data)) {
				delete jsonValue[data];
			}
		});
		const decodedImage = Buffer.from(jsonValue.userImage, "base64");
		const imagePath = path.join(
			__dirname,
			`../../upload/profile/${userEmail}.png`
		);
		fs.writeFileSync(imagePath, decodedImage);

		jsonValue.userImage = imagePath;
		// 비밀번호를 Hmac SHA256 방식으로 암호화한다
		jsonValue.userPassword = HmacConvert(jsonValue.userPassword);

		// 유저 데이터를 업데이트하고 수정된 항목 수를 가져온다
		const data = await userSchema.updateOne({ userEmail }, jsonValue);

		// 수정된 항목이 1개인 경우 수정 성공으로 간주하고 true 반환
		if (data.modifiedCount === 1) {
			return [true, { message: "수정이 정상적으로 이루어졌습니다." }];
		} else {
			// 수정된 항목이 없는 경우 수정 실패로 간주하고 false 반환
			return [false, { message: "수정항목이 없습니다." }];
		}
	} catch (error) {
		// 에러가 발생한 경우 false 반환
		console.log(error);
		if (error.code == 11000) {
			return [false, { message: "이미 가입된 Email 입니다." }];
		} else {
			return [false, { message: "알 수 없는 오류 입니다.(b)" }];
		}
	}
}

module.exports = { userEdit };
