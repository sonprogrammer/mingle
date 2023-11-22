const express = require("express");
const mongoose = require("mongoose");
const playListCreate = require("../services/playList/playCreate");
const playListDelete = require("../services/playList/playDelete");
const playListUpdate = require("../services/playList/playUpdate");
const playListAddSong = require("../services/playList/playAddSong");
const playListDeleteSong = require("../services/playList/playDelteSong");
const playListLike = require("../services/playList/playListLike");
const playListWeather = require("../services/playList/playListWeather");
const playComment = require("../services/playList/playComment.js");
const playSearch = require("../services/playList/playSearch");
const playListGet = require("../services/playList/playListGet");
const search = require("../utils/commons/search");
const router = express.Router();
const passport = require("passport");
const playListSchema = require("../db/models/playListModel");
const createError = require("http-errors");

// playlist 생성
router.post(
	"/",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId; // passport-jwt에서 추가한 사용자 정보
			const [success, result] = await playListCreate.playListCreate(
				req.body,
				userId
			);

			if (success) {
				res.json(result);
			} else {
				res.status(500).json(result);
			}
		} catch (error) {
			next(error);
		}
	}
);

// playlist 조회
router.get(
	"/",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const data = await playListGet.playListGetAll(userId);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
);

//특정 플레이리스트 조회
router.get(
	"/:playlistId",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const playlistId = req.params.playlistId;
			const data = await playListGet.playListGetOne(userId, playlistId);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
);
// DELETE: /플레이리스트-삭제/:playlistId
router.delete(
	"/:playlistId",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const playlistId = req.params.playlistId;
			const data = await playListDelete.playListDelete(userId, playlistId);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	"/:playlistId",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const playlistId = req.params.playlistId;
			const [success, result] = await playListUpdate.playListUpdate(
				playlistId,
				req.body
			);
			if (success) {
				res.json(result);
			} else {
				next(createError(500), result);
			}
		} catch {
			next(error);
		}
	}
);

// 플레이리스트에 음악 추가

router.post(
	"/:playlistId/addSong/:songId",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const playlistId = req.params.playlistId;
			const songId = req.params.songId;
			const data = await playListAddSong.playListAddSong(
				playlistId,
				songId,
				userId
			);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	"/:playlistId/deleteSong/:songId",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const playlistId = req.params.playlistId;
			const songId = req.params.songId;
			const [success, result] = await playListDeleteSong.playListDeleteSong(
				playlistId,
				songId
			);
			res.json(result); // 무조건 응답을 보냅니다.
		} catch (error) {
			next(error);
		}
	}
);
// 플레이리스트 좋아요
router.post(
	"/:playlistId/like",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			// 플레이리스트의 ObjectId
			const playlistId = req.params.playlistId;
			// 현재 로그인한 사용자의 ObjectId
			const userId = req.user.userId;
			const data = await playListLike.addLike(playlistId, userId);
			res.status(200).json({ message: "좋아요가 업데이트되었습니다" });
		} catch (error) {
			next(error);
		}
	}
);
// 플레이리스트 좋아요 취소
router.delete(
	"/:playlistId/like",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const playlistId = req.params.playlistId;
			const userId = req.user.userId;
			const data = await playListLike.deleteLike(playlistId, userId);
			res.status(200).json({ message: "좋아요가 삭제되었습니다." });
		} catch (error) {
			next(error);
		}
	}
);

// 날씨에 맞는 플레이리스트 가져오기
router.get("/weather/:weatherId", async (req, res, next) => {
	try {
		const { weatherId } = req.params;
		const weatherPlayLists = await playListWeather.getWeatherPlayList(
			weatherId
		);
		res.status(200).json(weatherPlayLists);
	} catch (error) {
		next(error);
	}
});
// 플레이리스트에 대한 댓글
router.get(
	"/playlistComment/:playlistId",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const playlistId = req.params.playlistId;
			const data = await playComment.playCommentRead(playlistId);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
);
router.post(
	"/playlistComment/:playlistId",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const playlistId = req.params.playlistId;
			const data = req.body;
			const comment = await playComment.playCommentCreate(
				userId,
				playlistId,
				data
			);
			res.status(200).json(comment);
		} catch (error) {
			next(error);
		}
	}
);
router.put(
	"/playlistComment/:commentId",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const commentId = req.params.commentId;
			const data = req.body;
			const comment = await playComment.playCommentUpdate(
				userId,
				commentId,
				data
			);
			res.status(200).json(comment);
		} catch (error) {
			next(error);
		}
	}
);
router.delete(
	"/playlistComment/:playlistId/:commentId",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const playlistId = req.params.playlistId;
			const userId = req.user.userId;
			const commentId = req.params.commentId;
			const data = await playComment.playCommentDelete(
				userId,
				playlistId,
				commentId
			);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
);

//플레이리스트 검색
router.get(
	"/playlistsearch/search",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const query = req.query.q;
			const page = req.query.page || 1;
			const pageSize = req.query.pageSize || 10;
			const data = await playSearch.playSearch(query, page, pageSize, userId);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
