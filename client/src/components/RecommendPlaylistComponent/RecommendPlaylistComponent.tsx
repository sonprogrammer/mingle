import React from 'react';
import * as Styled from './styles';
interface RecommendPlaylistProps {
  _id: string;
  albumCover: string;
  title: string;
  hashtags?: string[];
  likes: number;
  onClick?: (_id: string) => void;
}

export default function RecommendPlaylistComponent({
  albumCover,
  title,
  likes,
  _id,
  onClick,
}: RecommendPlaylistProps) {
  const handleCardClick = () => {
    if (onClick && _id) {
      onClick(_id);
    } else if (!_id) {
      alert('정보를 불러올 수 없습니다.');
    }
  };
  return (
    <Styled.PlaylistCardContainer onClick={handleCardClick}>
      <Styled.ProfileSection>
        <Styled.AlbumImage src={albumCover} alt="Album Cover" />
      </Styled.ProfileSection>
      <Styled.ContentSection>
        <Styled.Title>{title}</Styled.Title>
        <Styled.SocialInfo>
          <Styled.LikesText>좋아요: {likes}개</Styled.LikesText>
        </Styled.SocialInfo>
      </Styled.ContentSection>
    </Styled.PlaylistCardContainer>
  );
}
