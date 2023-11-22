import React from "react";
import { WeatherPlaylistRecommendationComponent } from "../../components";
import { GenrePlaylistRecommendationComponent } from "../../components"


const playlistInfo = [
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 111,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 333,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 555,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 777,
  },
];
const GenreplaylistInfo = [
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 222,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 444,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 666,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 888,
  },
];


export default function FeedPage() {
  return (
    <>
      <WeatherPlaylistRecommendationComponent weather={"맑은날"} playlists={playlistInfo}/>
      <GenrePlaylistRecommendationComponent Genre={"댄스"} playlists={GenreplaylistInfo}/>
      </>
  );
}
