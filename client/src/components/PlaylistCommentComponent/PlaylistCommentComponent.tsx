import React from 'react'
import {
  CommentContainer,
  User,
  UserFunction,
  UserNameAndImg,
  Comment,
  UserImg,
  UserName,
  Correction,
  Delete
} from './styles'

interface Comment {
  userImage: string
  userName: string
  userComment: string
  onEdit?: () => void
  onDelete?: () => void
}

export default function PlaylistCommentComponent(props: Comment) {
  const { userImage, userName, userComment, onEdit, onDelete } = props

  return (
    <CommentContainer>
      <User>
        
        <UserNameAndImg>
          <UserImg src={userImage}></UserImg>
          <UserName>{userName}</UserName>
        </UserNameAndImg>

        <UserFunction>
          <Correction>수정</Correction>
          <Delete>삭제</Delete>
        </UserFunction>
        
      </User>
      <Comment>{userComment}</Comment>
    </CommentContainer>
  )
}
