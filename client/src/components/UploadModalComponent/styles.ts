import tw, { styled } from "twin.macro";

export const ContainerStyle = styled.div`
  ${tw`bg-black text-white p-8 rounded-lg max-w-lg mx-auto`}
  overflow-y: auto;
  max-height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const ButtonStyle = styled.button`
  ${tw`bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded`}
`;
export const InputStyle = styled.input`
  ${tw`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow`}
`;

export const FileInputContainerStyle = styled.div`
  ${tw`flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-4 text-center mb-4`}
`;
export const FileInputButtonStyle = styled.button`
  ${tw`mt-2 bg-gray-700 text-white py-2 px-4 rounded-lg font-bold`}
`;

export const FileListStyle = styled.div`
  ${tw`flex justify-between items-center text-sm bg-gray-700 p-2 rounded-lg mb-4`}
`;

export const CoverUploadStyle = styled.div`
  ${tw`flex justify-center items-center bg-gray-700 p-2 rounded-lg mb-4 cursor-pointer`}
`;

export const FormSectionStyle = styled.div`
  ${tw`mb-4`}
`;
export const FormInputContainerStyle = styled.div`
  ${tw`mb-4`}
`;
export const FormLabelStyle = styled.label`
  ${tw`block text-gray-300 text-sm font-bold mb-2`}
`;
export const SelectStyle = styled.select`
  ${tw`border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow`}
`;

export const TagInputContainerStyle = styled.div`
  ${tw`flex flex-wrap items-center`}
`;
export const TagInputStyle = styled.input`
  ${tw`flex-auto border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow`}
`;
