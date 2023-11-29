/**
 * Passport 설정
 * passport: Passport 인증 모듈
 * local: 로컬 전략
 * jwt: JWT 전략
 * @param {function} done - Passport 설정 함수
 */
const passport = require("passport");
const localUser = require("./strategies/local-user");
const jwtUser = require("./strategies/jwt-user");

// Passport 설정 함수
module.exports = () => {
  // 'local-user' 전략 등록
  passport.use("local-user", localUser);
  // 'jwt' 전략 등록
  passport.use("jwt-user", jwtUser);
};
