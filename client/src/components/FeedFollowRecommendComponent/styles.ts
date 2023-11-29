import tw, { styled } from "twin.macro";

export const FeedFollowRecommendContainer = tw.div`flex flex-col items-center border p-14 border-solid border-gray-300 bg-white h-max w-1/3 mx-5 border-2 border-gray-200 my-10`;
export const ProfileImage = tw.img`w-28 h-28 rounded-full mb-2`;
export const ProfileName = styled.p`
  ${tw`text-lg mb-2`}
  color: #333;
`;
export const PreviewImagesContainer = tw.div`grid grid-cols-3 gap-1`;
export const PreviewImage = tw.img`w-full h-auto rounded-md`;
export const RecommendText = tw.p`text-sm mt-6 -mb-2 text-gray-500`;
export const FollowButton = tw.button`bg-purple-600 hover:bg-purple-800 text-white font-bold mt-4 py-2 px-28 mb-4 rounded-xl`;
