const express = require("express");
const router = express.Router();
const passport = require("passport");
const songService = require("../services/song/songListService");
const createError = require("http-errors");

// 좋아요 높은 순, 최신 순, 장르별, 검색어로 곡들 가져오는 api
router.get(
  "/",
  passport.authenticate("jwt-user", { session: false }),
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 10;

      // orderby=top(좋아요 높은 순), orderby=recent(최신 순)로 query parameter가 들어왔을 경우
      if (req.query.orderby) {
        const { orderby } = req.query;
        const orderbySongs = await songService.getSongsOrderby(
          orderby,
          userId,
          page,
          pageSize
        );
        return res.status(200).json(orderbySongs);
      }
      // category=카테고리(장르별)로 query parameter가 들어왔을 경우
      else if (req.query.category) {
        const { category } = req.query;
        const categorySongs = await songService.getSongsByCategory(
          category,
          userId,
          page,
          pageSize
        );
        return res.status(200).json(categorySongs);
      }
      // search=곡명 검색어 로 query parameter가 들어왔을 경우
      else if (req.query.search && req.query.type) {
        const { search, type } = req.query;
        const searchedSongs = await songService.getSongsBySearch(
          search,
          type,
          userId,
          page,
          pageSize
        );
        return res.status(200).json(searchedSongs);
      } else {
        throw createError(400, "path를 형식에 맞게 입력해 주세요.");
      }
    } catch (error) {
      next(error);
    }
  }
);

// 유저가 좋아요한 곡들 가져오기
router.get(
  "/user-liked",
  passport.authenticate("jwt-user", { session: false }),
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 10;
      const userLikedSongs = await songService.getUserLikedSongs(
        userId,
        page,
        pageSize
      );
      return res.status(200).json(userLikedSongs);
    } catch (error) {
      next(error);
    }
  }
);

// 유저가 업로드한 곡들 가져오기
router.get(
  "/user-uploaded",
  passport.authenticate("jwt-user", { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 10;
      const userUploadedSongs = await songService.getUserUploadedSongs(
        userId,
        page,
        pageSize
      );
      res.status(200).json(userUploadedSongs);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
