import tw from "twin.macro";

export const PlaylistCardContainer = tw.div`flex h-max bg-white border border-solid border-gray-300 rounded-lg mx-auto my-8 w-max`;
export const ProfileSection = tw.div`flex flex-col items-start p-4 pb-6`;
export const ProfileInfo = tw.div`flex items-center mb-4 cursor-pointer`;
export const ProfileImage = tw.img`w-8 h-8 rounded-full mr-2.5 object-cover`;
export const ProfileName = tw.p`text-sm font-black text-slate-900`;
export const AlbumImage = tw.img`w-36 h-36 rounded-lg self-start`;
export const ContentSection = tw.div`flex-grow p-4 -ml-4 w-[500px]`;
export const Title = tw.h3`text-lg mt-12 mb-8 text-black font-semibold cursor-pointer truncate`;
export const SocialInfo = tw.div`mt-4 flex items-center`;
export const LikesText = tw.span`font-bold text-black`;
export const Description = tw.p`truncate`