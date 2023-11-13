import React from "react";
import { PlaylistCardProps } from "../../types/PlaylistCardProps";
import { HeartOutlined, CommentOutlined } from "@ant-design/icons";
import {
  StyledCard,
  PlaylistCardContainer,
  ProfileImage,
  AlbumImage,
  ContentContainer,
  HashtagList,
  Hashtag,
  ProfileNameContainer,
  UserContainer,
  ProfileAndAlbumContainer,
} from "./styles";

export const PlaylistCardComponent: React.FC<PlaylistCardProps> = ({
  profileIcon,
  profileName,
  albumCover,
  title,
  hashtags,
  likes,
}) => {
  return (
    <StyledCard>
      <PlaylistCardContainer>
        <ProfileAndAlbumContainer>
          <UserContainer>
            <ProfileImage src={profileIcon} alt="Profile" />{" "}
            <ProfileNameContainer>{profileName}</ProfileNameContainer>
          </UserContainer>
          <AlbumImage src={albumCover} alt="Album Cover" />
        </ProfileAndAlbumContainer>
        <ContentContainer>
          <h3>{title}</h3>
          <HashtagList>
            {hashtags.map((tag, index) => (
              <Hashtag key={index}>#{tag}</Hashtag>
            ))}
          </HashtagList>
          <HeartOutlined
            style={{ color: "purple", marginRight: 4, fontSize: 30 }}
          />{" "}
          <CommentOutlined style={{ color: "purple", fontSize: 30 }} />
          <div className="social-info">
            <span style={{ fontWeight: "bolder" }}>좋아요: {likes}</span>
          </div>
        </ContentContainer>
      </PlaylistCardContainer>
    </StyledCard>
  );
};
