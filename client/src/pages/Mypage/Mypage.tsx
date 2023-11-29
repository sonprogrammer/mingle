import React from 'react';
import { 
  // uploadedSongsState, 
  useGetPlaylistsByLike, useGetUserInfo, usePutUserDescription, useDeleteSong } from '../../hooks';


import { UserInfo } from '../../types';
import { MyInfoComponent, MyPagePlaylists } from '../../components';
import { useGetUploadedSongs } from '../../hooks/useGetUploadedSongs';

const MYplaylistInfo = [
  {
    playListImg: '/img/AlbumSample.jpg',
    playListTitle: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likeCount: 111,
  },
  {
    playListImg: '/img/AlbumSample.jpg',
    playListTitle: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likeCount: 333,
  },
  {
    playListImg: '/img/AlbumSample.jpg',
    playListTitle: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likeCount: 555,
  },
  {
    playListImg: '/img/AlbumSample.jpg',
    playListTitle: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likeCount: 777,
  },
  {
    playListImg: '/img/AlbumSample.jpg',
    playListTitle: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likeCount: 999,
  },
];

function SongDataToPlaylist(songData: any) {
  return {
    _id: songData.song._id,
    albumCover: '/img/AlbumSample.jpg', //이미지도 하드코딩 해놓은 상태인데 이미지 가져오는 것도 추후 수정예정
    title: songData.song.songName,
    likes: songData.song.songUploader.likeSong, //그리고 뭐가 보이게 할지도 논의해서 수정예정
    songId: songData.song._id,
    songData: songData
  };
}

export default function Mypage() {
  const page: number = 1;
  const pageSize: number = 100;
  /*추후 페이지네이션 */
  const { data } = useGetUploadedSongs(page, pageSize);
  const { mutate } = usePutUserDescription()
  const { data: userData, isLoading} = useGetUserInfo()
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
  const uploadedPlaylists =
    data && data.songs ? data.songs.map(SongDataToPlaylist) : [];


  return (
    <>
      <MyInfoComponent
        userImage={'/img/User-Icon.png'}
        profile={userData?.user}
        onUpdate={handleUpdateDescription}
        postsCount={7}
        followersCount={7}
        followingCount={7}
      />
      <MyPagePlaylists
        myPlaylists={MYplaylistInfo}
        likedPlaylists={likedPlaylist ?? []}
        myUploadSongslists={uploadedPlaylists}
        handleDeleteUploadedSong={handleDeleteUploadedSong}
      />
    </>
  );
}
