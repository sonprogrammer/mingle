import tw, { styled } from "twin.macro";

export const StyledSearchWrapper = styled.div`
  ${tw`flex w-1/4 mx-auto relative my-6`}
`;

export const StyledSearchInput = styled.input`
  ${tw`w-full px-4 border border-gray-300 rounded-r focus:outline-none focus:border-purple-500`}
  font-size: 16px;
`;

export const StyledSearchButton = styled.button`
  ${tw`absolute right-0 top-0 text-white rounded-l-none rounded-r cursor-pointer`}
  padding: 7px 16px;
  background: #9b59b6;
  &:hover {
    background: #b165cf;
  }
  &:focus {
    background: #9b59b6;
  }
`;

export const StyledSelectWrapper = styled.div`
  ${tw`mx-auto relative`}
`;

export const StyledSelect = styled.select`
  ${tw`text-left text-white rounded-l py-2 pl-4 pr-2 cursor-pointer`}
  font-size: 16px;
  background: #9b59b6;
  outline: none;
`;