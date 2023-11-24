const express = require("express");
const router = express.Router();
const genreService = require("../../server/services/genre/getGenres");

// 회원가입이나 유저 정보 수정 시 사용자의 취향을 받기 위한 장르들 가져오기
router.get("/", async (req, res, next) => {
  try {
    const genres = await genreService.getGenres();
    return res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
