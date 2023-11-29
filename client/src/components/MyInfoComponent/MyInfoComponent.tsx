import React, { useState } from 'react';
import {
  StyledUserInfo,
  StyledUserImage,
  StyledUserDescript,
  StyledUserStatus,
  StyledPostCount,
  StyledFollower,
  StyledFollowing,
  StyledUserSubInfo,
  StyledDivider,
} from './styles';
import { EditableText } from './EditableTextProps';
import { UserInfo } from '../../types';

interface UserProfileHeaderProps {
  userImage: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  onUpdate: (updatedInfo: Partial<UserInfo>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  profile: UserInfo;
}

export default function MyInfoComponent({
  profile,
  userImage,
  postsCount,
  followersCount,
  followingCount,
  onUpdate,
}: UserProfileHeaderProps) {
  const [statusMessage, setStatusMessage] = useState(
    profile?.userDescription || '20자 이내로 입력하시오.',
  );

  const handleStatusUpdate = async (updatedText: string) => {
    onUpdate({ userDescription: updatedText });
  };

  //이미지 경로 생성
  const imageUrl = `http://kdt-sw-6-team09.elicecoding.com/file/profile/${profile.userFile}`
  return (
    <>
      <StyledUserInfo>
        <StyledUserSubInfo>
          {/* <UserImageContainer> */}
          <StyledUserImage src={imageUrl} alt={'User'} />
          {/* </UserImageContainer> */}
          <StyledUserDescript>
            <h2>{profile?.userNickname}</h2>
            <EditableText
              initialText={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              onSave={(updatedText) => handleStatusUpdate(updatedText)}
              maxLength={20}
            />
          </StyledUserDescript>
        </StyledUserSubInfo>
        <StyledUserStatus>
          <StyledPostCount>
            <p>게시물 </p>
            <span>{postsCount}</span>
          </StyledPostCount>
          <StyledFollower>
            <p>팔로워 </p>
            <span>{followersCount} </span>
          </StyledFollower>
          <StyledFollowing>
            <p>팔로잉</p>
            <span>{followingCount}</span>
          </StyledFollowing>
        </StyledUserStatus>
      </StyledUserInfo>
      <StyledDivider />
    </>
  );
}
