const errMessageResouces = require("../../resources/errorMessage.json");
// 라우트 핸들러 함수
function routeHandler(err, req, res, next) {
  console.log(err)
  if (err.message === undefined) {
    res.status(err.code).json({message: errMessageResouces[err.code]})
  }
  else {
    res.status(err.code).json({message: err.message})
  }
}

module.exports= routeHandler;