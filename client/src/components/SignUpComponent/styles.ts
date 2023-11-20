import tw, { styled } from 'twin.macro';

export const StyleSignUpContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-1/3 p-8 rounded`}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e0e0e0;
`;

export const StyleServiceName = styled.div`
  ${tw`mb-4 text-center flex `}
  img {
    ${tw`h-36 w-auto`}
  }
`;

export const StyleInput = styled.input`
  ${tw`w-full p-2 mb-4 text-lg border rounded-md border-gray-300 focus:border-purple-600 focus:outline-none`}
  background-color: #F2F2F2;
`;
export const StylePasswordToggleIcon = styled.img`
  ${tw`absolute inset-y-0 top-12 right-0 pr-3 flex items-center justify-center`}
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const StyleButton = styled.button`
  ${tw`w-full py-2 mt-4 bg-purple-600 text-white font-bold rounded hover:bg-purple-800`}
`;

export const StyleText = styled.p`
  ${tw`flex self-start`}
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

export const StyleWarningText = styled.p`
  ${tw`flex self-start text-red-500 font-bold -mt-4`};
`;

export const StyledTextWrapper = styled.div`
  ${tw`flex gap-[10px] items-center`}
  align-self:flex-start;
`;

export const StyledTextButton = styled.div`
  ${tw`font-bold cursor-pointer`}
  color: #9b59b6;
`;

export const StyledChoiceButton = styled.button`
  ${tw`py-1 px-2  text-gray-500 rounded-full hover:bg-gray-300`}
`;
