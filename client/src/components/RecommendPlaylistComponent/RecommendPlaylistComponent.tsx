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
  _id: string;
  playListSongs?: string[];
  playListTitle: string;
  playListExplain?: string;
  playListOwner?: string;
  playListImg: string;
  playListComments?: string[];
  likedByUser?: boolean;
  likeCount: number;
  onClick?: (_id: string) => void;
}

export default function RecommendPlaylistComponent({
  _id,
  playListImg,
  playListTitle,
  likeCount,
  onClick,
}: RecommendPlaylistComponentProps) {
  const handleCardClick = () => {
    if (onClick && _id) {
      onClick(_id);
    } else if (!_id) {
      alert('정보를 불러올 수 없습니다.');
    }
  };
  return (
    <PlaylistCardContainer onClick={handleCardClick}>
      <ProfileSection>
        <AlbumImage src={playListImg} alt="Album Cover" />
      </ProfileSection>
      <ContentSection>
        <Title>{playListTitle}</Title>
        <SocialInfo>
          <LikesText>좋아요: {likeCount ?? 0}개</LikesText>
        </SocialInfo>
      </ContentSection>
    </PlaylistCardContainer>
  );
}
