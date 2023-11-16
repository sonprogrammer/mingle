import React from "react";
import { RecommendPlaylistProps } from "../../types/RecommendPlaylistProps";
import {
  PlaylistCardContainer,
  ProfileSection,
  AlbumImage,
  ContentSection,
  Title,
  LikesText,
  SocialInfo,
} from "./styles";

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
