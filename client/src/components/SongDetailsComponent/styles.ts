import styled from '@emotion/styled';
import tw from 'twin.macro';

export const PageContainer = styled.div`
  ${tw`h-full text-black`}
`;

export const Header = styled.div`
  ${tw` font-bold  text-gray-700`}
  font-size: 30px;
  padding: 1rem;
`;

export const ContentContainer = styled.div`
  ${tw`flex`}
  border: 2px solid #ccc;
`;

export const ImageSection = styled.div`
  ${tw`w-1/4  flex justify-center items-center`}
  border: 1px solid gray;
`;

export const DetailsSection = styled.div`
  ${tw`flex-grow p-8 flex flex-col justify-around`}
`;

export const SongTitle = styled.h2`
  ${tw`text-4xl`}
  font-weight: 400;
`;

export const ArtistName = styled.h3`
  ${tw`text-xl text-black mb-4`}
`;

export const AdditionalInfo = styled.div`
  ${tw` text-gray-500`}
  font-size: 20px;
`;

export const StyleUploaderInfo = styled.div`
  color: #9b59b6;
  margin-top: 10px;
  font-weight: bolder;
  font-size: 22px;
}}
`;

export const LikeSection = styled.div`
  ${tw`flex items-center mt-14 -mb-2`}
  font-size: 30px;
`;

export const StyleDescriptionSection = styled.div`
  ${tw`flex`}
  padding: 1rem;
`;
