const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

// 이미지 파일 필터
const imageFileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    return cb(null, true);
  } else {
    const error = createError(
      400,
      "이미지는 .jpg, .png 파일만 업로드 가능합니다."
    );
    cb(error);
  }
};

// 음원 파일 필터
const audioFileFilter = (req, file, cb) => {
  const allowedExtensions = [".mp3", ".wav"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    return cb(null, true);
  } else {
    const error = createError(
      400,
      "음원은 .mp3, .wav 파일만 업로드 가능합니다."
    );
    cb(error);
  }
};

// 곡 커버 이미지, 음원 파일을 저장할 스토리지 정의
const songStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadFolder = "";

    if (file.fieldname === "songImage") {
      uploadFolder = "server/upload/songImg";
    } else if (file.fieldname === "audio") {
      uploadFolder = "server/upload/audio";
    }

    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const songUpload = multer({
  storage: songStorage,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === "songImage") {
      imageFileFilter(req, file, cb);
    } else if (file.fieldname === "audio") {
      audioFileFilter(req, file, cb);
    } else {
      cb(null, false);
    }
  },
});

module.exports = songUpload;
