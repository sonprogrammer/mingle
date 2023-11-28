import React from 'react';
import {
  PlaylistCardContainer,
  ProfileSection,
  AlbumImage,
  ContentSection,
  Title,
  SocialInfo,
  LikesText,
} from './styles';

interface RecommendPlaylistComponentProps {
  playlist: {
    _id: string;
    playListSongs: string[];
    playListTitle: string;
    playListExplain: string;
    playListOwner: string;
    playListImg: string;
    playListComments: string[];
    likedByUser: boolean;
    likeCount: number;
  };
  onClick?: (_id: string) => void;
}

export default function RecommendPlaylistComponent({
  playlist,
  onClick,
}: RecommendPlaylistComponentProps) {
  const handleCardClick = () => {
    if (onClick && playlist._id) {
      onClick(playlist._id);
    } else if (!playlist._id) {
      alert('정보를 불러올 수 없습니다.');
    }
  };
  return (
    <PlaylistCardContainer onClick={handleCardClick}>
      <ProfileSection>
        <AlbumImage src={playlist.playListImg} alt="Album Cover" />
      </ProfileSection>
      <ContentSection>
        <Title>{playlist.playListTitle}</Title>
        <SocialInfo>
          <LikesText>좋아요: {playlist.likeCount}개</LikesText>
        </SocialInfo>
      </ContentSection>
    </PlaylistCardContainer>
  );
}
