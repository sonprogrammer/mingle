import React from 'react';
import { PlaylistRecommendComponent } from '../../components';
import { useGetWeatherPlaylist } from '../../hooks/useGetWeatherPlaylist';

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
      <PlaylistRecommendComponent weather='맑음' playlists={playlistInfo}  />
      <PlaylistRecommendComponent genre="댄스" playlists={GenreplaylistInfo} />
    </>
  );
}
