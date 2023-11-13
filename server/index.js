const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// MongoDB 연결: MongoDB와 연결함
const conn = require('./db/connect.js');
conn.MongoConnect();

// dotenv 설정: 환경변수 로드를 위해 dotenv 설정을 적용
require('dotenv').config();

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server is working : PORT - ", port);
});
