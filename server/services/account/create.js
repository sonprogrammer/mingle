const userSchema = require("../../db/models/userModel");
const HmacConvert = require("../../utils/commons/passwordConvert");
const createError = require("http-errors");
const fs = require("fs");
const path = require("path");

/**
 * 유저 생성 함수
 * @param {object} jsonValue - 생성할 유저의 JSON 데이터
 * @returns {Array} - [성공 여부(boolean), 메시지 객체(object)]
 */
async function userCreate(jsonValue) {
  try {
    // 패스워드를 Hmac SHA256 방식으로 암호화한다
    jsonValue.userPassword = HmacConvert(jsonValue.userPassword);


//이미지가 있으면 디코딩해서 파일로 저장
    if (jsonValue.userImage) {
      const decodedImage = Buffer.from(jsonValue.userImage, 'base64');
      const timestamp = new Date().getTime();
      const imageName = `${timestamp}.png`;
      const imagePath = path.join(__dirname, `../../upload/profile/${imageName}`);
      fs.writeFileSync(imagePath, decodedImage);
      jsonValue.userImage = imagePath;
      jsonValue.userFile = imageName;
    }

    await userSchema(jsonValue).save();
    return {message: "회원가입이 완료되었습니다."}
  } catch (error) {
    throw createError(409, "이미 존재하는 이메일입니다.");
  }
}

module.exports = { userCreate };
