import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart as like } from '@fortawesome/free-solid-svg-icons'
import { faHeart as noLike } from '@fortawesome/free-regular-svg-icons'
import {
  StyledDescriptBox,
  StyledTitle,
  StyledOverTitle,
  StyledDescript,
  StyledTop,
  StyledUserInfo,
  StyledHeart,
  StyledFollow,
  StyledUserImg,
  StyledUserName,
  StyledButton
} from './styles'

interface PlayDescript {
  title: string
  description: string

}

interface User {
  userImg: string
  userName: string
  liked: number
}

interface PlayDescriptAndUser extends User, PlayDescript {}
export default function PlaylistDescriptionComponent({
  title,
  description,
  userImg,
  userName,
  liked,
  
}: PlayDescriptAndUser) {
  const [isLike, setIsLike] = useState(false);
  const [isExpand, setIsExpand] = useState(false);

  const handleClick = () => {
    setIsLike(!isLike)
  }

  const handleExpandClick = () => {
    setIsExpand(!isExpand)
  }
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
                  cursor='pointer'
                />
                <span>{liked}</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={noLike}
                  color={'#9b59b6'}
                  cursor='pointer'
                />
                <span>{liked}</span>
              </>
            )}
          </StyledHeart>
        </StyledTop>

        <StyledTitle>
        <StyledOverTitle isExpand={isExpand}>{title}</StyledOverTitle>
        {title.length > 20  && (
          <>
          <br />
          <StyledButton onClick={handleExpandClick}>{isExpand ? '접기' : '더보기'}</StyledButton>
          </>
        )}
      </StyledTitle>

    
        <StyledDescript>{description}</StyledDescript>
      </StyledDescriptBox>
    </>
  )
}
