const Song = require("../../db/models/songModel");
const path = require("path");

async function uploadSong({ userId, songInfo, audio, songImage }) {
  // 클라이언트로부터 body로 받아야 할 곡의 정보 (음원, 이미지 제외)
  const { songName, songDescription, songDuration, songCategory, songTempo } =
    songInfo;

  // 곡을 업로드하는 유저 object id는 song의 songUploader에 저장
  await Song.create({
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
}

module.exports = { uploadSong };
