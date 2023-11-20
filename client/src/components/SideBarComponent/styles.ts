import tw, { styled } from "twin.macro";

export const StyledNav = styled.nav`
  ${tw`
    fixed
    left-0
    top-[50px]
    bg-[#404040]
    box-border
    text-white
    h-full
    border-r-indigo-500
    z-40
  `}

`;

export const StyledLogo = styled.div`
  ${tw`
    text-4xl
    font-semibold
  `}
`;

export const StyledDivideLine = styled.div`
  ${tw`
    flex items-center justify-center h-[201px] border-b
  `}
`;

export const StyledButtonsContainer = styled.div`
  ${tw`
    flex 
    flex-col 
    mt-4
    cursor-pointer

  `}
`;

export const StyledButtonWrapper = styled.div`
  ${tw`
    // flex
    // items-center space-x-3
  `}
  // width: 16rem;
`;

export const StyledButton = styled.div`
  ${tw`
    flex
     space-x-3
      p-2
    hover:bg-zinc-900 
    hover:border-slate-400 
    transition duration-300
    ease-in-out
    transform hover:scale-105
    pl-4
    py-4
    relative
  `}
  width: 16rem;

  img{
    width: 20px;
  }
  &:hover {
    .additional-buttons {
      opacity: 1; 
      visibility: visible;
      transform: translateY(0);
    }
  }
`;

export const StyledDropdownButton = styled.div`
  ${tw`
    flex
    cursor-pointer 
  `}
`;

export const StyledDropeddown = styled.div`
  ${tw`
   flex-col rounded-lg w-full
   bg-zinc-600
  `}
  transition: transform 0.3s ease-in-out;
  
`;

export const StyledDropeddownContents = styled.div`
  ${tw`
    flex 
    p-2
    space-x-3
    pl-6
    hover:bg-zinc-900 
    hover:border-slate-400  
    transition duration-300
    ease-in-out
    transform hover:scale-105
    cursor-pointer rounded-r-lg border-l-transparent
  

  `}
  width: 16rem;
  span{
    
  }
`;

export const StyledLogoutModal = styled.div`
  ${tw`
    
    flex
    justify-center
    items-center
  `}


`
export const StyledLogoutModalContainer = styled.div`
    ${tw`
    fixed top-0 left-0 w-full h-full flex justify-center 
    items-center bg-black bg-opacity-50
    z-40

    `};

    `

    export const StyledLogoutModalContent = styled.div`
  ${tw`
  bg-[#bebebe] p-8 rounded shadow-md
  `
}
  p{
    color: black;
  }
  z-index: 1000;
  
`

export const StyledButtons = styled.div`
  ${tw`
    flex
    justify-center
    mt-2
    
  `}

  button {
    ${tw`
      px-4
      py-2
      transition-all
      duration-300
      rounded-md
      font-semibold
    `}

    &:first-child {
      ${tw`
        mr-4
        text-red-500

      `}
    }

    &:hover {
      ${tw`
        transform
        scale-105
      `}
    }

    &:first-child:hover {
      ${tw`
        bg-red-500
        text-white
      `}
    }

    &:last-child:hover {
      ${tw`
        bg-black
        text-white
      `}
    }
  }
`;
