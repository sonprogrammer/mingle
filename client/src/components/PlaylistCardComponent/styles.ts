import tw, { styled } from "twin.macro";
import { HeartOutlined, CommentOutlined } from "@ant-design/icons";

export const PlaylistCardContainer = tw.div`inline-flex h-max bg-neutral-400 rounded-lg`;
export const ProfileSection = tw.div`flex flex-col items-start p-4`;
export const ProfileInfo = tw.div`flex items-center mb-4`;
export const ProfileImage = tw.img`w-8 h-8 rounded-full mr-2.5 object-cover`;
export const ProfileName = tw.p`text-sm font-black text-slate-900`;
export const AlbumImage = tw.img`w-36 h-36 rounded-lg self-start`;
export const ContentSection = tw.div`flex-grow p-4 -ml-4`;
export const Title = tw.h3`text-lg mt-10 text-black font-semibold`;
export const HashtagList = tw.ul`list-none mt-4 mb-4`;
export const Hashtag = tw.li`inline mr-2 text-gray-600 font-bold`;
export const SocialInfo = tw.div`mt-2`;
export const LikesText = tw.span`font-bold text-black`;

export const StyledHeartOutlined = styled(HeartOutlined)`
  ${tw`text-purple-500 mr-4 mb-1 text-3xl`}
`;
export const StyledCommentOutlined = styled(CommentOutlined)`
  ${tw`text-purple-500 text-3xl`}
`;
