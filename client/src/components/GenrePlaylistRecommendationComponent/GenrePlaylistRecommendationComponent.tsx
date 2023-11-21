import React from "react";
import RecommendPlaylistComponent from '../RecommendPlaylistComponent/RecommendPlaylistComponent';
import { StyledContainer, StyledGenreName, StyledPlaylist } from './styles';



interface WeatherPlaylist {
    albumCover: string;
    title: string;
    hashtags?: string[];
    likes: number;
}

interface WeatherPlaylistRecommendationProps {
  Genre: string;
  playlists: WeatherPlaylist[];
}

export default function WeatherPlaylistRecommendationComponent({
    Genre,
  playlists,
}: WeatherPlaylistRecommendationProps) {
  return (
    <>
      <StyledContainer>
        <StyledGenreName>{Genre}음악 추천 플레이리스트</StyledGenreName>
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
