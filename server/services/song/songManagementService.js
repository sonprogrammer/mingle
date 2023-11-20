const Song = require("../../db/models/songModel");
const User = require("../../db/models/userModel");
const path = require("path");
const createError = require("http-errors");
const mongoose = require("mongoose");

async function uploadSong({ userId, songInfo, audio, songImage }) {
  // 클라이언트로부터 body로 받아야 할 곡의 정보 (음원, 이미지 제외)
  const { songName, songDescription, songDuration, songCategory, songMood } =
    songInfo;

  // 곡을 업로드하는 유저 object id는 song의 songUploader에 저장
  const createSong = await Song.create({
    songName,
    songDescription,
    songUploader: userId,
    songDuration,
    songCategory,
    songMood,
    songImageName: songImage[0].filename,
    songImageLocation: path.join(
      __dirname,
      `../../upload/songImg/${songImage[0].filename}`
    ),
    audioName: audio[0].filename,
    audioLocation: path.join(
      __dirname,
      `../../upload/audio/${audio[0].filename}`
    ),
  });

  return createSong.populate("songUploader");
}

// songId로 해당하는 곡 찾기
async function getSongInfo(songId) {
  const findSong = await Song.findById(songId)
    .populate("songUploader")
    .populate("songLiked");

  if (!findSong) {
    throw createError(404, "해당 곡은 존재하지 않습니다.");
  }

  return findSong;
}

// songId에 해당하는 곡 수정하기
async function modifySongInfo({ userId, songId, songInfo, audio, songImage }) {
  const findSong = await Song.findById(songId);

  if (!findSong) {
    throw createError(404, "해당 곡은 존재하지 않습니다.");
  }

  if (findSong.songUploader.toString() !== userId) {
    throw createError(403, "회원님이 업로드하지 않은 곡은 수정이 불가합니다.");
  }

  const { songName, songDescription, songDuration, songCategory, songMood } =
    songInfo;

  const modifySong = await Song.findByIdAndUpdate(
    songId,
    {
      songName,
      songDescription,
      songDuration,
      songCategory,
      songMood,
      songImageName: songImage[0].filename,
      songImageLocation: path.join(
        __dirname,
        `../../upload/songImg/${songImage[0].filename}`
      ),
      audioName: audio[0].filename,
      audioLocation: path.join(
        __dirname,
        `../../upload/audio/${audio[0].filename}`
      ),
    },
    // 업데이트된 문서를 반환하는 옵션
    { new: true }
  );

  return modifySong.populate("songUploader");
}

// 곡을 DB에서 삭제
async function deleteSong(songId, userId) {
  const findSong = await Song.findById(songId);
  if (!findSong) {
    throw createError(404, "해당 곡은 존재하지 않습니다.");
  }

  if (findSong.songUploader.toString() !== userId) {
    throw createError(403, "회원님이 업로드하지 않은 곡은 수정이 불가합니다.");
  }

  const deleteSong = await Song.findByIdAndDelete(songId);
  return deleteSong;
}

// 곡 좋아요 누르기 DB에 반영
async function toggleLike(songId, userId) {
  let session;
  try {
    // 트랜잭션 시작
    session = await mongoose.startSession();
    session.startTransaction();

    const findSong = await Song.findById(songId).populate("songUploader");

    if (!findSong) {
      throw createError(404, "해당 곡은 존재하지 않습니다.");
    }

    const findUser = await User.findById(userId);

    let likeUpdatedSong = null;
    let message = "";

    if (!findSong.songLiked.includes(userId)) {
      findSong.songLiked.push(userId);
      findSong.songLikedCount += 1;
      likeUpdatedSong = await findSong.save({ session });
      findUser.likeSong.push(songId);
      await findUser.save({ session });
      message = "곡 좋아요에 성공하였습니다.";
    } else {
      findSong.songLiked.splice(findSong.songLiked.indexOf(userId), 1);
      findSong.songLikedCount -= 1;
      likeUpdatedSong = await findSong.save({ session });
      findUser.likeSong.splice(findUser.likeSong.indexOf(songId), 1);
      await findUser.save({ session });
      message = "곡 좋아요 취소에 성공하였습니다.";
    }

    // 트랜잭션 커밋
    await session.commitTransaction();
    session.endSession();

    return { likeUpdatedSong, message };
  } catch (error) {
    // 에러 발생시 롤백
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    throw error;
  }
}

module.exports = {
  uploadSong,
  getSongInfo,
  modifySongInfo,
  deleteSong,
  toggleLike,
};
