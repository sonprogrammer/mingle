const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

// JWT 토큰 추출 옵션 설정
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Bearer 토큰에서 JWT 추출
opts.secretOrKey = process.env.SHA_KEY; // 사용할 시크릿 키

/**
 * JWT 전략 생성
 * userEmail: 사용자 이메일(id처럼 치부)
 * userId: 사용자 아이디(objectId)
 */
const jwt = new JwtStrategy(opts, async (jwt_payload, done) => {
	try {
		// 여기서는 토큰에서 사용자 정보 추출
		const user = {
			userEmail: jwt_payload.id,// 사용자 이메일 (토큰에 따라 다를 수 있음)
			userId: jwt_payload.userId, // 사용자 아이디
			//userId : objectId 입니다.
		};

		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	} catch (error) {
		return done(error, false);
	}
});

module.exports = jwt;
