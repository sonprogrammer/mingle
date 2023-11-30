import tw, { styled } from 'twin.macro';

export const StyleContainer = styled.div`
  ${tw`bg-black text-white p-8 rounded-lg max-w-lg mx-auto w-1/2`}
  overflow-y: auto;
  max-height: 100vh;
  z-index: 1001;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const StyleButton = styled.button`
  ${tw` flex bg-purple-600 hover:bg-purple-800 ml-auto text-white font-bold py-2 px-4 rounded`}
`;
export const StyleInput = styled.input`
  ${tw`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow`}
`;

export const StyleFileInputContainer = styled.div`
  ${tw`flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-4 text-center mb-4 cursor-pointer`}
`;
export const StyleFileInputButton = styled.button`
  ${tw`mt-2 bg-gray-700 text-white py-2 px-4 rounded-lg font-bold cursor-pointer`}
`;

export const StyleFileList = styled.div`
  ${tw`flex justify-between items-center text-sm bg-gray-700 p-2 rounded-lg mb-4`}
`;

export const StyleCoverUpload = styled.div`
  ${tw`flex justify-center items-center bg-gray-700 p-2 rounded-lg mb-4 cursor-pointer`}
`;

export const StyleFormSection = styled.div`
  ${tw`mb-4`}
`;
export const StyleFormInputContainer = styled.div`
  ${tw`mb-4`}
`;
export const StyleFormLabel = styled.label`
  ${tw`block text-gray-300 text-sm font-bold mb-2`}
`;
export const StyleSelect = styled.select`
  ${tw`border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow`}
`;

export const StyleTagInputContainer = styled.div`
  ${tw`flex flex-wrap items-center`}
`;
export const StyleTagInput = styled.input`
  ${tw`flex-auto border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow`}
`;

export const StyleLabel = styled.label`
  ${tw`cursor-pointer`};
  display: block;
`;
export const StyleAddSongContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;
export const StyleToAddSong = styled.li`
  display: flex;
  margin: 10px;
`;
export const StyleSongInfo = styled.span`
  display: flex;
  justify-content: center;
  margin-left: 25px;
  align-items: center;
  flex-wrap: wrap;
`;
export const StyleSongImg = styled.img`
  width: 50px;
  height: 50px;
`;
