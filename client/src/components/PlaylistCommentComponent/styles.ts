import tw, { styled } from 'twin.macro';

export const StyledCommentContainer = styled.div`
  ${tw`
        w-full
        flex-col
        mt-10
    `}
  p {
    font-size: 24px;
    margin-left: 20px;
    margin-bottom: 16px;
    font-weight: bold;
  }
`;
export const StyledUser = styled.div`
  ${tw`
        flex
    `}
`;

export const StyledUserNameAndImg = styled.div`
  ${tw`
        flex
        w-full
        pl-5
        mt-2
    `}
`;
export const StyledUserName = styled.div`
  ${tw`
        text-xl
        font-bold
        mt-8
        pl-4
    `}
  width:200px;
`;
export const StyledUserImg = styled.img`
  ${tw`
        w-20
    `}
`;
export const StyledCommentAndFunction = styled.div`
  ${tw`
        flex
        justify-between
        w-full
        px-4
        pl-8
        pt-5
        text-xl
    `}
`;

export const StyledUserFunction = styled.div`
  ${tw`
        flex
        mr-16
    `}
`;
export const StyledDelete = styled.div`
  ${tw`
        cursor-pointer 
        pl-2
    `}
`;
export const StyledCorrection = styled.div`
  ${tw`
        cursor-pointer
        pr-2
    `}
`;

export const StyledComment = styled.div`
  ${tw`
        pb-10
        mt-3
    `}
`;

export const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 14px;
  margin-right: 10px;
  margin-bottom: 10px;
  width: calc(100% - 40px);
`;

export const StyledTextArea = styled.textarea`
  flex-grow: 1;
  position: relative;
  height: 60px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #9b59b6;
  }

  &::placeholder {
    color: #aaa;
  }

  &:disabled {
    background-color: #f9f9f9;
    color: #ccc;
  }
`;

export const StyledButton = styled.button`
  padding: 10px 15px;
  height: 60px;
  border: none;
  border-radius: 5px;
  background-color: #9b59b6;
  color: white;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  margin-left: 10px;

  &:hover {
    background-color: #8e44ad;
  }

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;
