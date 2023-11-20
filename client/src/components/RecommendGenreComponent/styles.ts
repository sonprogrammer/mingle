import tw, { styled } from "twin.macro";

export const ModalStyle = styled.div`
  ${tw`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
`;

export const ContainerStyle = styled.div`
  ${tw`relative top-20 mx-auto p-5 border w-11/12 md:w-1/3 shadow-lg rounded-md bg-white`}
`;

export const GenreButtonStyle = styled.button`
  ${tw`flex flex-col items-center p-2`}
`;

export const TitleStyle = styled.h2`
  ${tw`text-xl mb-4 font-bold text-center`}
`;

export const GridStyle = styled.div`
  ${tw`grid grid-cols-3 gap-4`}
`;

export const ButtonStyle = styled.button`
  ${tw`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700`}
`;
export const ButtonContainerStyle = styled.div`
  ${tw`flex justify-end mt-4`}
`;
