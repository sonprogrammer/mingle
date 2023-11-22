const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return next(createError(400, 'Refresh Token이 제공되지 않았습니다.'));
    }
    try {
      const decoded = jwt.verify(refreshToken, process.env.SHA_KEY);
      req.user = decoded; 
      next();
    } catch (error) {
      next(createError(401, 'Refresh Token이 유효하지 않습니다.'));
    }
  };

  module.exports = verifyRefreshToken;