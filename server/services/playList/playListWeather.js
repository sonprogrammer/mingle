const PlayList = require("../../db/models/playListModel");
const createError = require("http-errors");

async function getWeatherPlayList(weatherCode) {
  let matchGenre = null;
  // 발라드/댄스/힙합/록/클래식
  switch (true) {
    // 천둥
    case weatherCode >= 200 && weatherCode < 300:
      matchGenre = ["록", "힙합"];
      break;
    // 이슬비가 내리다
    case weatherCode >= 300 && weatherCode < 400:
      matchGenre = ["클래식", "발라드"];
      break;
    // 비
    case weatherCode >= 500 && weatherCode < 600:
      matchGenre = ["클래식", "발라드"];
      break;
    // 눈
    case weatherCode >= 600 && weatherCode < 700:
      matchGenre = ["발라드", "댄스"];
      break;
    // 대기 (안개, 황사 등등등)
    case weatherCode >= 700 && weatherCode < 800:
      matchGenre = ["힙합"];
      break;
    // 맑은
    case weatherCode == 800:
      matchGenre = ["댄스", "록"];
      break;
    // 구름낀
    case weatherCode >= 800 && weatherCode < 900:
      matchGenre = ["클래식", "발라드"];
      break;
    default:
      throw createError(404, "유효한 weatherId를 입력해 주세요.");
  }

  const weatherPlaylists = await PlayList.find({
    genre: { $in: matchGenre },
  }).limit(4);

  return weatherPlaylists;
}

module.exports = { getWeatherPlayList };
