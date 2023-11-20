import React from "react";
import * as Styled from "./styles";

interface RecommendPlaylistProps {
  albumCover: string;
  title: string;
  hashtags?: string[];
  likes: number;
}

export default function RecommendPlaylistComponent({
  albumCover,
  title,
  likes,
}: RecommendPlaylistProps) {
  return (
    <Styled.PlaylistCardContainer>
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
