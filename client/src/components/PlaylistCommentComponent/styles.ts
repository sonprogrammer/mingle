import tw, { styled } from 'twin.macro';

export const StyledCommentContainer = styled.div`
  ${tw`
        w-full
        flex-col
        mt-10
        ml-8
    `}
  p {
    font-size: 24px;
    margin-left: 20px;
    margin-botton: 10px;
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
        mt-3
    `}
`;
export const StyledUserName = styled.div`
  ${tw`
        text-2xl
        font-bold
        mt-6
        pl-4
    `}
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
    `}
`;

export const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 14px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const StyledTextArea = styled.textarea`
  flex-grow: 1;
  position: relative;
  height: 90px;
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
  position: absolute;
  border: none;
  border-radius: 5px;
  background-color: #9b59b6;
  color: white;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  margin-left: 10px; // 버튼과 입력창 사이의 간격을 추가합니다.

  &:hover {
    background-color: #8e44ad; // 호버 상태일 때의 배경 색상을 변경합니다.
  }

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;
