import React from "react";
import { PlaylistCardProps } from "../../types/PlaylistCardProps";
import {
  PlaylistCardContainer,
  ProfileSection,
  ProfileInfo,
  ProfileImage,
  ProfileName,
  AlbumImage,
  ContentSection,
  Title,
  HashtagList,
  Hashtag,
  SocialInfo,
  LikesText,
  StyledHeartOutlined,
  StyledCommentOutlined,
} from "./styles";
export const PlaylistCardComponent: React.FC<PlaylistCardProps> = ({
  profileIcon,
  profileName,
  albumCover,
  title,
  hashtags,
  likes,
}) => {
  return (
    <PlaylistCardContainer>
      <ProfileSection>
        <ProfileInfo>
          <ProfileImage src={profileIcon} alt="Profile" />
          <ProfileName>{profileName}</ProfileName>
        </ProfileInfo>
        <AlbumImage src={albumCover} alt="Album Cover" />
      </ProfileSection>
      <ContentSection>
        <Title>{title}</Title>
        <HashtagList>
          {hashtags.map((tag, index) => (
            <Hashtag key={index}>#{tag}</Hashtag>
          ))}
        </HashtagList>
        <StyledHeartOutlined />
        <StyledCommentOutlined />
        <SocialInfo>
          <LikesText>좋아요: {likes}</LikesText>
        </SocialInfo>
      </ContentSection>
    </PlaylistCardContainer>
  );
};
