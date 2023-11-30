import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as like } from '@fortawesome/free-solid-svg-icons';
import { faHeart as noLike } from '@fortawesome/free-regular-svg-icons';
import {
  StyledDescriptBox,
  StyledTitle,
  StyledOverTitle,
  StyledTop,
  StyledUserInfo,
  StyledHeart,
  StyledFollow,
  StyledUserImg,
  StyledUserName,
  StyledButton,
} from './styles';
import {
  useDeletePlaylistLikeToggle,
  useDeleteUnFollow,
  usePostPlaylistLikeToggle,
  usePostUserFollow,
} from '../../hooks';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface PlayDescript {
  playlistId: string | undefined;
  description: string | undefined;
  isFromMyPage: boolean;
}

interface User {
  userId: string | undefined;
  isFollowing: boolean | undefined;
  userImg: string;
  userName: string | undefined;
  isUserLiked: boolean | undefined;
  likeCount: number | undefined;
}

interface PlayDescriptAndUser extends User, PlayDescript {}
export default function PlaylistDescriptionComponent({
  playlistId,
  description,
  userId,
  isFollowing,
  userImg,
  userName,
  isUserLiked,
  likeCount,
  isFromMyPage,
}: PlayDescriptAndUser) {
  const [isLike, setIsLike] = useState(isUserLiked);
  const [isExpand, setIsExpand] = useState(false);
  const { mutate: likeToggle } = usePostPlaylistLikeToggle(playlistId);
  const { mutate: unLikeToggle } = useDeletePlaylistLikeToggle(playlistId);
  const { mutate: followMutation } = usePostUserFollow();
  const { mutate: unfollowMutation } = useDeleteUnFollow();
  const [isUserFollowing, setIsUserFollowing] = useState(isFollowing);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleFollowClick = () => {
    followMutation(userId as string, {
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
    unfollowMutation(userId as string, {
      onSuccess: () => {
        queryClient.invalidateQueries('get-other-user-info');
        setIsUserFollowing(false);
      },
      onError: () => {
        alert('언팔로우 실패');
      },
    });
  };

  const handleClick = () => {
    setIsLike(!isLike);
    if (!isLike) likeToggle();
    else unLikeToggle();
  };

  const handleExpandClick = () => {
    setIsExpand(!isExpand);
  };
  const handleUserNavigate = (userId: string | undefined) => {
    navigate(`/user?id=${userId}`);
  };
  const OverDescription = isExpand
    ? description
    : description?.slice(0, 20) + '...';
  return (
    <>
      <StyledDescriptBox>
        <StyledTop>
          <StyledUserInfo>
            <StyledUserImg
              src={userImg}
              onClick={() => handleUserNavigate(userId)}
            ></StyledUserImg>
            <StyledUserName onClick={() => handleUserNavigate(userId)}>
              {userName}
            </StyledUserName>
          </StyledUserInfo>

          {!isFromMyPage ? (
            isUserFollowing ? (
              <StyledFollow onClick={handleUnfollowClick}>팔로잉</StyledFollow>
            ) : (
              <StyledFollow onClick={handleFollowClick}>팔로우</StyledFollow>
            )
          ) : null}
          <StyledHeart onClick={handleClick}>
            {isLike ? (
              <>
                <FontAwesomeIcon
                  icon={like}
                  color={'#9b59b6'}
                  cursor="pointer"
                />
                <span>{likeCount}</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={noLike}
                  color={'#9b59b6'}
                  cursor="pointer"
                />
                <span>{likeCount}</span>
              </>
            )}
          </StyledHeart>
        </StyledTop>

        <StyledTitle>
          <StyledOverTitle isExpand={isExpand}>
            {OverDescription}
          </StyledOverTitle>
          {description && description?.length > 20 && (
            <>
              <br />
              <StyledButton onClick={handleExpandClick}>
                {isExpand ? '접기' : '더보기'}
              </StyledButton>
            </>
          )}
        </StyledTitle>
      </StyledDescriptBox>
    </>
  );
}
