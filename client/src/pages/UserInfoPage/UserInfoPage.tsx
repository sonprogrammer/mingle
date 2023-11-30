import React from 'react';
import { useLocation } from 'react-router-dom';
import { RecommendPlaylistComponent } from '../../components';
import {
  PlaylistConetent,
  PlaylistContainer,
} from '../../components/MyPagePlaylists/styles';
import { UserInfoComponent } from '../../components/UserInfocomponent';
import { useGetOtherUserInfo, useGetUserInfo } from '../../hooks';

export default function UserInfoPage() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id') as string;
  const { data, isLoading } = useGetOtherUserInfo(id);
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetUserInfo();
  const handleIsFollowing = (userId: string | undefined) => {
    return currentUser?.user.userFollow.includes(userId as string);
  };
  return (
    <div>
      {isLoading || isCurrentUserLoading ? (
        <>로딩 중...</>
      ) : (
        <>
          <UserInfoComponent
            userId={id}
            profile={data?.user}
            playlist={data?.playListInfo}
            isFollowing={handleIsFollowing(data?.user._id)}
          />
          <PlaylistContainer>
            <PlaylistConetent>
              {data?.playListInfo.map((playlist) => {
                return (
                  <RecommendPlaylistComponent
                    key={playlist._id}
                    playListImg={playlist.playListImg}
                    playListTitle={playlist.playListTitle}
                    likeCount={playlist.likeCount}
                    _id={playlist._id}
                  />
                );
              })}
            </PlaylistConetent>
          </PlaylistContainer>
        </>
      )}
    </div>
  );
}
