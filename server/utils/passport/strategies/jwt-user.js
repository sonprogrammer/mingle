const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

// JWT 토큰 추출 옵션 설정
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Bearer 토큰에서 JWT 추출
opts.secretOrKey = `${process.env.SHA_KEY}`; // 사용할 시크릿 키
/**
 * JWT 전략 생성
 */
const jwt = new JwtStrategy(opts, async (jwt_payload, done) => {
  // 토큰 타임아웃
  // 토큰 위변조시에는 넘어오지 않고 401 로 리턴된다.

  return done(null, { ...jwt_payload }); // Assume successful JWT verification
});

module.exports = jwt;
