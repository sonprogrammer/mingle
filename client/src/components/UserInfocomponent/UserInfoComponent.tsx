import React, { useState } from 'react';
import { usePostUserFollow, useDeleteUnFollow } from '../../hooks';
import { useParams } from 'react-router-dom';

import {
  StyledUserInfo,
  StyledUserImage,
  StyledUserDescript,
  StyledUserSubInfo,
  StyledUserStatus,
  /* StyledPostCount, 게시물 갯수 스타일 */
  StyledFollower,
  StyledFollowing,
  StyledDivider,
} from './styles';

interface UserInfoComponentProps {
  songUploader: any;
}

export default function UserInfoComponent({
  songUploader,
}: UserInfoComponentProps) {
  const { userId } = useParams();
  const followMutation = usePostUserFollow();
  const unfollowMutation = useDeleteUnFollow();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  if (!songUploader) return <div>데이터 에러</div>;

  const handleFollowClick = () => {
    if (typeof userId === 'string') {
      followMutation.mutate(userId, {
        onSuccess: () => {
          setIsFollowing(true);
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);
        },
        onError: () => {
          alert('팔로우 실패');
        },
      });
    } else {
      console.error('유효하지 않은 사용자 ID');
    }
  };

  const handleUnfollowClick = () => {
    if (typeof userId === 'string') {
      unfollowMutation.mutate(userId, {
        onSuccess: () => {
          setIsFollowing(false);
        },
        onError: () => {
          alert('언팔로우 실패:');
        },
      });
    } else {
      console.error('유효하지 않은 사용자 ID');
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
            <h2>{songUploader.userNickName || 'Unknown User'}</h2>
            {isFollowing ? (
              <button onClick={handleUnfollowClick} style={{ display: 'flex' }}>
                언팔로우
              </button>
            ) : (
              <button onClick={handleFollowClick} style={{ display: 'flex' }}>
                팔로우
              </button>
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
