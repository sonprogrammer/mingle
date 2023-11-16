import tw from "twin.macro";

export const PlaylistCardContainer = tw.div`flex h-max bg-white border border-solid border-gray-300 rounded-lg mr-auto ml-auto w-max`;
export const ProfileSection = tw.div`flex flex-col items-start p-4`;
export const ProfileInfo = tw.div`flex items-center mb-4`;
export const ProfileImage = tw.img`w-8 h-8 rounded-full mr-2.5 object-cover`;
export const ProfileName = tw.p`text-sm font-black text-slate-900`;
export const AlbumImage = tw.img`w-36 h-36 rounded-lg self-start`;
export const ContentSection = tw.div`flex-grow p-4 -ml-4`;
export const Title = tw.h3`text-lg mt-10 text-black font-semibold`;
export const HashtagList = tw.ul`list-none mt-4 mb-4`;
export const Hashtag = tw.li`inline mr-2 text-gray-600 font-bold`;
export const SocialInfo = tw.div`mt-4`;
export const LikesText = tw.span`font-bold text-black`;
