import tw, { styled } from 'twin.macro';

export const StyledLoginWrapper = styled.div`
  ${tw`flex flex-col items-center justify-center w-1/3 p-8 rounded`}
  margin-top: 80px;
  background-color: #e0e0e0;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100vh;
`;
export const StyledHelpWrapper = styled.div`
  ${tw`flex justify-between w-full`}
`;
export const StyledLabel = styled.label`
  ${tw`relative inline-flex items-center cursor-pointer gap-[8px]`}
  .span {
    ${tw`ms-2 text-sm font-medium text-gray-900 dark:text-gray-300`}
  }
`;
export const StyledTextWrapper = styled.div`
  ${tw`flex gap-[10px] items-center`}
  justify-content:space-between
    color:#9b59b6
`;
export const Divider = styled.div`
  ${tw`h-[20px]`}
  width: 1px;
  border: 1px solid #ccc;
`;
export const StyledTextButton = styled.div`
  ${tw`font-bold cursor-pointer`}
  color: #9b59b6;
`;
export const StyledCheckbox = styled.input`
  ${tw`sr-only`}
`;
export const StyledCheckboxChildren = styled.div`
  ${tw`w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600`}
`;
