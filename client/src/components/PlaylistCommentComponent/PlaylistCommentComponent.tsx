import React,{useState} from 'react'
import {
  StyledCommentContainer,
  // StyledUser,
  StyledUserFunction,
  StyledUserNameAndImg,
  StyledComment,
  StyledUserImg,
  StyledUserName,
  StyledCorrection,
  StyledCommentAndFunction,
  StyledDelete,
} from './styles'

interface Comment {
  userImage: string
  userName: string
  userComment: string
  currentUser: string
}

export default function PlaylistCommentComponent({
  userImage,
  userName,
  userComment,
  currentUser
}: Comment) {
  
  return (
    <StyledCommentContainer>
      <p>댓글</p>
      <StyledUserNameAndImg>
        <StyledUserImg src={userImage}></StyledUserImg>
        <StyledUserName>{userName}</StyledUserName>
      </StyledUserNameAndImg>

      <StyledCommentAndFunction>
        <StyledComment>{userComment}</StyledComment>
        {userName === currentUser && (
        <StyledUserFunction>
          <StyledCorrection>수정</StyledCorrection>
          <span>|</span>
          <StyledDelete>삭제</StyledDelete>
        </StyledUserFunction>
        ) }
      </StyledCommentAndFunction>
    </StyledCommentContainer>
  )
}
