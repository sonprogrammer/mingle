import React from 'react';
import {
  PlaylistCardComponent,
  ContentWrapper,
  FeedFollowRecommendComponent,
} from '../../components';
import { useGetRecommendUser } from '../../hooks';

export default function FeedPage() {

  const { data: recommendUserData } = useGetRecommendUser();
  console.log(recommendUserData)

  return (
    <ContentWrapper>
      <PlaylistCardComponent
        profileIcon={'/img/User-Icon.png'}
        profileName={'때껄룩'}
        albumCover={'/img/AlbumSample.jpg'}
        title={'[Playlist] 쌀쌀한 늦가을에 듣기 좋은 팝송 플레이리스트'}
        hashtags={['잔잔한', '팝송', '따뜻한']}
        likes={777}
      />
      <div style={{display: 'flex', justifyContent:'center'}}>
      {recommendUserData && recommendUserData.length > 0 && (
        recommendUserData.map((user, index) => (
      <FeedFollowRecommendComponent
        profileName={user.nickname||'엘리스'}
        profilePicture={user.userImg||'/img/AlbumSample.jpg'}
        pictures={user.playListPreview || [
          '/img/AlbumSample.jpg',
          '/img/AlbumSample.jpg',
          '/img/AlbumSample.jpg',
        ]}
        feedRecommendText={'회원님을 위한 추천'}
        actionText={'팔로우'}
       />
      ))
      )}
      </div>
    </ContentWrapper>
  );
}
