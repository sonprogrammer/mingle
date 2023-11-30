import tw, { styled } from 'twin.macro';

export const StyledUploadButton = styled.button`
  ${tw` flex my-5 text-white focus:outline-none focus:ring-4 focus:ring-purple-300 font-bold rounded-full text-lg px-2 py-2.5`}
  background-color: #9b59b6;
  width: 100px;
  justify-content: center;
  position: fixed;
  bottom: 12%;
  left: 78%;
  z-index: 100;
  &:hover {
    opacity: 90%;
  }
`;
