const express = require("express");
const app = express();
const path = require("path");

app.get("/api", function (req, res) {
  res.send("Melody Link API Server");
});

// JSON 파싱 설정: 요청의 본문을 JSON 형식으로 파싱하여 사용할 수 있도록 함
app.use(express.json());

// Passport 초기화: Passport 초기화를 수행하여 사용자 인증을 설정함
const passport = require("passport"); // Passport 모듈
const passportConfig = require("./utils/passport/index.js"); // Passport 설정 파일
app.use(passport.initialize());

// Passport 설정: 사용자 로그인 및 인증 전략을 설정
passportConfig();

// MongoDB 연결: MongoDB와 연결함
const conn = require("./db/connect.js");
conn.MongoConnect();

// dotenv 설정: 환경변수 로드를 위해 dotenv 설정을 적용
require("dotenv").config();

// upload 폴더 안에 있는 모든 하위 폴더에 대해 정적 파일 제공
// 'server/upload/songImg/abc.jpg'나 'server/upload/audio/song.mp3'와 같은 URL로 해당 파일들에 접근할 수 있다.
app.use("/server/upload", express.static(path.join(__dirname, "upload")));

//라우터 설정
const accountRouter = require("./routers/account.js"); // 사용자 기능 설정
const songRouter = require("./routers/song.js"); // 곡 관련 요청을 받는 라우터
const routeHandler = require("./utils/errorHandler/routeHandler.js"); // 에러 핸들러 설정
app.use(routeHandler);

app.use("/api/account", accountRouter);
app.use("/api/song", songRouter);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server is working : PORT - ", port);
});
