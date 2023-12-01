import React from 'react';
import { PlaylistRecommendComponent } from '../../components';
import { useGetUserPreference } from '../../hooks';



export default function FeedPage() {
  const { data: userPreference, isLoading } = useGetUserPreference();

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  const [randomType, playlists] = userPreference;

  return (
    <>
      {randomType === 'random' ? (
        <>
          <PlaylistRecommendComponent
            genre="랜덤"
            playlists={playlists}
          />
        </>
      ) : (
        userPreference.map((playlist)=>{

          return(
          <PlaylistRecommendComponent
            key={playlist.id}
            genre={playlist[0]}
            playlists={playlist.slice(1)}
          />)
        }))}
        </>
  );
}
