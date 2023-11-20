const userSchema = require("../../db/models/userModel");
const createError = require("http-errors");

/**
 * 유저 정보를 조회하는 함수
 * @param {string} keyType - 조회할 유저 정보의 키 타입 (예: "email")
 * @param {string} keyValue - 조회할 유저 정보의 키 값
 */
async function UserSearch(keyType, keyValue) {
  const filter = {};
  filter[keyType] = keyValue;
  const userData = {};
  // 데이터베이스에서 유저 정보를 조회하고 JSON 형태로 반환
  const data = await userSchema.find(filter).lean();
  data.map(({ ...data }) => {
    userData.userId = data._id;
    userData.userEmail = data.userEmail;
    userData.userName = data.userNickname;
    userData.userDescription = data.userDescription;
    userData.userPreference = data.userPreference;
    userData.userImage = data.userImage;
    userData.userLikePlayList = data.likePlayList;
  });
  return userData;
}

// 사용자가 입력한 이메일이 DB에 존재하는지 ture/false로 반환
async function EmailExist(inputEmail) {
  const findEmail = await userSchema.findOne({ userEmail: inputEmail });
  if (findEmail) throw createError(400, "이미 존재하는 사용자입니다.");
}

// 사용자가 입력한 닉네임, 이메일이 모두 DB에 존재하는지 true/false로 반환
async function UserExist(inputNickname, inputEmail) {
  const findUser = await userSchema.findOne({
    userNickname: inputNickname,
    userEmail: inputEmail,
  });
  if (!findUser) throw createError(404, "사용자를 찾을 수 없습니다.");
}

module.exports = { UserSearch, EmailExist, UserExist };
