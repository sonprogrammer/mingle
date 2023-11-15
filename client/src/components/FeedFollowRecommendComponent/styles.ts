import tw from "twin.macro";

export const FeedFollowRecommendContainer = tw.div`flex flex-col items-center bg-slate-950 h-max w-1/2`;
export const ProfileImage = tw.img`w-32 h-32 rounded-full border-4 border-white`;
export const ProfileName = tw.p`text-sm text-white`;
export const PreviewImagesContainer = tw.div`grid grid-cols-3 gap-4`;
export const PreviewImage = tw.img`w-full h-auto rounded-md`;
export const ActionButton = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;
