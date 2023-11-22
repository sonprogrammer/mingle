import React from "react";
import { UserInfoComponent, MyPagePlaylists } from "../../components";


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




export default function Mypage() {
  return (
    <>
    <UserInfoComponent
      userImage={"/img/User-Icon.png"}
      userName={"떼깔룩"}
      userDescription={"20자 이내로 쓰세요"}
      postsCount={7}
      followersCount={7}
      followingCount={7}
    />
    <MyPagePlaylists myplaylists={MYplaylistInfo} likedplaylists={LikedplaylistInfo}/>
    </>
  );
}
