import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './styles';
interface FeedFollowRecommendProps {
  userId: string;
  profileName: string;
  profilePicture: string;
  pictures: string[];
  actionText: string;
  feedRecommendText: string;
}

export default function FeedFollowRecommendComponent({
  userId,
  profileName,
  profilePicture,
  pictures,
  actionText,
  feedRecommendText,
}: FeedFollowRecommendProps) {
  const navigate = useNavigate();
  const handleUserNavigate = (id: string | undefined) => {
    navigate(`/user/${id}`);
  };
  const handlePlaylistNaivgate = (id: string | undefined) => {
    navigate(`/playlist?id=${id}`, { state: { id: 0 } });
  };
  return (
    <Styled.FeedFollowRecommendContainer>
      <Styled.ProfileImage
        src={
          `http://kdt-sw-6-team09.elicecoding.com/file/profile/${profilePicture}` ||
          'name'
        }
        alt={profileName}
        onClick={() => handleUserNavigate(userId)}
      />
      <Styled.ProfileName onClick={() => handleUserNavigate(userId)}>
        {profileName}
      </Styled.ProfileName>
      <Styled.PreviewImagesContainer>
        {pictures.map((picture, index) => (
          <Styled.PreviewImage
            onClick={() => handlePlaylistNaivgate(picture._id)}
            key={index}
            src={`http://kdt-sw-6-team09.elicecoding.com/file/playListCover/${picture.playListImg}`}
            alt={`Preview ${index + 1}`}
          />
        ))}
      </Styled.PreviewImagesContainer>
      <Styled.RecommendText>{feedRecommendText}</Styled.RecommendText>
      <Styled.FollowButton>{actionText}</Styled.FollowButton>
    </Styled.FeedFollowRecommendContainer>
  );
}
