import React from "react";
import { PlaylistCardProps } from "../../types/PlaylistCardProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
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
} from "./styles";

export default function PlaylistCardComponent({
  profileIcon,
  profileName,
  albumCover,
  title,
  hashtags,
  likes,
}: PlaylistCardProps) {
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
        <FontAwesomeIcon
          icon={faHeart}
          className="text-purple-500 text-3xl mr-4"
        />
        <FontAwesomeIcon
          icon={faComment}
          className="text-purple-500 text-3xl"
        />
        <SocialInfo>
          <LikesText>좋아요: {likes}개</LikesText>
        </SocialInfo>
      </ContentSection>
    </PlaylistCardContainer>
  );
}
