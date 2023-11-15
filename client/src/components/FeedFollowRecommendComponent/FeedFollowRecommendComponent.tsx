import React from "react";
import { FeedFollowRecommendProps } from "../../types/FeedFollowRecommendComponent";
import {
  FeedFollowRecommendContainer,
  ProfileImage,
  ProfileName,
  PreviewImagesContainer,
  PreviewImage,
  ActionButton,
} from "./styles";

export const FeedFollowRecommendComponent: React.FC<
  FeedFollowRecommendProps
> = ({ profileName, profilePicture, pictures, actionText }) => {
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
      <ActionButton>{actionText}</ActionButton>
    </FeedFollowRecommendContainer>
  );
};
