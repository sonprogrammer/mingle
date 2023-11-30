import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as like } from '@fortawesome/free-solid-svg-icons';
import { faHeart as noLike } from '@fortawesome/free-regular-svg-icons';
import * as Styled from './styles';
import { useNavigate } from 'react-router-dom';
import {
  usePostPlaylistLikeToggle,
  useDeletePlaylistLikeToggle,
} from '../../hooks';

interface PlaylistCardProps {
  playlistId: string | undefined;
  playlistDescription: string;
  userId: string | undefined;
  profileIcon: string;
  profileName: string;
  albumCover: string;
  title: string;
  isUserLiked: boolean;
  likeCount: number;
}

export default function PlaylistCardComponent({
  playlistId,
  playlistDescription,
  userId,
  profileIcon,
  profileName,
  albumCover,
  title,
  isUserLiked,
  likeCount,
}: PlaylistCardProps) {
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(isUserLiked);
  const { mutate: likeToggle } = usePostPlaylistLikeToggle(playlistId);
  const { mutate: unLikeToggle } = useDeletePlaylistLikeToggle(playlistId);
  const handlePlaylistNavigate = () => {
    navigate(`/playlist?id=${playlistId}`, { state: { id: 0 } });
  };
  const handleUserNavigate = () => {
    navigate(`/user?id=${userId}`);
  };
  const handleClick = () => {
    setIsLike(!isLike);
    if (!isLike) likeToggle();
    else unLikeToggle();
  };

  return (
    <Styled.PlaylistCardContainer>
      <Styled.ProfileSection>
        <Styled.ProfileInfo onClick={handleUserNavigate}>
          <Styled.ProfileImage src={profileIcon} alt="Profile" />
          <Styled.ProfileName>{profileName}</Styled.ProfileName>
        </Styled.ProfileInfo>
        <Styled.AlbumImage src={albumCover} alt="Album Cover" />
      </Styled.ProfileSection>
      <Styled.ContentSection>
        <Styled.Title onClick={handlePlaylistNavigate}>{title}</Styled.Title>
        <Styled.Description>{playlistDescription}</Styled.Description>
        <Styled.SocialInfo>
          {isLike ? (
            <FontAwesomeIcon
              onClick={handleClick}
              icon={like}
              className="text-purple-500 text-3xl mr-1 cursor-pointer"
            />
          ) : (
            <FontAwesomeIcon
              onClick={handleClick}
              icon={noLike}
              className="text-purple-500 text-3xl mr-1 cursor-pointer"
            />
          )}

          <Styled.LikesText>{likeCount}</Styled.LikesText>
        </Styled.SocialInfo>
      </Styled.ContentSection>
    </Styled.PlaylistCardContainer>
  );
}
