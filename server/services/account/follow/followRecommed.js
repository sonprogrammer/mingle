const User = require("../../../db/models/userModel");
const PlayList = require("../../../db/models/playListModel");
const mongoose = require("mongoose");

async function recommend(userId) {
  const user = await User.findById(userId);
  let userPreference = null;
  let recommendUsers = [];

  // 유저가 취향을 입력하지 않은 경우와 유저가 모든 장르를 취향으로 입력했을 경우 => 모든 장르를 유저의 취향으로 간주하고 시작
  if (user.userPreference.length === 0 || user.userPreference.length === 5) {
    userPreference = ["발라드", "힙합", "록", "댄스", "클래식"];
    // 유저의 취향이 있을 경우 그 취향 그대로 가져가기
  } else {
    userPreference = [...user.userPreference];
  }

  // 1. 최근에 올라온 플레이리스트 순으로 살피며 그 플레이리스트의 장르가 유저의 취향 배열에 존재하는지 본다. + 업로더 겹치면 X + 5개 가져오기
  const distinctPlaylistUploaders = await PlayList.aggregate([
    {
      $match: {
        genre: { $in: userPreference },
        playListOwner: { $ne: new mongoose.Types.ObjectId(userId) },
      },
    },
    { $sort: { createdAt: -1 } }, // 최근에 올라온 순서로 정렬
    { $group: { _id: "$playListOwner" } },
    { $limit: 5 },
  ]);

  // 2. 존재하면 그 플레이리스트의 업로더 id를 추출하여 그 업로더에 대한 정보(업로더의 프로필 사진, 닉네임)와, 그 업로더가 올린
  // 플레이리스트를 최근순으로 3개 가져온다.
  const promises = distinctPlaylistUploaders.map(async (playList) => {
    const recommendUser = new Object();
    const uploader = await User.findById(playList._id);
    recommendUser.userId = uploader._id;
    recommendUser.nickname = uploader.userNickname;
    recommendUser.userImg = uploader.userImage;
    recommendUser.playListPreview = await PlayList.find({
      playListOwner: playList._id,
    })
      .select("playListImg")
      .sort({ createdAt: -1 })
      .limit(3);
    return recommendUser;
  });

  recommendUsers = await Promise.all(promises);
  return recommendUsers;
}

module.exports = { recommend };
