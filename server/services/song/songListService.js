const Song = require("../../db/models/songModel");
const SongLiked = require("../../db/models/songLikedModel");
const isUserLikedSong = require("../../utils/commons/isUserLikedSong");
const songLikedModel = require("../../db/models/songLikedModel");
const createError = require("http-errors");

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
    const populatedSongs = await Promise.all(
      songIds.map((songId) => Song.findById(songId).populate("songUploader"))
    );

    return isUserLikedSong.verifyInSong(userId, populatedSongs);
  } else if (queryValue === "recent") {
    const recentSongs = await Song.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("songUploader");
    return isUserLikedSong.verifyInSong(userId, recentSongs);
  } else {
    throw createError(400, "path를 올바르게 입력해 주세요.");
  }
}

// query로 category가 입력된 경우
async function getSongsByCategory(queryValue, userId, page, pageSize) {
  const skip = (page - 1) * pageSize;

  const totalItems = await Song.countDocuments({ songCategory: queryValue });
  totalPages = Math.ceil(totalItems / pageSize);

  const categorySongs = await Song.find({ songCategory: queryValue })
    .populate("songUploader")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);
  const songs = await isUserLikedSong.verifyInSong(userId, categorySongs);
  return { songs, currentPage: page, totalPages };
}

// query로 search가 입력된 경우
async function getSongsBySearch(
  searchWord,
  searchType,
  userId,
  page,
  pageSize
) {
  const skip = (page - 1) * pageSize;
  let searchedSongs = null;
  let totalPages = 0;

  if (searchType === "song-name") {
    const totalItems = await Song.countDocuments({
      songName: { $regex: new RegExp(searchWord, "i") },
    });
    totalPages = Math.ceil(totalItems / pageSize);

    searchedSongs = await Song.find({
      // i는 대소문자를 구분하지 않게 하는 옵션
      songName: { $regex: new RegExp(searchWord, "i") },
    })
      .skip(skip)
      .populate("songUploader")
      .limit(pageSize);
  } else if (searchType === "artist-name") {
    const totalItems = await Song.countDocuments({
      songArtist: { $regex: new RegExp(searchWord, "i") },
    });
    searchedSongs = await Song.find({ songArtist: searchWord })
      .populate("songUploader")
      .skip(skip)
      .limit(pageSize);
    totalPages = Math.ceil(totalItems / pageSize);
  } else {
    throw createError(400, "path를 형식에 맞게 입력해 주세요.");
  }

  const songs = await isUserLikedSong.verifyInSong(userId, searchedSongs);
  return { songs, currentPage: page, totalPages };
}

// 유저가 좋아요한 곡 정보 가져오기
async function getUserLikedSongs(userId, page, pageSize) {
  const skip = (page - 1) * pageSize;

  const totalItems = await SongLiked.countDocuments({ userId });
  const totalPages = Math.ceil(totalItems / pageSize);

  const userLikedSongs = await SongLiked.find({ userId })
    .populate({
      path: "songId",
      populate: { path: "songUploader" },
    })
    .skip(skip)
    .limit(pageSize);

  const songs = await isUserLikedSong.verifyInSongLiked(userId, userLikedSongs);
  return { songs, currentPage: page, totalPages };
}

// 유저가 업로드한 곡 정보 가져오기
async function getUserUploadedSongs(userId, page, pageSize) {
  const skip = (page - 1) * pageSize;

  // 사용자가 업로드한 총 곡 수를 가져오기
  const totalItems = await Song.countDocuments({ songUploader: userId });
  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalItems / pageSize);

  const userUploadedSongs = await Song.find({ songUploader: userId })
    .populate("songUploader")
    .skip(skip)
    .limit(pageSize);
  const songs = await isUserLikedSong.verifyInSong(userId, userUploadedSongs);
  const like = await songLikedModel.find({ userId: userId });
  const songsInfo = await Promise.all(
    songs.map(async (song) => {
      const liked = like.some(
        (likeItem) => likeItem.songId.toString() === song._id.toString()
      );
      const likeCount = await songLikedModel.countDocuments({
        songId: song._id,
      });
      return { ...song, like: liked, likeCount };
    })
  );
  return {
    songsInfo,
    currentPage: page,
    totalPages,
  };
}

module.exports = {
  getSongsOrderby,
  getSongsByCategory,
  getSongsBySearch,
  getUserLikedSongs,
  getUserUploadedSongs,
};
