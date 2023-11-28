import React from 'react';
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
  if (!songUploader) return <div>데이터 에러</div>;

  return (
    <>
      <StyledUserInfo>
        <StyledUserSubInfo>
          <StyledUserImage
            src={songUploader.userImage || '/img/default-user.jpg'}
            alt="User"
          />
          <StyledUserDescript>
            <h2>{songUploader.userNickName || 'Unknown Uploader'}</h2>
          </StyledUserDescript>
        </StyledUserSubInfo>
        <StyledUserStatus>
          <StyledFollower>
            <p>팔로워: </p>
            <span>{songUploader.followersCount || 0}</span>
          </StyledFollower>
          <StyledFollowing>
            <p>팔로잉: </p>
            <span>{songUploader.followingCount || 0}</span>
          </StyledFollowing>
        </StyledUserStatus>
      </StyledUserInfo>
      <StyledDivider />
    </>
  );
}
