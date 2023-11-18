const Song = require("../../db/models/songModel");
const User = require("../../db/models/userModel");
const path = require("path");

async function uploadSong({ userId, songInfo, audio, songImage }) {
  // 클라이언트로부터 body로 받아야 할 곡의 정보 (음원, 이미지 제외)
  const { songName, songDescription, songDuration, songCategory, songTempo } =
    songInfo;

  // 곡을 업로드하는 유저 object id는 song의 songUploader에 저장
  const createSong = await Song.create({
    songName,
    songDescription,
    songUploader: userId,
    songDuration,
    songCategory,
    songTempo,
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

  return createSong;
}

// songId로 해당하는 곡 찾기
async function getSongInfo(songId) {
  const findSong = await Song.findById(songId)
    .populate("songUploader")
    .populate("songLiked");

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
async function toggleLike(songId, userId) {
  // 1. songId에 해당하는 유저를 찾아서 그 document의 songLiked 필드에 현재 로그인한 user의 objectId가 있는지를 확인
  // 2. 만약 존재한다면 좋아요를 취소해야 하므로 해당 song의 songLiked 필드에 있는 userId를 삭제하기 + user의 likeSong에서도 songId 삭제하기
  // 3. 만약 존재하지 않는다면 좋아요를 눌러야 하므로 해당 song의 songLiked 필드에 userId를 추가하기 + user의 likeSong에서도 songId 추가하기
  const findSong = await Song.findById(songId);

  if (!findSong) return { likeUpdatedSong: null, message: "not-found" };

  const findUser = await User.findById(userId);

  let likeUpdatedSong = null;
  let message = "";

  if (!findSong.songLiked.includes(userId)) {
    findSong.songLiked.push(userId);
    findSong.songLikedCount += 1;
    likeUpdatedSong = await findSong.save();
    findUser.likeSong.push(songId);
    await findUser.save();
    message = "곡 좋아요에 성공하였습니다.";
  } else {
    findSong.songLiked.splice(findSong.songLiked.indexOf(userId), 1);
    findSong.songLikedCount -= 1;
    likeUpdatedSong = await findSong.save();
    findUser.likeSong.splice(findUser.likeSong.indexOf(songId), 1);
    await findUser.save();
    message = "곡 좋아요 취소에 성공하였습니다.";
  }

  return { likeUpdatedSong, message };
}

module.exports = {
  uploadSong,
  getSongInfo,
  modifySongInfo,
  deleteSong,
  toggleLike,
};
