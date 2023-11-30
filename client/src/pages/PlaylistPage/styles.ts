import tw, { styled } from 'twin.macro';

export const Content = styled.div`
  ${tw`flex justify-between items-center`}
  padding: 70px 0;
`;
export const Divider = styled.div`
  ${tw`mx-auto h-[1px]`}
  width: 98%;
  border: 1px solid #ccc;
`;
export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 15%;
  position: relative;
  top: 14.7%;
  left: 20%;
`;
export const ModifyBtn = styled.button`
  color: #9b59b6;
  font-size: 20px;
  font-weight: bold;
  position: relative;
`;
export const DeleteBtn = styled.button`
  color: #9b59b6;
  font-size: 20px;
  font-weight: bold;
`;
export const Text = styled.span`
  color: #9b59b6;
  font-size: 20px;
  font-weight: bold;
`;
