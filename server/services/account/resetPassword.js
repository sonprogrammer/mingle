const nodemailer = require("nodemailer");
const User = require("../../db/models/userModel");
const createError = require("http-errors");
const HmacConvert = require("../../utils/commons/passwordConvert");
const crypto = require("crypto");
require("dotenv").config();

const { EMAIL_SERVICE, SEND_USER, GOOGLE_APP_PASSWORD } = process.env;

// 메일을 보낼 수 있게 transporter 생성
const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: SEND_USER,
    pass: GOOGLE_APP_PASSWORD,
  },
});

// 임시 비밀번호 생성 함수
// 랜덤 문자열 생성 함수
const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // 16진수로 변환
    .slice(0, length); // 원하는 길이만큼 잘라냄
};

async function reset(userEmail) {
  try {
    // 임시 비밀번호 생성
    const temporaryPassword = generateRandomString(12);

    // 메일 보내기 형식
    const mailOptions = {
      from: SEND_USER,
      to: userEmail,
      subject: "Mingle 임시 비밀번호 발급 이메일입니다.",
      text: `Mingle 임시 비밀번호는 ${temporaryPassword} 입니다. 로그인 후 회원정보 수정에서 새 비밀번호로 수정해 주세요.`,
    };

    // DB 업데이트 프로미스 (암호화된 비밀번호로 업데이트)
    const dbUpdatePromise = await User.findOneAndUpdate(
      { userEmail },
      { userPassword: HmacConvert(temporaryPassword) }
    );

    // 메일 보내기 프로미스
    const mailPromise = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve("Email sent:", info);
        }
      });
    });

    // 메일 보내기와 DB 업데이트를 병렬로 처리 (둘 중 하나라도 실패하면 전체 작업이 실패하도록 Promise.all을 사용!)
    await Promise.all([dbUpdatePromise, mailPromise]);
  } catch (error) {
    throw createError(500);
  }
}

module.exports = { reset };
