// .env 파일에서 환경 변수를 로드하고 설정한다
require('dotenv').config()
// 몽고디비와 상호작용하기 위한 몽구스 라이브러리를 가져온다
const mongoose = require('mongoose');
// 몽고디비 URI를 구성한다. DB_PASSWORD는 .env 파일에서 가져온다
const mongodbUri = `${process.env.DB_URI}`

// MongoConnect 함수를 내보낸다
module.exports = { MongoConnect };

// 몽고디비에 연결하기 위한 비동기 함수를 정의
async function MongoConnect(){
  // 몽고디비에 URI를 사용하여 연결을 시도하고 성공하면 로그를 출력한다
   await mongoose.connect(mongodbUri).then(() => {
      console.log("mongo connect")
   }).catch(err => {
    // 연결 실패 시 에러를 출력
    console.log(err)
   })
}

// 몽고디비 연결 시 발생하는 에러를 처리하는 이벤트 리스너를 추가한다
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

// 몽고디비 연결이 끊겼을 때 재시도하는 이벤트 리스너를 추가한다
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  MongoConnect(); // 연결 재시도
});
