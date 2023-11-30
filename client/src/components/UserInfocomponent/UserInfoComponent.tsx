import React, { useState, useEffect } from 'react';
import {
  usePostUserFollow,
  useDeleteUnFollow,
  useGetUserInfo,
} from '../../hooks';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import {
  StyledUserInfo,
  StyledUserImage,
  StyledUserDescript,
  StyledUserSubInfo,
  StyledUserStatus,
  StyledFollower,
  StyledFollowing,
  StyledDivider,
  StyledFollow,
} from './styles';

interface UserInfoComponentProps {
  songUploader: any;
}

export default function UserInfoComponent({
  songUploader,
}: UserInfoComponentProps) {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const followMutation = usePostUserFollow();
  const unfollowMutation = useDeleteUnFollow();
  const [isFollowing, setIsFollowing] = useState(false);
  const { data: userInfo } = useGetUserInfo();
  console.log(userInfo);
  useEffect(() => {
    if (songUploader && userInfo) {
      const isUserFollowing = songUploader.userFollower.includes(
        userInfo.user._id,
      );
      setIsFollowing(isUserFollowing);
    }
  }, [songUploader, userInfo]);
  if (!songUploader) return <div>데이터 에러</div>;

  const handleFollowClick = () => {
    if (typeof userId === 'string') {
      followMutation.mutate(userId, {
        onSuccess: () => {
          setIsFollowing(true);

          queryClient.invalidateQueries(['get-user-info', 'get-song-details']);
        },
        onError: () => {
          alert('팔로우 실패');
        },
      });
    }
  };

  const handleUnfollowClick = () => {
    if (typeof userId === 'string') {
      unfollowMutation.mutate(userId, {
        onSuccess: () => {
          setIsFollowing(false);
          queryClient.invalidateQueries(['get-user-info', 'get-song-details']);
        },
        onError: () => {
          alert('언팔로우 실패');
        },
      });
    }
  };
  return (
    <>
      <StyledUserInfo>
        <StyledUserSubInfo>
          <StyledUserImage
            src={songUploader.userImage || '/img/User-Icon.png'}
            alt="User"
          />
          <StyledUserDescript>
            <h2>{songUploader.userNickname || 'Unknown User'}</h2>
            {isFollowing ? (
              <StyledFollow onClick={handleUnfollowClick}>
                언팔로우
              </StyledFollow>
            ) : (
              <StyledFollow onClick={handleFollowClick}>팔로우</StyledFollow>
            )}
          </StyledUserDescript>
        </StyledUserSubInfo>
        <StyledUserStatus>
          <StyledFollower>
            <p>팔로워: </p>
            <span>{songUploader.userFollow.length || 0}</span>
          </StyledFollower>
          <StyledFollowing>
            <p>팔로잉: </p>
            <span>{songUploader.userFollower.length || 0}</span>
          </StyledFollowing>
        </StyledUserStatus>
      </StyledUserInfo>
      <StyledDivider />
    </>
  );
}
