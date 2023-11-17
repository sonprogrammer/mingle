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
  ${tw`w-full p-2 mb-4 text-lg border rounded-md border-gray-300 focus:border-blue-500 focus:outline-none`}
  background-color: #F2F2F2;
  background-image: url("/client/public/img/view-password.png");
  background-repeat: no-repeat;
  background-position: right 10px center;
  />
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
