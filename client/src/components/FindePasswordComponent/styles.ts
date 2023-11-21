import tw, { styled } from 'twin.macro';

export const StyleFormContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-1/3 p-8 rounded`}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e0e0e0;
`;
