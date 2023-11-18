const Song = require("../../db/models/songModel");
const User = require("../../db/models/userModel");

// query로 orderby가 입력된 경우
async function getSongsOrderby(queryValue) {
  // 좋아요 많은 순
  if (queryValue === "top") {
    const topSongs = await Song.find({})
      .sort({ songLikedCount: -1 })
      .limit(100);
    return topSongs;
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
      .limit(10);
    return recentSongs;
  } else {
    return null;
  }
}

// query로 category가 입력된 경우
async function getSongsByCategory(queryValue) {
  const categorySongs = await Song.find({ songCategory: queryValue });
  return categorySongs;
}

// query로 search가 입력된 경우
async function getSongsBySearch(searchWord, searchType) {
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
  return searchedSongs;
}

async function getUserLikedSongs(userId) {
  const userLikedSongs = await User.findById(userId).populate("likeSong");
  return userLikedSongs.likeSong;
}

module.exports = {
  getSongsOrderby,
  getSongsByCategory,
  getSongsBySearch,
  getUserLikedSongs,
};
