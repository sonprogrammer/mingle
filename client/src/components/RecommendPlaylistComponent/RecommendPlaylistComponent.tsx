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

export const RecommendPlaylistComponent: React.FC<RecommendPlaylistProps> = ({
  albumCover,
  title,
  likes,
}) => {
  return (
    <PlaylistCardContainer>
      <ProfileSection>
        <AlbumImage src={albumCover} alt="Album Cover" />
      </ProfileSection>
      <ContentSection>
        <Title>{title}</Title>
        <SocialInfo>
          <LikesText>좋아요: {likes}</LikesText>
        </SocialInfo>
      </ContentSection>
    </PlaylistCardContainer>
  );
};
