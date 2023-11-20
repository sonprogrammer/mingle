const express = require("express");
const createError = require("http-errors");
const accountCreate = require("../services/account/create");
const accountDelete = require("../services/account/delete");
const accountEdit = require("../services/account/update");
const search = require("../utils/commons/search");
const passport = require("passport");
const router = express.Router();
const {
  userCreateValidation,
  userUpdateValidation,
} = require("../middlewares/account-Validation");
const resetPassword = require("../services/account/resetPassword");
const routeHandler = require("../utils/errorHandler/routeHandler");

router.use(routeHandler);

// 로그인한 유저의 정보를 리턴
router.get(
  "/",
  passport.authenticate("jwt-user", { session: false }),
  async (req, res, next) => {
    try {
      const data = await search.UserSearch("userEmail", req.user.userEmail);
      res.status(200).json(data);
    } catch (error) {
      next(createError(500));
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
    const statusCode = bool ? 200 : 400;
    res.status(statusCode).json(message);
  } catch (error) {
    next(createError(500));
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
      const data = await search.UserSearch("userEmail", req.user.userEmail);
      const [bool, { message }] = await accountDelete.UserDelete(
        data.userEmail
      );
      const statusCode = bool ? 200 : 400;
      res.status(statusCode).json({ message });
    } catch (error) {
      next(createError(500));
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
        data.userEmail,
        req.body
      );
      const statusCode = bool ? 200 : 400;
      res.status(statusCode).json({ message });
    } catch (error) {
      next(createError(500));
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
  (req, res) => {
    res.status(200).json(req.user);
    console.log("로그인 성공!");
  }
);

// 이메일 중복확인 api
router.get("/check-email", async (req, res, next) => {
  const { email } = req.query;
  try {
    const isEmailExist = await search.EmailExist(email);
    const statusCode = isEmailExist ? 400 : 200;
    const message = isEmailExist
      ? "이미 존재하는 사용자입니다."
      : "사용 가능한 이메일입니다.";
    res.status(statusCode).json({ message });
  } catch (error) {
    next(createError(500));
  }
});

// 비밀번호 찾기 api
router.post("/reset-password", async (req, res, next) => {
  const { userNickname, userEmail } = req.body;
  try {
    const isUserExist = await search.UserExist(userNickname, userEmail);
    if (isUserExist) {
      await resetPassword.reset(userEmail);
      res
        .status(200)
        .json({ message: `${userEmail}로 임시 비밀번호가 발급되었습니다.` });
    } else {
      //유빈님 예시 입니다.
      //기존 코드
      //res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      //수정 코드
      next(createError(404, "사용자를 찾을 수 없습니다."));
    }
  } catch (error) {
    next(createError(500, "비밀번호 재설정 중 오류가 발생하였습니다."));
  }
});

module.exports = router;
