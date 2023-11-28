import React from 'react';
import { useGetSongUploader } from '../../hooks';
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
  songId: string;
}

export default function UserInfoComponent({ songId }: UserInfoComponentProps) {
  const { data: userDetails, isLoading, isError } = useGetSongUploader(songId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !userDetails) return <div>데이터 에러</div>;

  return (
    <>
      <StyledUserInfo>
        <StyledUserSubInfo>
          <StyledUserImage src={'/img/user.png'} alt={'User'} />
          <StyledUserDescript>
            <h2>{userDetails.userNickName}</h2>
          </StyledUserDescript>
        </StyledUserSubInfo>
        <StyledUserStatus>
          <StyledFollower>
            <p>팔로워: </p>
            <span>1</span>
          </StyledFollower>
          <StyledFollowing>
            <p>팔로잉: </p>
            <span>1</span>
          </StyledFollowing>
        </StyledUserStatus>
      </StyledUserInfo>
      <StyledDivider />
    </>
  );
}
