const crypto = require('crypto');

/**
 * 입력된 비밀번호를 Hmac SHA256 방식으로 암호화하는 함수
 * @param {string} password - 암호화할 비밀번호
 * @returns {string} - 암호화된 비밀번호의 16진수 형태
 */
function HmacConvert(password) {
  // crypto 모듈을 사용하여 Hmac SHA256 암호화를 수행한다
  // 'sha256' 알고리즘과 환경 변수로부터 가져온 특정 키를 사용하여 암호화를 진행한다
  // 암호화된 결과를 16진수 형태로 반환한다
  return crypto.createHmac('sha256', process.env.SHA_KEY).update(password).digest('hex');
}

module.exports = HmacConvert;
