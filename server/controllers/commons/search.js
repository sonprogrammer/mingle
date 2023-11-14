const userSchema = require('../../db/schemas/userSchema');


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
    userData.id = data._id.toString();
    userData.email = data.email;
    userData.name = data.name;
    userData.id = data.id;
  });
  return userData;
}

module.exports = { UserSearch };