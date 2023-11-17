const Song = require("../../db/models/songModel");
const User = require("../../db/models/userModel");
const mongoose = require("mongoose");

async function uploadSong({ userId, songInfo, audio, songImage }) {
  // 클라이언트로부터 body로 받아야 할 곡의 정보 (음원, 이미지 제외)
  const { songName, songDescription, songDuration, songCategory, songTempo } =
    songInfo;

  // 곡을 업로드하는 유저 object id는 song의 songUploader에 저장
  const createSong = await Song.create({
    songName,
    songDescription,
    songArtist: null,
    songUploader: userId,
    songDuration,
    songCategory,
    songTempo,
    songImageName: songImage[0].filename,
    songImageLocation: songImage[0].path,
    audioName: audio[0].filename,
    audioLocation: audio[0].path,
    songLiked: 0,
  });

  return createSong;
}

// songId로 해당하는 곡 찾기
async function getSongInfo(songId) {
  const findSong = await Song.findById(songId).populate("songUploader");

  return findSong;
}

// songId에 해당하는 곡 수정하기
async function modifySongInfo({ userId, songId, songInfo, audio, songImage }) {
  const findSong = await Song.findById(songId);
  if (findSong.songUploader.toString() !== userId) return "forbidden";

  const { songName, songDescription, songDuration, songCategory, songTempo } =
    songInfo;

  const modifySong = await Song.findByIdAndUpdate(
    songId,
    {
      songName,
      songDescription,
      songDuration,
      songCategory,
      songTempo,
      songImageName: songImage[0].filename,
      songImageLocation: songImage[0].path,
      audioName: audio[0].filename,
      audioLocation: audio[0].path,
    },
    // 업데이트된 문서를 반환하는 옵션
    { new: true }
  );

  return modifySong;
}

// 곡을 DB에서 삭제
async function deleteSong(songId, userId) {
  const findSong = await Song.findById(songId);
  if (findSong.songUploader.toString() !== userId) return "forbidden";

  const modifySong = await Song.findByIdAndDelete(songId);
  return modifySong;
}

// 곡 좋아요 누르기 DB에 반영
async function pushLike(songId, userId) {
  const currentUser = await User.findById(userId);
  if (currentUser.likeSong.includes(songId)) return "conflict";

  // User document에서 좋아요한 음악 목록에 해당 songId 추가
  await User.findByIdAndUpdate(userId, {
    $push: { likeSong: songId },
  });

  // Song document에서 좋아요 수 1 증가
  await Song.findByIdAndUpdate(
    songId,
    { $inc: { songLiked: 1 } } // $inc 연산자를 사용하여 likeCount 필드를 1 증가
  );
}

// 곡 좋아요 취소 DB에 반영
async function cancelLike(songId, userId) {
  const currentUser = await User.findById(userId);
  if (!currentUser.likeSong.includes(songId)) return "conflict";

  // User document에서 좋아요한 음악 목록에 해당 songId 삭제
  await User.findByIdAndUpdate(userId, {
    $pull: { likeSong: songId },
  });

  // Song document에서 좋아요 수 1 감소
  await Song.findByIdAndUpdate(
    songId,
    { $inc: { songLiked: -1 } } // $inc 연산자를 사용하여 likeCount 필드를 1 증가
  );
}

module.exports = {
  uploadSong,
  getSongInfo,
  modifySongInfo,
  deleteSong,
  pushLike,
  cancelLike,
};
