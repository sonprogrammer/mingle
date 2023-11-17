import React from "react";
import {
  PlaylistCardContainer,
  ProfileSection,
  AlbumImage,
  ContentSection,
  Title,
  LikesText,
  SocialInfo,
} from "./styles";

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
    <PlaylistCardContainer>
      <ProfileSection>
        <AlbumImage src={albumCover} alt="Album Cover" />
      </ProfileSection>
      <ContentSection>
        <Title>{title}</Title>
        <SocialInfo>
          <LikesText>좋아요: {likes}개</LikesText>
        </SocialInfo>
      </ContentSection>
    </PlaylistCardContainer>
  );
}
