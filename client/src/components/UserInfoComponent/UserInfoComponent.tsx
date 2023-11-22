import React from 'react'
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
} from './styles'
import { EditableText } from './EditableTextProps'


interface UserProfileHeaderProps {
  userImage: string
  userName: string
  userDescription: string
  postsCount: number
  followersCount: number
  followingCount: number
}

export default function UserInfoComponent({
  userImage,
  userName,
  userDescription,
  postsCount,
  followersCount,
  followingCount,
}: UserProfileHeaderProps) {
  return (
    <>
      <StyledUserInfo>
        <StyledUserSubInfo>
          {/* <UserImageContainer> */}
          <StyledUserImage src={userImage} alt={'User'} />
          {/* </UserImageContainer> */}
          <StyledUserDescript>
            <h2>{userName}</h2>
            <EditableText initialText={userDescription} maxLength={20} />
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
  )
}
