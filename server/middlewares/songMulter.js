const multer = require("multer");
const path = require("path");

// 곡 커버 이미지, 음원 파일을 저장할 스토리지 정의
const songStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadFolder = "";
    // 확장자 추출
    const ext = path.extname(file.originalname);

    // 이미지의 경우 img 폴더에 저장, 재생 파일의 경우 audio 폴더에 저장
    if (ext === ".jpg" || ext === ".png") {
      uploadFolder = "server/upload/songImg";
    } else if (ext === ".mp3" || ext === ".wav") {
      uploadFolder = "server/upload/audio";
    } else {
      return cb(
        // 허락하지 않은 확장자 파일을 올릴 경우
        new Error(
          "이미지는 .jpg, .png, 음원은 .mp3, .wav 파일만 업로드 가능합니다."
        )
      );
    }

    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    // 확장자 추출
    const ext = path.extname(file.originalname);
    // 파일에 고유한 이름을 부여하기 위해 Date.now() 사용
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const songUpload = multer({ storage: songStorage });

module.exports = songUpload;
