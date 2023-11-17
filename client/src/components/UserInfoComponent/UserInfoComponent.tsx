import React, { useState } from 'react'
import {
  UserInfo,
  UserImage,
  UserDescript,
  UserStatus,
  PostCount,
  Follower,
  Following,
  UserImageContainer,
  UserSubInfo,
  Divider,
} from './styles'

interface UserProfileHeaderProps {
  userImage: string
  userName: string
  userDescription: string
  postsCount: number
  followersCount: number
  followingCount: number
}

export default function UserInfoComponent(props: UserProfileHeaderProps) {
  const {
    userImage,
    userName,
    userDescription,
    postsCount,
    followersCount,
    followingCount,
  } = props

  return (
    <>
      <UserInfo>
        <UserSubInfo>
          <UserImageContainer>
            <UserImage src={userImage} alt={'User'} />
          </UserImageContainer>
          <UserDescript>
            <h2>{userName}</h2>
            <EditableText initialText={userDescription} maxLength={20} />
          </UserDescript>
        </UserSubInfo>
        <UserStatus>
          <PostCount>
            <p>게시물 </p>
            <span>{postsCount}</span>
          </PostCount>
          <Follower>
            <p>팔로워 </p>
            <span>{followersCount} </span>
          </Follower>
          <Following>
            <p>팔로잉</p>
            <span>{followingCount}</span>
          </Following>
        </UserStatus>
      </UserInfo>
      <Divider />
    </>
  )
}

interface EditableTextProps {
  initialText: string
  maxLength: number
}

export function EditableText(props: EditableTextProps) {
  const { initialText, maxLength } = props
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(initialText)
  // const inputRef = useRef<HTMLInputElement>(null)

  const handleTextClick = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value.slice(0, maxLength)
    setText(newText)
  }

  const handleInputBlur = () => {
    setIsEditing(false)
  }

  return (
    <div>
      {isEditing ? (
        <input
          type='text'
          value={text}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
        />
      ) : (
        <p onClick={handleTextClick}>{text}</p>
      )}
    </div>
  )
}
