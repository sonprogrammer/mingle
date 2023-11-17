const express = require("express");
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

// 로그인한 유저의 정보를 리턴
router.get(
  "/",
  passport.authenticate("jwt-user", { session: false }),
  async (req, res, next) => {
    try {
      // userEmail 사용하여 유저 정보 찾기 작업 수행
      const data = await search.UserSearch("userEmail", req.user.userEmail);
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
      const data = await search.UserSearch("userEmail", req.user.userEmail); //JWT토큰으로 유저 이메일을 받아옴
      console.log(req.user.userEmail);
      console.log(data);
      const [bool, { message }] = await accountDelete.UserDelete(
        data.userEmail
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
      console.log(data);
      const [bool, { message }] = await accountEdit.userEdit(
        data.userEmail,
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
      console.log("로그인 성공!");
    } catch (error) {
      console.log(error);
      next({ code: 500 });
    }
  }
);

// 이메일 중복확인 api
router.get("/check-email", async (req, res, next) => {
  // 사용자가 입력한 이메일 쿼리로 받기
  const { email } = req.query;

  try {
    // 이메일이 이미 DB에 존재하는지 확인
    const isEmailExsist = await search.EmailExsist(email);

    if (!isEmailExsist) {
      res.status(200).json({ message: "사용 가능한 이메일입니다." });
    } else {
      res.status(400).json({ message: "이미 존재하는 사용자입니다." });
    }
  } catch (error) {
    console.log(error);
    next({ code: 500 });
  }
});

// 비밀번호 찾기 api
router.post("/reset-password", async (req, res, next) => {
  const { userNickname, userEmail } = req.body;

  try {
    const isUserExsist = await search.UserExsist(userNickname, userEmail);
    if (isUserExsist) {
      await resetPassword.reset(userEmail);
      res
        .status(200)
        .json({ message: `${userEmail}로 임시 비밀번호가 발급되었습니다.` });
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
  } catch (error) {
    console.log(error);
    next({ code: 500, message: "비밀번호 재설정 중 오류가 발생하였습니다." });
  }
});

module.exports = router;
