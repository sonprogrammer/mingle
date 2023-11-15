import tw from "twin.macro";

export const PlaylistCardContainer = tw.div`flex-col h-max overflow-auto bg-neutral-400 rounded-lg w-1/6`;
export const AlbumImage = tw.img`flex-col w-40 h-40 rounded-lg self-center`;
export const ContentSection = tw.div`flex-col p-4 -ml-2`;
export const Title = tw.h3`text-lg -mt-4 text-white font-semibold`;
export const LikesText = tw.span`font-bold text-black`;
export const SocialInfo = tw.div`mt-2`;
export const ProfileSection = tw.div`flex flex-col items-start p-4`;
