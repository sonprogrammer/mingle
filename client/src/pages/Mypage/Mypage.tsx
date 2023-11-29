import React from 'react';
import { 
  // uploadedSongsState, 
  useGetPlaylistsByLike, useGetUserInfo, usePutUserDescription, useDeleteSong ,useGetUserPlaylist, useGetUserUploadSong} from '../../hooks';


import { UserInfo } from '../../types';
import { MyInfoComponent, MyPagePlaylists } from '../../components';
import { useGetUploadedSongs } from '../../hooks/useGetUploadedSongs';


export default function Mypage() {
  const page: number = 1;
  const pageSize: number = 100;
  /*추후 페이지네이션 */
  const { data } = useGetUploadedSongs(page, pageSize);
  const { mutate } = usePutUserDescription()
  const { data: userData, isLoading} = useGetUserInfo()
  const { data: playlist } = useGetUserPlaylist()
  const { mutate: deleteSong } = useDeleteSong();

  const handleDeleteUploadedSong = async (songId: string) => {
      await deleteSong(songId);
  };
  const { data: likedPlaylist } = useGetPlaylistsByLike();
  if (isLoading) {
    return <p>loading...</p>;
  }
  const handleUpdateDescription = async (updatedInfo: Partial<UserInfo>) => {
    mutate(updatedInfo);
  };

  // 여기서 데이터에 map함수를 적용할지 아니면 훅에서 songs배열을 바로 반환시킬지
  // 나중에 더 효율 좋은 방식으로 수정할 예정
  const uploadedPlaylists = data && data.songs ? data.songs : [];



  return (
    <>
      <MyInfoComponent
        playlist={playlist??[]}
        profile={userData?.user}
        onUpdate={handleUpdateDescription}
      />
      <MyPagePlaylists
        myPlaylists={playlist ?? []}
        likedPlaylists={likedPlaylist ?? []}
        myUploadSongslists={uploadedPlaylists ??[]}
        handleDeleteUploadedSong={handleDeleteUploadedSong}
      />
    </>
  );
}
