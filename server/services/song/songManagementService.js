const Song = require("../../db/models/songModel");
const SongLiked = require("../../db/models/songLikedModel");
const createError = require("http-errors");
const isUserLikedSong = require("../../utils/commons/isUserLikedSong");
const songWrite = require("../../utils/commons/songWriteFile");
const mongoose = require("mongoose");

async function uploadSong({ userId, songInfo, audio, songImage }) {
  // 클라이언트로부터 body로 받아야 할 곡의 정보 (음원, 이미지 제외)
  const { songName, songArtist, songDescription, songDuration, songCategory } =
    songInfo;

  await songWrite.songWriteFile(audio, songImage);

  // 곡을 업로드하는 유저 object id는 song의 songUploader에 저장
  const createSong = await Song.create({
    songName,
    songDescription,
    songArtist,
    songUploader: userId,
    songDuration,
    songCategory,
    songImageLocation: `${songImage[0].filename}`,
    audioLocation: `${audio[0].filename}`,
  });

  const createdSong = await createSong.populate("songUploader");
  return isUserLikedSong.verifyInSong(userId, [createdSong]);
}

// songId로 해당하는 곡 찾기
async function getSongInfo(userId, songId) {
  const findSong = await Song.findById(songId).populate("songUploader");

  if (!findSong) {
    throw createError(404, "해당 곡은 존재하지 않습니다.");
  }

  return isUserLikedSong.verifyInSong(userId, [findSong]);
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

  const { songName, songArtist, songDescription, songDuration, songCategory } =
    songInfo;

  console.log(songArtist);

  await songWrite.songWriteFile(audio, songImage);

  const modifySong = await Song.findByIdAndUpdate(
    songId,
    {
      songName,
      songArtist,
      songDescription,
      songDuration,
      songCategory,
      songImageLocation: `${songImage[0].filename}`,
      audioLocation: `${audio[0].filename}`,
    },
    // 업데이트된 문서를 반환하는 옵션
    { new: true }
  );

  const modifiedSong = await modifySong.populate("songUploader");
  return isUserLikedSong.verifyInSong(userId, [modifiedSong]);
}

// 곡을 DB에서 삭제
async function deleteSong(songId, userId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const findSong = await Song.findById(songId);
    if (!findSong) {
      throw createError(404, "해당 곡은 존재하지 않습니다.");
    }

    if (findSong.songUploader.toString() !== userId) {
      throw createError(
        403,
        "회원님이 업로드하지 않은 곡은 수정이 불가합니다."
      );
    }

    await SongLiked.deleteMany({ songId }, { session });
    const deleteSong = await Song.findByIdAndDelete(songId, { session });
    await session.commitTransaction();
    return deleteSong;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

// 곡 좋아요 누르기
async function pushLike(songId, userId) {
  const findSong = await Song.findById(songId);
  if (!findSong) throw createError("해당 곡은 존재하지 않습니다.");
  const findIsSongLiked = await SongLiked.findOne({ songId, userId });
  if (findIsSongLiked) throw createError(404, "이미 좋아요된 곡입니다.");
  await SongLiked.create({ songId, userId });
}

// 곡 좋아요 취소하기
async function cancelLike(songId, userId) {
  const findSong = await Song.findById(songId);
  if (!findSong) throw createError("해당 곡은 존재하지 않습니다.");
  const cancelLike = await SongLiked.findOneAndDelete({ songId, userId });
  if (!cancelLike) throw createError(404, "이미 좋아요 취소된 곡입니다.");
}

module.exports = {
  uploadSong,
  getSongInfo,
  modifySongInfo,
  deleteSong,
  pushLike,
  cancelLike,
};
