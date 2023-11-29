const errMessageResouces = require("../../resources/errorMessage.json");
// 라우트 핸들러 함수
function routeHandler(err, req, res, next) {
  console.log(err);
  if (err.message === undefined) {
    res.status(err.status).json({ message: errMessageResouces[err.code] });
  } else {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
}

module.exports = routeHandler;
