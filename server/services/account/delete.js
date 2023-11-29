const userSchema = require("../../db/models/userModel");
const songLiked = require("../../db/models/songLikedModel");
const playListLiked = require("../../db/models/playListLike");
const mongoose = require("mongoose");

/**
 * 유저 정보를 DB에서 삭제하는 함수
 * @param {string} id - 삭제할 유저의 ID (objectId)
 * @returns {Array} - [삭제 여부(boolean), 메시지 객체(object)]
 */
async function UserDelete(userEmail, userId) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // 주어진 ID에 해당하는 유저 정보를 삭제한다 + playList와 song Like 스키마에서도 해당 유저의 id가 있는 document 삭제하기
    await songLiked.deleteMany({ userId }, { session });
    await playListLiked.deleteMany({ userId }, { session });
    const data = await userSchema.findOneAndDelete({ userEmail });
    await session.commitTransaction();
    // 삭제된 데이터가 없는 경우 false 반환
    if (data === null) {
      return { message: "회원 정보가 없습니다." };
    } else {
      // 삭제가 성공적으로 이루어진 경우 true 반환
      return { message: "삭제가 정상적으로 이루어졌습니다." };
    }
  } catch (error) {
    // 에러가 발생한 경우 false 반환
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

module.exports = { UserDelete };
