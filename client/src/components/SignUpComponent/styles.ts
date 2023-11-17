import tw, { styled } from "twin.macro";

export const StyleSignUpContainer = styled.div`
  ${tw`flex flex-col items-center w-1/3 ml-auto mr-auto justify-center p-8 bg-white rounded`}
`;

export const StyleServiceName = styled.div`
  ${tw`mb-4 text-center flex`}
  img {
    ${tw`h-12 w-auto`}
  }
  p {
    ${tw`text-2xl font-bold text-gray-800 self-center`}
  }
`;

export const StyleInput = styled.input`
  ${tw`w-full p-2 mb-4 text-lg border rounded-md border-gray-300 focus:border-purple-600 focus:outline-none`}
  background-color: #F2F2F2;
`;
export const StylePasswordToggleIcon = styled.img`
  ${tw`absolute inset-y-0 top-10 right-0 pr-3 flex items-center justify-center`}
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
`;

export const StyleWarningText = styled.p`
  ${tw`flex self-start text-red-500 font-bold -mt-4`};
`;
