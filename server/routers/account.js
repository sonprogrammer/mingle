const express = require("express");
const accountCreate = require("../controllers/account/create");
const accountDelete = require("../controllers/account/delete");
const accountEdit = require("../controllers/account/update");
const search = require("../controllers/commons/search");
const passport = require("passport");
const router = express.Router();
const {
	userCreateValidation,
	userUpdateValidation,
} = require("./account-Validation");

// 로그인한 유저의 정보를 리턴
router.get(
	"/",
	passport.authenticate("jwt-user", { session: false }),
	async (req, res, next) => {
		try {
			// 유저 정보를 이메일로 검색
			const data = await search.UserSearch("id", req.user.id);
			res.status(200).json(data);
		} catch (error) {
			console.log(error);
			next({ code: 500 });
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
		const [bool, message] = await accountCreate.userCreate(req.body);
		// 추후에 회원 가입시에 가입후 정보를 달라고 할 경우 고쳐야 할 필요성 있음
		if (bool) {
			res.status(200).json(message); // Successful registration
		} else {
			res.status(400).json(message);
		}
	} catch (error) {
		console.log(error);
		next({ code: 500 });
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
			const data = await search.UserSearch("id", req.user.id);
			const [bool, { message }] = await accountDelete.UserDelete(data.id);
			if (bool) {
				res.status(200).json({ message }); // Successful registration
			} else {
				// 협의에 따라 200으로 변경 필요성 있음
				res.status(400).json({ message }); // Registration failed
			}
		} catch (error) {
			console.log(error);
			next({ code: 500 });
		}
	}
);

/**
 * 회원 정보 수정 라우터
 * PUT 방식을 사용하여 회원 정보 수정
 * @param {string} req.params.id - 사용자 ID
 * @param {object} req.body - 수정할 사용자 정보
 * @returns {object} - 수정이 성공하면 200 응답, 실패하면 400 응답
 */
router.put(
	"/",
	passport.authenticate("jwt-user", { session: false }),
	userUpdateValidation,
	async (req, res, next) => {
		try {
			const data = await search.UserSearch("id", req.user.id);
			const [bool, { message }] = await accountEdit.userEdit(
				data.id,
				req.body
			);

			if (bool) {
				res.status(200).json({ message }); // Successful registration
			} else {
				res.status(400).json({ message }); // Registration failed
			}
		} catch (error) {
			console.log(error);
			next({ code: 500 });
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

	async (req, res, next) => {
		try {
			res.status(200).json(req.user); // 로그인 성공 시 사용자 ID와 함께 응답
			console.log('로그인 성공!')
		} catch (error) {
			console.log(error);
			next({ code: 500 });
		}
	}
);

module.exports = router;
