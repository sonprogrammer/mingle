import React from 'react';
import RecommendPlaylistComponent from '../RecommendPlaylistComponent/RecommendPlaylistComponent';
import { StyledContainer, StyledWeatherName, StyledPlaylist } from './styles';



interface WeatherPlaylist {
    albumCover: string;
    title: string;
    hashtags?: string[];
    likes: number;
}

interface WeatherPlaylistRecommendationProps {
  weather: string;
  playlists: WeatherPlaylist[];
}

export default function WeatherPlaylistRecommendationComponent({
  weather,
  playlists,
}: WeatherPlaylistRecommendationProps) {
  return (
    <>
      <StyledContainer>
        <StyledWeatherName>{weather}에 듣기 좋은 노래</StyledWeatherName>
        <StyledPlaylist>
          {playlists.map((playlist, idx) => (
            <RecommendPlaylistComponent
              key={idx}
              albumCover={playlist.albumCover}
              title={playlist.title}
              likes={playlist.likes}
            />
          ))}
        </StyledPlaylist>
      </StyledContainer>
    </>
  );
}
