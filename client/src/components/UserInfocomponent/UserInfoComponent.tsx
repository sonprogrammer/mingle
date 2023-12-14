import React, { useEffect, useState } from 'react';
import { usePostUserFollow, useDeleteUnFollow } from '../../hooks';

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
  StyledFollow,
  StyledPostCount,
} from './styles';
import { Playlists, User } from '../../types';
import { useQueryClient } from 'react-query';

interface UserInfoComponentProps {
  userId: string;
  playlist: Playlists[] | undefined;
  profile: User | undefined;
  isFollowing: boolean | undefined;
  isLoggedUser: boolean | undefined;
}

export default function UserInfoComponent({
  userId,
  playlist,
  profile,
  isFollowing,
  isLoggedUser,
}: UserInfoComponentProps) {
  const { mutate: followMutation } = usePostUserFollow();
  const { mutate: unfollowMutation } = useDeleteUnFollow();
  const [isUserFollowing, setIsUserFollowing] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    return setIsUserFollowing(isFollowing as boolean);
  }, [isFollowing]);
  const handleFollowClick = () => {
    followMutation(userId, {
      onSuccess: () => {
        queryClient.invalidateQueries('get-other-user-info');
        setIsUserFollowing(true);
      },
      onError: () => {
        alert('팔로우 실패');
      },
    });
  };

  const handleUnfollowClick = () => {
    unfollowMutation(userId, {
      onSuccess: () => {
        queryClient.invalidateQueries('get-other-user-info');
        setIsUserFollowing(false);
      },
      onError: () => {
        alert('언팔로우 실패');
      },
    });
  };
  return (
    <>
      <StyledUserInfo>
        <StyledUserSubInfo>
          <StyledUserImage
            src={`http://localhost:3000/file/profile/${
              profile?.userFile || '1701310949831.png'
            }`}
            alt={'User'}
          />
          <StyledUserDescript>
            <h2>{profile?.userNickname}</h2>
            <span>
              {profile?.userDescription === ''
                ? '자기소개가 없습니다.'
                : profile?.userDescription}
            </span>
            {!isLoggedUser ? (
              isUserFollowing ? (
                <StyledFollow onClick={handleUnfollowClick}>
                  팔로잉
                </StyledFollow>
              ) : (
                <StyledFollow onClick={handleFollowClick}>팔로우</StyledFollow>
              )
            ) : null}
          </StyledUserDescript>
        </StyledUserSubInfo>
        <StyledUserStatus>
          <StyledPostCount>
            <p>게시물 </p>
            <span>{playlist?.length}</span>
          </StyledPostCount>
          <StyledFollower>
            <p>팔로워 </p>
            <span>{profile?.userFollower.length} </span>
          </StyledFollower>
          <StyledFollowing>
            <p>팔로잉</p>
            <span>{profile?.userFollow.length}</span>
          </StyledFollowing>
        </StyledUserStatus>
      </StyledUserInfo>
      <StyledDivider />
    </>
  );
}
