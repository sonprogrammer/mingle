import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import * as Styled from "./styles";

interface PlaylistCardProps {
  profileIcon: string;
  profileName: string;
  albumCover: string;
  title: string;
  hashtags: string[];
  likes: number;
}

export default function PlaylistCardComponent({
  profileIcon,
  profileName,
  albumCover,
  title,
  hashtags,
  likes,
}: PlaylistCardProps) {
  return (
    <Styled.PlaylistCardContainer>
      <Styled.ProfileSection>
        <Styled.ProfileInfo>
          <Styled.ProfileImage src={profileIcon} alt="Profile" />
          <Styled.ProfileName>{profileName}</Styled.ProfileName>
        </Styled.ProfileInfo>
        <Styled.AlbumImage src={albumCover} alt="Album Cover" />
      </Styled.ProfileSection>
      <Styled.ContentSection>
        <Styled.Title>{title}</Styled.Title>
        <Styled.HashtagList>
          {hashtags.map((tag, index) => (
            <Styled.Hashtag key={index}>#{tag}</Styled.Hashtag>
          ))}
        </Styled.HashtagList>
        <FontAwesomeIcon
          icon={faHeart}
          className="text-purple-500 text-3xl mr-4"
        />
        <FontAwesomeIcon
          icon={faComment}
          className="text-purple-500 text-3xl"
        />
        <Styled.SocialInfo>
          <Styled.LikesText>좋아요: {likes}개</Styled.LikesText>
        </Styled.SocialInfo>
      </Styled.ContentSection>
    </Styled.PlaylistCardContainer>
  );
}
