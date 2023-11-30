const express = require("express");
const createError = require("http-errors");
const accountGet = require("../services/account/get");
const accountCreate = require("../services/account/create");
const accountDelete = require("../services/account/delete");
const accountEdit = require("../services/account/update");
const search = require("../utils/commons/search");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const createFollow = require("../services/account/follow/createFollow");
const User = require("../db/models/userModel");
const viewFollow = require("../services/account/follow/viewFollow");
const playListLike = require("../services/playList/playListLike");
const PlayList = require("../db/models/playListModel");
const verifyRefreshToken = require("../utils/passport/strategies/verfyRefresh");
const router = express.Router();
const {
	userCreateValidation,
	userUpdateValidation,
} = require("../middlewares/account-Validation");
const resetPassword = require("../services/account/resetPassword");
const followRecommend = require("../services/account/follow/followRecommed");
const routeHandler = require("../utils/errorHandler/routeHandler");

router.use(routeHandler);

// 로그인한 유저의 정보를 리턴
router.get(
	"/",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const data = await accountGet.accountGet(userId);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
	);
	
	/**
	 * 회원 가입 API
	 * POST 방식을 사용하여 회원 가입 처리
	 * @param {object} req.body - 가입할 사용자 정보 (JSON 형태의 request body로 전달)
	 * @returns {object} - 회원 가입 성공 시 200 응답, 실패 시 400 응답
	*/
	router.post("/", userCreateValidation, async (req, res, next) => {
		try {
			const data = await accountCreate.userCreate(req.body);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	});
	

/**
 * 회원 탈퇴 API
 * DELETE 방식을 사용하여 회원 탈퇴 처리
 * @param {string} req.params.id - 삭제할 사용자 ID (URL의 파라미터로 전달)
 * @returns {object} - 회원 탈퇴 성공 시 200 응답, 실패 시 400 응답
 */
router.delete(
	"/",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const { userId } = req.user;
			const user = await search.UserSearch("userEmail", req.user.userEmail);
			const data = await accountDelete.UserDelete(
				user.userEmail,
				userId
			);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
);

/**
 * 회원 정보 수정 라우터
 * PUT 방식을 사용하여 회원 정보 수정
 * @param {string} req.params.id - 사용자 ID
 * @param {object} req.body - 수정할 사용자 정보
 */
router.put(
	"/",
	passport.authenticate("jwt-user", { session: false }),
	userUpdateValidation,
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const result = await accountEdit.userEdit(userId, req.body);
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}
);



/**
 * 로그인 라우터
 * POST 방식을 사용하여 로그인 처리
 * @param {string} req.body.id - 사용자 id
 * @param {string} req.body.password - 사용자 비밀번호
 * @returns {object} - 로그인 성공 시 200 응답과 액세스 토큰, 실패 시 401 응답
 */
router.post(
	"/login",
	passport.authenticate("local-user", { session: false }),
	async(req, res,next) => {
		try{
      res.status(200).json(req.user);
    }
    catch(error){
      next(error)
    }
	}
);

router.post("/refresh", verifyRefreshToken, (req, res) => {
	try {
		const accessToken = jwt.sign(
			{ id: req.user.id, userId: req.user.userId },
			process.env.SHA_KEY,
			{
				expiresIn: "1d",
			}
		);
		const accessExpiredDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
		res.status(200).json({
			accessToken: accessToken,
			accessExpiredDate: accessExpiredDate,
		});
	} catch (error) {
		next(error);
	}
});

// 이메일 중복확인 api
router.get("/check-email", async (req, res, next) => {
	const { email } = req.query;
	try {
		await search.EmailExist(email);
		res.status(200).json({ message: "사용 가능한 이메일입니다." });
	} catch (error) {
		next(error);
	}
});

// 비밀번호 찾기 api
router.post("/reset-password", async (req, res, next) => {
	const { userNickname, userEmail } = req.body;
	try {
		await search.UserExist(userNickname, userEmail);
		await resetPassword.reset(userEmail);
		res
			.status(200)
			.json({ message: `${userEmail}로 임시 비밀번호가 발급되었습니다.` });
	} catch (error) {
		next(error);
	}
});

router.get(
	"/my-like-playlist",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const data = await playListLike.searchUserLike(userId);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	"/follow",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const data = await viewFollow.viewFollow(userId);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	"/follower",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const data = await viewFollow.viewFollower(userId);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	"/follow/:followUserId",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const followUserId = req.params.followUserId;
			await createFollow.userFollow(userId, followUserId);
			res.status(200).json({ message: "팔로우 성공" });
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	"/follow/:followUserId",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.userId;
			const followUserId = req.params.followUserId;
			await createFollow.userUnFollow(userId, followUserId);
			res.status(200).json({ message: "팔로우 취소 성공" });
		} catch (error) {
			next(error);
		}
	}
);

// 유저 설명 수정 api
router.put(
	"/description",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			const { userId } = req.user;
			const { userDescription } = req.body;
			await accountEdit.userDescriptionEdit(userId, userDescription);
			res.status(200).json({ message: "유저 설명 수정에 성공하였습니다." });
		} catch (error) {
			next(error);
		}
	}
);

// 팔로우한 유저가 없을 때 피드 페이지에서 유저 추천 기능 구현
router.get(
    "/user-recommend",
    passport.authenticate("jwt-user", { session: false }),
    async (req, res, next) => {
        try {
            const userId  = req.user.userId;

            const recommendUsers = await followRecommend.recommend(userId);
            res.status(200).json(recommendUsers);
        } catch (error) {
            next(error);
        }
    }
);
router.get('/:userId',
passport.authenticate("jwt-user", { session: false }),
 async (req, res, next) => {
	try{
		const userId = req.params.userId;
		const data = await accountGet.getInfo(userId);	
		res.status(200).json(data);
	}catch(error){
		next(error);
	}
});
module.exports = router;
