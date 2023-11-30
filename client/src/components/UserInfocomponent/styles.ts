import tw, { styled } from 'twin.macro';

export const StyledUserInfo = styled.div`
  ${tw`
    flex
    items-center
    px-16
    bg-[#e0e0e0]
    flex-wrap
    justify-between 
    
    `}
`;

export const StyledUserImageContainer = styled.div`
  ${tw`
     
`}
`;

export const StyledUserImage = styled.img`
  ${tw`
    rounded-full
    w-20
    mt-1
 `}
`;

export const StyledUserDescript = styled.div`
  ${tw`
    flex-col
    ml-4
    gap-3
    flex
    mt-6
`}
  h2 {
    ${tw`
        font-bold
        text-2xl
        `}
  }

  input {
    ${tw`
        fixed
        border
        rounded-md
    `}
  }
`;

export const StyledUserSubInfo = styled.div`
  ${tw`
    flex
    ml-6
  `}
`;

export const StyledUserStatus = styled.div`
  ${tw`
    p-4
    flex
    ml-auto
    mt-10
    
    `}
`;

export const StyledPostCount = styled.div`
  ${tw`
    p-4
    flex
    `}
  p {
    margin-right: 4px;
  }
`;

export const StyledFollower = styled.div`
  ${tw`
    p-4
    flex
    `}
  p {
    margin-right: 4px;
  }
`;

export const StyledFollowing = styled.div`
  ${tw`
    p-4
    flex
    `}
  p {
    margin-right: 4px;
  }
`;
export const StyledDivider = styled.div`
  ${tw`ml-[70px] h-[1px]`}
  width: 90%;
  border: 1px solid #ccc;
`;
