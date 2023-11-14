const userSchema = require("../../db/models/userModel");
const HmacConvert = require("../../utils/commons/passwordConvert");

/**
 * 유저 생성 함수
 * @param {object} jsonValue - 생성할 유저의 JSON 데이터
 * @returns {Array} - [성공 여부(boolean), 메시지 객체(object)]
 */
async function userCreate(jsonValue) {
  try {
    // 패스워드를 Hmac SHA256 방식으로 암호화한다
    jsonValue.userPassword = HmacConvert(jsonValue.userPassword);

    // 유저 데이터를 생성하여 저장한다
    const data = await userSchema(jsonValue).save();
    return [true, { message: "가입이 정상적으로 이루어졌습니다." }];
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return [false, { message: "E-mail이 중복되었습니다." }];
    }
  }
}

module.exports = { userCreate };
