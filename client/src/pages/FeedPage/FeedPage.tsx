import React, { useState } from 'react';
import {
  PlaylistCardComponent,
  ContentWrapper,
  FeedFollowRecommendComponent,
} from '../../components';
import {
  useGetPlaylistsByFollow,
  useGetRecommendUser,
  useGetUserInfo,
} from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MoveRightButton, MoveLeftButton, Box } from './styles';

export default function FeedPage() {
  const { data: recommendUserData } = useGetRecommendUser();
  const { data: userData } = useGetUserInfo();
  const { data: feedData } = useGetPlaylistsByFollow();
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextSet = (increment: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + increment;
      const maxIndex = Math.max(0, recommendUserData?.length - 3);
      return newIndex > maxIndex ? 0 : newIndex < 0 ? maxIndex : newIndex;
    });
  };

  const userFollower = userData?.user.userFollow;
  return (
    <ContentWrapper>
      {userFollower &&
        userFollower?.length > 0 &&
        feedData?.map((item) => {
          return (
            <PlaylistCardComponent
              key={item._id}
              playlistId={item._id}
              userId={item.playListOwner._id}
              playlistDescription={item.playListExplain}
              profileIcon={'/img/User-Icon.png'}
              profileName={item.playListOwner.userNickname}
              albumCover={`http://kdt-sw-6-team09.elicecoding.com/file/playListCover/${item.playListImg}`}
              title={item.playListTitle}
              isUserLiked={item.like}
              likeCount={item.likeCount}
            />
          );
        })}
      <Box>
        {userFollower?.length === 0 &&
          recommendUserData &&
          recommendUserData
            .slice(currentIndex, currentIndex + 3)
            .map((user, index) => (
              <>
                <MoveLeftButton onClick={() => showNextSet(-1)}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </MoveLeftButton>
                <MoveRightButton onClick={() => showNextSet(1)}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </MoveRightButton>
                <FeedFollowRecommendComponent
                  userId={user.userId}
                  profileName={user.nickname || '엘리스'}
                  profilePicture={user.userFile || '/img/AlbumSample.jpg'}
                  pictures={
                    user.playListPreview || [
                      '/img/AlbumSample.jpg',
                      '/img/AlbumSample.jpg',
                      '/img/AlbumSample.jpg',
                    ]
                  }
                  feedRecommendText={'회원님을 위한 추천'}
                  actionText={'팔로우'}
                />{' '}
              </>
            ))}
      </Box>
    </ContentWrapper>
  );
}
