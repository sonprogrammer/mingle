import React from "react";
import * as Styled from "./styles";
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
    <Styled.FeedFollowRecommendContainer>
      <Styled.ProfileImage src={profilePicture} alt={profileName} />
      <Styled.ProfileName>{profileName}</Styled.ProfileName>
      <Styled.PreviewImagesContainer>
        {pictures.map((picture, index) => (
          <Styled.PreviewImage
            key={index}
            src={picture}
            alt={`Preview ${index + 1}`}
          />
        ))}
      </Styled.PreviewImagesContainer>
      <Styled.RecommendText>{feedRecommendText}</Styled.RecommendText>
      <Styled.FollowButton>{actionText}</Styled.FollowButton>
    </Styled.FeedFollowRecommendContainer>
  );
}
