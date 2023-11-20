import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faArrowDown } from '@fortawesome/free-solid-svg-icons'
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
            <FontAwesomeIcon icon={faPlus} />
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
          {title.length > 20 ? (
            <>
            <StyledOverTitle>{title}</StyledOverTitle>
            <span onClick={handleExpandClick}>
                {isExpand ? "접기" : "더보기"}
                </span>
            </>
          ) : (
            <span>{title}</span>
          )}
        </StyledTitle>
    
        <StyledDescript>{description}</StyledDescript>
      </StyledDescriptBox>
    </>
  )
}
