import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostUserFollow, useDeleteUnFollow } from '../../hooks';
import * as Styled from './styles';
interface FeedFollowRecommendProps {
  userId: string;
  profileName: string;
  profilePicture: string;
  pictures: { _id: string; playListImg: string }[];
  feedRecommendText: string;
  isFollowing: boolean | undefined;
}

export default function FeedFollowRecommendComponent({
  userId,
  profileName,
  profilePicture,
  pictures,
  feedRecommendText,
  isFollowing,
}: FeedFollowRecommendProps) {
  const { mutate: followMutation } = usePostUserFollow();
  const { mutate: unfollowMutation } = useDeleteUnFollow();
  const [isUserFollow, setIsFollow] = useState(false);

  const navigate = useNavigate();
  const handleUserNavigate = (userId: string | undefined) => {
    navigate(`/user?id=${userId}`);
  };
  const handlePlaylistNaivgate = (id: string | undefined) => {
    navigate(`/playlist?id=${id}`, { state: { id: 0 } });
  };
  useEffect(() => {
    setIsFollow(isFollowing as boolean);
  }, [isFollowing]);
  const handleFollowClick = () => {
    followMutation(userId, {
      onSuccess: () => {
        setIsFollow(true);
      },
      onError: () => {
        alert('팔로우 실패');
      },
    });
  };
  const handleUnfollowClick = () => {
    unfollowMutation(userId, {
      onSuccess: () => {
        setIsFollow(false);
      },
      onError: () => {
        alert('언팔로우 실패');
      },
    });
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
      {isUserFollow ? (
        <Styled.FollowButton
          onClick={() => {
            handleUnfollowClick();
            setIsFollow(false);
          }}
        >
          팔로잉
        </Styled.FollowButton>
      ) : (
        <Styled.FollowButton
          onClick={() => {
            handleFollowClick();
            setIsFollow(true);
          }}
        >
          팔로우
        </Styled.FollowButton>
      )}
    </Styled.FeedFollowRecommendContainer>
  );
}
