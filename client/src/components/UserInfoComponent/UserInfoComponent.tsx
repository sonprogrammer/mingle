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
  userName: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  onUpdate: (updatedInfo: Partial<UserInfo>) => void;
  userDescription: string;
}

export default function UserInfoComponent({
  userImage,
  userName,
  userDescription,
  postsCount,
  followersCount,
  followingCount,
  onUpdate,
}: UserProfileHeaderProps) {
  const [statusMessage, setStatusMessage] = useState(userDescription);

  const handleStatusUpdate = () => {
    onUpdate({ userDescription: statusMessage });
  };
  return (
    <>
      <StyledUserInfo>
        <StyledUserSubInfo>
          {/* <UserImageContainer> */}
          <StyledUserImage src={userImage} alt={'User'} />
          {/* </UserImageContainer> */}
          <StyledUserDescript>
            <h2>{userName}</h2>
            <EditableText
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              onSave={handleStatusUpdate}
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
