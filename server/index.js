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

// /server/upload/songImg 폴더 안에 있는 모든 하위 폴더에 대해 정적 파일 제공
// 'server/upload/songImg/abc.jpg'나 'server/upload/audio/song.mp3'와 같은 URL로 해당 파일들에 접근할 수 있다.
app.use(
  "/server/upload/songImg",
  express.static(path.join(__dirname, "upload", "songImg"))
);

app.use(
  "/server/upload/audio",
  express.static(path.join(__dirname, "upload", "audio"), {
    setHeaders: (res, path, stat) => {
      res.setHeader("Accept-Ranges", "bytes");
    },
  })
);

app.get("/server/upload/audio/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(audioPath, filename);

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  // 클라이언트가 range를 설정해 줄 경우 아래 코드가 실행된다.
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "audio/mp3",
    });

    file.pipe(res);
  } else {
    res.status(416).send("Range Not Satisfiable");
  }
});

//라우터 설정
const accountRouter = require("./routers/account.js"); // 사용자 기능 설정
const songRouter = require("./routers/song.js"); // 곡 관련 요청을 받는 라우터
const playListRouter = require("./routers/playList.js"); // 플레이리스트 기능 설정
const routeHandler = require("./utils/errorHandler/routeHandler.js"); // 에러 핸들러 설정
app.use(routeHandler);

app.use("/api/account", accountRouter);
app.use("/api/song", songRouter);
app.use("/api/playlist", playListRouter);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server is working : PORT - ", port);
});
