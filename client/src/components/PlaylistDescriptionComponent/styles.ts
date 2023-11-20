import tw, { styled } from 'twin.macro'

export const StyledDescriptBox = styled.div`
  ${tw`
        pt-12
        ml-10
        pb-16

    `}
`

export const StyledTop = styled.div`
  ${tw`
    flex
    mb-8
  `}
`
export const StyledUserInfo = styled.div`
  ${tw`
    flex
  `}
`
export const StyledUserImg = styled.img`
  ${tw`
    w-20
  `}
`

export const StyledUserName = styled.div`
  ${tw`
  text-2xl
  font-bold
  mt-6
  pl-4
  `}
`

export const StyledFollow = styled.div`
  ${tw`
  flex items-center	justify-center rounded-full w-24 px-2 cursor-pointer
  ml-10 h-12 mt-4 
  font-semibold
  `}
  background-color: #ffffff;
  color: #7f7f7f;
  gap: 4px;
  &:hover {
      opacity: 90%;
  
`
export const StyledHeart = styled.div`
  ${tw`
  flex
    ml-auto
    pr-5
    mt-6
  `}
  svg {
    ${tw`
      w-8
      h-8
    `}
  }
  span{
    padding-left: 10px;
    color: #9b59b6;
    font-weight: 900;
    font-size: 18px;
    mt-3
  }
`

export const StyledTitle = styled.div`
  ${tw`
      flex
  text-2xl
  font-bold
  bg-[#cdcdcdcd]
  p-6
  rounded-2xl
  whitespace-nowrap
  h-80
    `}
`

export const StyledButton = styled.div`
    ${tw`
      cursor-pointer
      ml-2
      text-[#9b59b6]
    `}
`

export const StyledOverTitle = styled.div<{isExpand: boolean}>`
  ${tw`
    whitespace-nowrap
    overflow-hidden
    overflow-ellipsis
    flex-grow
  `}
  ${({ isExpand}) => isExpand && tw` whitespace-normal`}
  line-height:2rem;
`

export const StyledDescript = styled.div`
  ${tw`
        text-2xl
        mt-8
        bg-[#cdcdcdcd]
        p-6
        rounded-2xl
    `}
`
