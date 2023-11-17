import React from "react";
import {
  FeedFollowRecommendContainer,
  ProfileImage,
  ProfileName,
  PreviewImagesContainer,
  PreviewImage,
  FollowButton,
  RecommendText,
} from "./styles";
interface FeedFollowRecommendProps {
  profileName: string;
  profilePicture: string;
  pictures: string[];
  actionText: string;
  feedRecommendText: string;
}

export default function FeedFollowRecommendComponent({
  profileName,
  profilePicture,
  pictures,
  actionText,
  feedRecommendText,
}: FeedFollowRecommendProps) {
  return (
    <FeedFollowRecommendContainer>
      <ProfileImage src={profilePicture} alt={profileName} />
      <ProfileName>{profileName}</ProfileName>
      <PreviewImagesContainer>
        {pictures.map((picture, index) => (
          <PreviewImage
            key={index}
            src={picture}
            alt={`Preview ${index + 1}`}
          />
        ))}
      </PreviewImagesContainer>
      <RecommendText>{feedRecommendText}</RecommendText>
      <FollowButton>{actionText}</FollowButton>
    </FeedFollowRecommendContainer>
  );
}
