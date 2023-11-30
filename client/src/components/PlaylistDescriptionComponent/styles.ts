import tw, { styled } from 'twin.macro';

export const StyledDescriptBox = styled.div`
  ${tw`
        pt-12
        pb-16

    `}
  margin:0 1.5rem;
`;

export const StyledTop = styled.div`
  ${tw`
    flex
    mb-8
  `}
`;
export const StyledUserInfo = styled.div`
  ${tw`
    flex
  `}
`;
export const StyledUserImg = styled.img`
  ${tw`
    w-20
    h-20
    rounded-full
    cursor-pointer
  `}
`;

export const StyledUserName = styled.div`
  ${tw`
  text-2xl
  font-bold
  mt-6
  pl-4
  cursor-pointer
  `}
`;

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
      background-color: #9b59b6;
      color: white;
  
`;
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
`;

export const StyledTitle = styled.div`
  ${tw`
  text-[1.25rem]
  font-bold
  bg-[#cdcdcdcd]
  p-6
  rounded-2xl
  whitespace-nowrap

    `}
`;

export const StyledButton = styled.div`
  ${tw`
      cursor-pointer
      font-black
      ml-1
      text-[#9b59b6]
    `}
`;

export const StyledOverTitle = styled.div<{ isExpand: boolean }>`
  ${tw`
    overflow-hidden
  `}
  ${({ isExpand }) =>
    isExpand ? tw` whitespace-normal` : tw`whitespace-nowrap`}
  line-height:2rem;
  overflow-wrap: break-word;
`;
