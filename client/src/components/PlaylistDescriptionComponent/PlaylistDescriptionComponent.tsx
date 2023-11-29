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
  usePostPlaylistLikeToggle,
} from '../../hooks';

interface PlayDescript {
  playlistId: string | undefined;
  description: string | undefined;
}

interface User {
  userImg: string;
  userName: string | undefined;
  isUserLiked: boolean | undefined;
  likeCount: number | undefined;
}

interface PlayDescriptAndUser extends User, PlayDescript {}
export default function PlaylistDescriptionComponent({
  playlistId,
  description,
  userImg,
  userName,
  isUserLiked,
  likeCount,
}: PlayDescriptAndUser) {
  const [isLike, setIsLike] = useState(isUserLiked);
  const [isExpand, setIsExpand] = useState(false);
  const { mutate: likeToggle } = usePostPlaylistLikeToggle(playlistId);
  const { mutate: unLikeToggle } = useDeletePlaylistLikeToggle(playlistId);
  const handleClick = () => {
    setIsLike(!isLike);
    if (!isLike) likeToggle();
    else unLikeToggle();
  };

  const handleExpandClick = () => {
    setIsExpand(!isExpand);
  };

  const OverDescription = isExpand
    ? description
    : description?.slice(0, 20) + '...';
  return (
    <>
      <StyledDescriptBox>
        <StyledTop>
          <StyledUserInfo>
            <StyledUserImg src={userImg}></StyledUserImg>
            <StyledUserName>{userName}</StyledUserName>
          </StyledUserInfo>

          <StyledFollow>
            <span>팔로우</span>
          </StyledFollow>

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
