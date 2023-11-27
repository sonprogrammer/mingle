import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { uploadedSongsState } from '../../hooks';
import { UserInfoComponent, MyPagePlaylists } from '../../components';
import { useGetUploadedSongs } from '../../hooks/useGetUploadedSongs';

const MYplaylistInfo = [
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 111,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 333,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 555,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 777,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 999,
  },
];
const LikedplaylistInfo = [
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 333,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 333,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 555,
  },
  {
    albumCover: '/img/AlbumSample.jpg',
    title: '[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트',
    likes: 777,
  },
];

function SongDataToPlaylist(songData: any) {
  return {
    albumCover: '/img/AlbumSample.jpg', //이미지도 하드코딩 해놓은 상태인데 이미지 가져오는 것도 추후 수정예정
    title: songData.song.songName,
    likes: songData.song.songUploader.likeSong, //그리고 뭐가 보이게 할지도 논의해서 수정예정
  };
}

export default function Mypage() {
  const page: number = 1;
  const pageSize: number = 100;
  const { data } = useGetUploadedSongs(page, pageSize);
  const setUploadedSongs = useSetRecoilState(uploadedSongsState);

  useEffect(() => {
    if (data) {
      setUploadedSongs(data);
    }
  }, [data, setUploadedSongs]);

  // 여기서 데이터에 map함수를 적용할지 아니면 훅에서 songs배열을 바로 반환시킬지
  // 나중에 더 효율 좋은 방식으로 수정할 예정
  const uploadedPlaylists =
    data && data.songs ? data.songs.map(SongDataToPlaylist) : [];

  return (
    <>
      <UserInfoComponent
        userImage={'/img/User-Icon.png'}
        userName={'떼깔룩'}
        userDescription={'20자 이내로 쓰세요'}
        postsCount={7}
        followersCount={7}
        followingCount={7}
      />
      <MyPagePlaylists
        myplaylists={MYplaylistInfo}
        likedplaylists={LikedplaylistInfo}
        myuploadsongslists={uploadedPlaylists}
      />
    </>
  );
}
