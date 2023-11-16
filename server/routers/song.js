const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../services/song/uploadSong");
const getOneSong = require("../services/song/getSong");
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
      await upload.uploadSong({ userId, songInfo: req.body, audio, songImage });
      res.status(201).json({ message: "곡 업로드에 성공하였습니다!" });
    } catch (error) {
      res.status(500).json({ message: "곡 업로드 중 에러가 발생했습니다." });
    }
  }
);

// 특정 곡 정보 가져오기 api
router.get("/:songId", async (req, res) => {
  try {
    const { songId } = req.params;
    const song = await getOneSong.getSongInfo(songId);
    if (!song)
      res.status(404).json({ message: "해당 곡은 존재하지 않습니다." });
    res.status(200).json(song);
  } catch (error) {
    res
      .status(500)
      .json({ message: "곡을 가져오는 중에 에러가 발생했습니다." });
  }
});

module.exports = router;
