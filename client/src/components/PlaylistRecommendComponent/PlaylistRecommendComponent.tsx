import React from 'react';
import { Playlists } from '../../types';
import { StyledChartTitle } from '../ChartComponent/styles';
import { RecommendPlaylistComponent } from '../RecommendPlaylistComponent';
import { StyledContainer, StyledGenreName, StyledPlaylist } from './styles';

interface PlaylistRecommendComponentProps {
  weather?: string;
  genre?: string;
  search?: string;
  playlists: Playlists[] | undefined;
  isMypage: boolean;
}

export default function PlaylistRecommendComponent({
  weather,
  genre,
  search,
  playlists,
}: PlaylistRecommendComponentProps) {
  return (
    <>
      {genre && (
        <StyledGenreName>{genre}음악 추천 플레이리스트</StyledGenreName>
      )}
      {weather && (
        <StyledGenreName>{weather} 날씨에 듣기 좋은 노래</StyledGenreName>
      )}
      {search && <StyledChartTitle isGenre={false}>{search}</StyledChartTitle>}
      <StyledContainer>
        <StyledPlaylist>
          {playlists && playlists?.length > 0 ? (
            playlists?.map((playlist) => (
              <RecommendPlaylistComponent
                key={playlist._id}
                _id={playlist._id}
                playListImg={playlist.playListImg}
                playListTitle={playlist.playListTitle}
                likeCount={playlist.likeCount}
              />
            ))
          ) : (
            <>일치하는 검색 결과가 없습니다.</>
          )}
        </StyledPlaylist>
      </StyledContainer>
    </>
  );
}
