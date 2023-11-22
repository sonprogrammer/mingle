import { keyframes } from '@emotion/react';
import tw, { styled } from 'twin.macro';

export const StyleFormContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-1/3 p-8 rounded`}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e0e0e0;
`;

export const StyledButton = styled.button`
  ${tw`p-3 mt-4 w-full text-white rounded-lg`}
  background-color: #9b59b6;
  &:hover {
    opacity: 0.9;
  }
`;
export const StyledCompletionMessage = styled.p`
  ${tw`text-lg font-bold`}
  color: #333;
  margin-top: 20px;
  text-align: center;
`;
const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const StyledImage = styled.img`
  animation: ${fadeIn} 2s;
  width: 250px;
  margin: 0 auto;
  display: block;
`;
