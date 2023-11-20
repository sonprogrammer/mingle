const express = require("express");
const router = express.Router();
const passport = require("passport");
const songService = require("../services/song/songManagementService");
// 곡 관련 multer storage 가져오기
const songUpload = require("../middlewares/songMulter");
const createError = require("http-errors");

// 곡 업로드 api
router.post(
  "/",
  // 유저 검증을 먼저 수행
  passport.authenticate("jwt-user", { session: false }),
  // 클라이언트로부터 받아 업로드해야 하는 필드들
  songUpload.fields([
    { name: "audio" },
    { name: "songImage" },
    { name: "songName" },
    { name: "songDescription" },
    { name: "songDuration" },
    { name: "songCategory" },
    { name: "songMood" },
  ]),
  async (req, res, next) => {
    try {
      // 곡을 업로드하는 유저를 DB에 등록하기 위해 userId 받기
      const { userId } = req.user;
      // 파일에 해당하는 곡 커버 이미지와 음원은 req.files로 받기
      const { audio, songImage } = req.files;
      // 곡 업로드
      const newSong = await songService.uploadSong({
        userId,
        songInfo: req.body,
        audio,
        songImage,
      });
      return res.status(201).json({ newSong });
    } catch (error) {
      next(createError(500));
    }
  }
);

// 특정 곡 정보 가져오기 api
router.get("/:songId", async (req, res, next) => {
  try {
    const { songId } = req.params;
    const song = await songService.getSongInfo(songId);
    return res.status(201).json(song);
  } catch (error) {
    return next(
      createError(
        error.status || 500,
        error.message || "곡을 가져오는 중 오류가 발생하였습니다."
      )
    );
  }
});

// 곡 수정 api
router.put(
  "/:songId",
  // 유저 검증을 먼저 수행
  passport.authenticate("jwt-user", { session: false }),
  // 클라이언트로부터 받아 업로드해야 하는 필드들
  songUpload.fields([
    { name: "audio" },
    { name: "songImage" },
    { name: "songName" },
    { name: "songDescription" },
    { name: "songDuration" },
    { name: "songCategory" },
    { name: "songMood" },
  ]),
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { songId } = req.params;
      // 파일에 해당하는 곡 커버 이미지와 음원은 req.files로 받기
      const { audio, songImage } = req.files;
      // 곡 업로드
      const modifiedSong = await songService.modifySongInfo({
        userId,
        songId,
        songInfo: req.body,
        audio,
        songImage,
      });
      return res.status(200).json({ modifiedSong });
    } catch (error) {
      return next(
        createError(
          error.status || 500,
          error.message || "곡을 가져오는 중 오류가 발생하였습니다."
        )
      );
    }
  }
);

// 곡 삭제 api
router.delete(
  "/:songId",
  // 유저 검증을 먼저 수행
  passport.authenticate("jwt-user", { session: false }),
  async (req, res, next) => {
    try {
      const { songId } = req.params;
      const { userId } = req.user;

      // 곡 삭제
      await songService.deleteSong(songId, userId);
      return res.status(200).json({ message: "곡 삭제에 성공하였습니다." });
    } catch (error) {
      return next(
        createError(
          error.status || 500,
          error.message || "곡을 가져오는 중 오류가 발생하였습니다."
        )
      );
    }
  }
);

// 곡 좋아요 토글하기 api
router.post(
  "/:songId/like-toggle",
  passport.authenticate("jwt-user", { session: false }),
  async (req, res, next) => {
    try {
      const { songId } = req.params;
      const { userId } = req.user;
      const { likeUpdatedSong, message } = await songService.toggleLike(
        songId,
        userId
      );
      return res.status(200).json({ likeUpdatedSong, message });
    } catch (error) {
      return next(
        createError(
          error.status || 500,
          error.message || "곡 좋아요 토글중 에러가 발생하였습니다."
        )
      );
    }
  }
);

module.exports = router;
