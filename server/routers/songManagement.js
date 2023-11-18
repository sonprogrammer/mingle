const express = require("express");
const router = express.Router();
const passport = require("passport");
const songService = require("../services/song/songManagementService");
// 곡 관련 multer storage 가져오기
const songUpload = require("../middlewares/songMulter");

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
    { name: "songTempo" },
  ]),
  async (req, res) => {
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
      // res 보낼 때 return을 적어주지 않으면 나중에 응답이 여러개가 보내져 오류날 수 있다.
      return res.status(201).json({ newSong });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "곡 업로드 중 에러가 발생했습니다." + error });
    }
  }
);

// 특정 곡 정보 가져오기 api
router.get("/:songId", async (req, res) => {
  try {
    const { songId } = req.params;
    const song = await songService.getSongInfo(songId);
    if (!song)
      return res.status(404).json({ message: "해당 곡은 존재하지 않습니다." });
    return res.status(200).json(song);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "곡을 가져오는 중에 에러가 발생했습니다." });
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
    { name: "songTempo" },
  ]),
  async (req, res) => {
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

      if (modifiedSong === "forbidden")
        return res.status(403).json({
          message: "회원님이 업로드하지 않은 곡은 수정이 불가능합니다.",
        });

      return res.status(200).json({ modifiedSong });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "곡 수정 중 에러가 발생하였습니다." + error });
    }
  }
);

// 곡 삭제 api
router.delete(
  "/:songId",
  // 유저 검증을 먼저 수행
  passport.authenticate("jwt-user", { session: false }),
  async (req, res) => {
    try {
      const { songId } = req.params;
      const { userId } = req.user;

      // 곡 삭제
      const deleteSong = await songService.deleteSong(songId, userId);

      if (deleteSong === "forbidden")
        return res.status(403).json({
          message: "회원님이 업로드하지 않은 곡은 삭제가 불가능합니다.",
        });

      return res.status(200).json({ message: "곡 삭제에 성공하였습니다." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "곡 삭제 중 에러가 발생하였습니다." + error });
    }
  }
);

// 곡 좋아요 토글하기 api
router.post(
  "/:songId/like-toggle",
  passport.authenticate("jwt-user", { session: false }),
  async (req, res) => {
    try {
      const { songId } = req.params;
      const { userId } = req.user;
      const { likeUpdatedSong, message } = await songService.toggleLike(
        songId,
        userId
      );

      if (!likeUpdatedSong)
        return res
          .status(404)
          .json({ message: "해당 곡은 존재하지 않습니다." });

      return res.status(200).json({ likeUpdatedSong, message });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "곡 좋아요에 실패하였습니다." + error });
    }
  }
);

module.exports = router;
