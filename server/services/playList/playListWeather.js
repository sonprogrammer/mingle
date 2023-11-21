const playListSchema = require("../../db/models/playListModel");
const createError = require("http-errors");

async function getWeatherPlayList(weatherCode) {
  // 행복한 / 슬픈 / 편안한 / 신나는 / 로맨틱한 / 격정적인
  let mood = null;
  switch (true) {
    case weatherCode >= 200 && weatherCode < 300:
      mood = ["격정적인"];
      break;
    case weatherCode >= 300 && weatherCode < 400:
      mood = ["편안한"];
      break;
    case weatherCode >= 500 && weatherCode < 600:
      mood = ["슬픈"];
      break;
    case weatherCode >= 600 && weatherCode < 700:
      mood = ["로맨틱한"];
      break;
    case weatherCode >= 700 && weatherCode < 800:
      mood = ["편안한"];
      break;
    case weatherCode === 800:
      mood = ["신나는", "행복한"];
      break;
    case weatherCode >= 800 && weatherCode < 900:
      mood = ["편안한"];
      break;
    default:
      throw createError(404, "유효한 weatherId를 입력해 주세요.");
  }

  const playlists = await playListSchema.find({}).populate("playListSongs");
  const filteredPlaylists = [];
  outerLoop: for (let i = 0; i < playlists.length; i++) {
    for (let j = 0; j < playlists[i].playListSongs.length; j++) {
      if (mood.includes(playlists[i].playListSongs[j].songMood)) {
        filteredPlaylists.push(playlists[i]);
        break outerLoop;
      }
    }
    if (filteredPlaylists.length === 10) {
      break;
    }
  }

  return filteredPlaylists;
}

module.exports = { getWeatherPlayList };
