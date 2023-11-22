const Playlist = require("../../db/models/playListModel");
const playListLikeSchema = require("../../db/models/playListLike");
const createError = require("http-errors");

const playSearch = async (query, page, pageSize, userId) => {
  try {
    const skip = (page - 1) * pageSize;
    const totalPlaylists = await Playlist.countDocuments({
      playListTitle: { $regex: new RegExp(query, "i") },
    });

    const searchPlayList = await Playlist.find({
      playListTitle: { $regex: new RegExp(query, "i") },
    })
      .skip(skip)
      .limit(pageSize);

    // 각 플레이리스트에 대해 사용자의 좋아요 여부 확인
    const searchPlayListWithLikeInfo = await Promise.all(
      searchPlayList.map(async (playlist) => {
        const like = await playListLikeSchema.findOne({
          userId: userId,
          playListId: playlist._id,
        });
        const likeCount = await playListLikeSchema.countDocuments({
          playListId: playlist._id,
        });
        return {
          ...playlist._doc,
          likedByUser: like ? true : false, 
          likeCount,
        };
      })
    );

    const totalPages = Math.ceil(totalPlaylists / pageSize);

    if (searchPlayListWithLikeInfo.length === 0) {
      return [];
    }

    return { totalPages, searchPlayList: searchPlayListWithLikeInfo };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { playSearch };
