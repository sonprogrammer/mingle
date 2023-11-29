import React, { useState } from 'react';
import {
  PlaylistCardComponent,
  ContentWrapper,
  FeedFollowRecommendComponent,
} from '../../components';
import { useGetRecommendUser, useGetUserInfo } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {MoveRightButton, MoveLeftButton , Box} from './styles'

export default function FeedPage() {

  const { data: recommendUserData } = useGetRecommendUser();
  const { data: userData } =useGetUserInfo();
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextSet = (increment:number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + increment;
      const maxIndex = Math.max(0, recommendUserData?.length - 3);
      return newIndex > maxIndex ? 0 : newIndex < 0 ? maxIndex : newIndex;
    });
  };

const userFollower = userData?.user?.userFollower

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
        <Box>
      {userFollower?.length === 0 && recommendUserData && recommendUserData.slice(currentIndex, currentIndex + 3)
        .map((user, index) => (
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
      }

      <MoveLeftButton onClick={() => showNextSet(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </MoveLeftButton>
      <MoveRightButton onClick={() => showNextSet(1)}>
        <FontAwesomeIcon icon={faArrowRight} />
      </MoveRightButton>
      </Box>
    </ContentWrapper>
  );
}
