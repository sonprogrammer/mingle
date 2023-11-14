import React from "react";
import { PlaylistCardProps } from "../../types/PlaylistCardProps";
import { HeartOutlined, CommentOutlined } from "@ant-design/icons";

export const PlaylistCardComponent: React.FC<PlaylistCardProps> = ({
  profileIcon,
  profileName,
  albumCover,
  title,
  hashtags,
  likes,
}) => {
  return (
    <div className="flex h-max bg-neutral-400 rounded-lg">
      <div className="flex flex-col items-start p-4">
        <div className="flex items-center mb-4">
          <img
            src={profileIcon}
            alt="Profile"
            className="w-6 h-6 rounded-full mr-2.5 object-cover"
          />
          <p className="text-sm font-black text-slate-950">{profileName}</p>
        </div>
        <img
          src={albumCover}
          alt="Album Cover"
          className="w-36 h-36 rounded-lg self-start"
        />
      </div>
      <div className="flex-grow p-4 -ml-4">
        <h3 className="text-lg mt-10 text-black font-semibold">{title}</h3>
        <ul className="list-none mt-4 mb-4">
          {hashtags.map((tag, index) => (
            <li key={index} className="inline mr-2 text-gray-600 font-bold">
              #{tag}
            </li>
          ))}
        </ul>
        <HeartOutlined className="text-purple-500 mr-4 mb-1 text-3xl" />
        <CommentOutlined className="text-purple-500 text-3xl" />
        <div className="social-info">
          <span className="font-bold text-black">좋아요: {likes}</span>
        </div>
      </div>
    </div>
  );
};
