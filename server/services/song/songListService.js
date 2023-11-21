const Song = require("../../db/models/songModel");
const SongLiked = require("../../db/models/songLikedModel");
const isUserLikedSong = require("../../utils/commons/isUserLikedSong");

// query로 orderby가 입력된 경우
async function getSongsOrderby(queryValue, userId) {
  // 좋아요 많은 순
  if (queryValue === "top") {
    const topSongs = await SongLiked.aggregate([
      {
        $group: {
          _id: "$songId",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]).limit(100);
    // songId들을 추출
    const songIds = topSongs.map((result) => result._id);
    const topSongsInfo = await Song.find({ _id: { $in: songIds } }).populate(
      "songUploader"
    );

    return isUserLikedSong.verifyInSong(userId, topSongsInfo);
  } else if (queryValue === "recent") {
    // 현재 날짜와 현재 날짜로부터 30일 전의 날짜 계산
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSongs = await Song.find({
      createdAt: {
        $gte: thirtyDaysAgo, // 이상 (30일 이전)
        $lte: new Date(), // 이하 (현재 날짜)
      },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("songUploader");
    return isUserLikedSong.verifyInSong(userId, recentSongs);
  } else {
    return null;
  }
}

// query로 category가 입력된 경우
async function getSongsByCategory(queryValue, userId) {
  const categorySongs = await Song.find({ songCategory: queryValue }).populate(
    "songUploader"
  );
  return isUserLikedSong.verifyInSong(userId, categorySongs);
}

// query로 search가 입력된 경우
async function getSongsBySearch(searchWord, searchType, userId) {
  let searchedSongs = null;

  if (searchType === "song-name") {
    searchedSongs = await Song.find({
      // i는 대소문자를 구분하지 않게 하는 옵션
      songName: { $regex: new RegExp(searchWord, "i") },
    }).populate("songUploader");
  } else if (searchType === "artist-name") {
    const songs = await Song.find({}).populate("songUploader");
    console.log(songs);
    searchedSongs = songs.filter((song) => {
      return (
        (song.songUploader &&
          song.songUploader.userNickname &&
          song.songUploader.userNickname.includes(searchWord)) ||
        (song.songArtist && song.songArtist.includes(searchWord))
      );
    });
  }

  return isUserLikedSong.verifyInSong(userId, searchedSongs);
}

// 유저가 좋아요한 곡 정보 가져오기
async function getUserLikedSongs(userId) {
  const userLikedSongs = await SongLiked.find({ userId }).populate({
    path: "songId",
    populate: { path: "songUploader" },
  });

  return isUserLikedSong.verifyInSongLiked(userId, userLikedSongs);
}

// 유저가 업로드한 곡 정보 가져오기
async function getUserUploadedSongs(userId) {
  const userUploadedSongs = await Song.find({ songUploader: userId }).populate(
    "songUploader"
  );
  console.log(userUploadedSongs);
  return isUserLikedSong.verifyInSong(userId, userUploadedSongs);
}

module.exports = {
  getSongsOrderby,
  getSongsByCategory,
  getSongsBySearch,
  getUserLikedSongs,
  getUserUploadedSongs,
};
