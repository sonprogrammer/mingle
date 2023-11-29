import React from 'react';
import { PlaylistRecommendComponent } from '../../components';
import { useGetUserPreference } from '../../hooks';

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

export default function FeedPage() {

  const { data : userPreference } = useGetUserPreference()
  console.log(userPreference)
  


  return (
    <>
    
      <PlaylistRecommendComponent weather="맑은날" playlists={playlistInfo} />
      
      {userPreference?.map((genreData, idx) => {
        const genre = genreData[0]; 
        const playlists = genreData.slice(1); 
        return (
          <PlaylistRecommendComponent key={idx} genre={genre} playlists={playlists} />)})}

    </>
  );
}
