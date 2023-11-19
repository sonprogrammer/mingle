const express = require("express");
const router = express.Router();
const passport = require("passport");
const songService = require("../services/song/songListService");

// 좋아요 높은 순, 최신 순, 장르별, 검색어로 곡들 가져오는 api
router.get("/", async (req, res) => {
  try {
    // orderby=top(좋아요 높은 순), orderby=recent(최신 순)로 query parameter가 들어왔을 경우
    if (req.query.orderby) {
      const { orderby } = req.query;
      const orderbySongs = await songService.getSongsOrderby(orderby);
      return res.status(200).json(orderbySongs);
    }
    // category=카테고리(장르별)로 query parameter가 들어왔을 경우
    else if (req.query.category) {
      const { category } = req.query;
      const categorySongs = await songService.getSongsByCategory(category);
      return res.status(200).json(categorySongs);
    }
    // search=곡명 검색어 로 query parameter가 들어왔을 경우
    else if (req.query.search && req.query.type) {
      const { search, type } = req.query;
      const searchedSongs = await songService.getSongsBySearch(search, type);
      return res.status(200).json(searchedSongs);
    }
    // 유효하지 않은 쿼리 파라미터를 입력한 경우
    else {
      return res
        .status(400)
        .json({ message: "유효한 쿼리 파라미터를 입력해 주세요." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "곡을 가져오는 중 오류가 발생하였습니다." });
  }
});

// 유저가 좋아요한 곡들 가져오기
router.get(
  "/user-liked",
  passport.authenticate("jwt-user", { session: false }),
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const userLikedSongs = await songService.getUserLikedSongs(userId);
      res.status(200).json(userLikedSongs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "곡을 가져오는 중 오류가 발생하였습니다." });
    }
  }
);

module.exports = router;
