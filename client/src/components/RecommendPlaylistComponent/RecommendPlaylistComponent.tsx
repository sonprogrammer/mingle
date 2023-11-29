import React from 'react';
import { useNavigate } from 'react-router-dom';
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
}

export default function RecommendPlaylistComponent({
  _id,
  playListImg,
  playListTitle,
  likeCount,
}: RecommendPlaylistComponentProps) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/playlist?id=${_id}`);
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
