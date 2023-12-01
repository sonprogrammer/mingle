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
interface RecommendUser {
  userId: string;
  nickname: string;
  userFile: string;
  playListPreview: { _id: string; playListImg: string }[];
}
export default function FeedPage() {
  const { data: recommendUserData, isLoading: isRecommendLoading } =
    useGetRecommendUser();
  const { data: userData, isLoading: isUserLoading } = useGetUserInfo();
  const { data: feedData, isLoading: isFeedLoading } =
    useGetPlaylistsByFollow();
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
      {isRecommendLoading || isUserLoading || isFeedLoading ? (
        <div role="status" className="text-center mt-[36vh]">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 mx-auto animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        userFollower &&
        userFollower?.length > 0 &&
        feedData?.map((item) => {
          return (
            <PlaylistCardComponent
              key={item._id}
              playlistId={item._id}
              userId={item.playListOwner._id}
              playlistDescription={item.playListExplain}
              profileIcon={`http://kdt-sw-6-team09.elicecoding.com/file/profile/${item.playListOwner.userFile}`}
              profileName={item.playListOwner.userNickname}
              albumCover={`http://kdt-sw-6-team09.elicecoding.com/file/playListCover/${item.playListImg}`}
              title={item.playListTitle}
              isUserLiked={item.like}
              likeCount={item.likeCount}
            />
          );
        })
      )}
      <Box>
        {feedData?.length === 0 &&
          recommendUserData &&
          recommendUserData
            .slice(currentIndex, currentIndex + 3)
            .map((user: RecommendUser) => (
              <>
                <MoveLeftButton onClick={() => showNextSet(-1)}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </MoveLeftButton>
                <MoveRightButton onClick={() => showNextSet(1)}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </MoveRightButton>
                <FeedFollowRecommendComponent
                  isFollowing={userData?.user.userFollow.includes(user.userId)}
                  userId={user.userId}
                  profileName={user.nickname || '엘리스'}
                  profilePicture={user.userFile || '1701310949831.png'}
                  pictures={
                    user.playListPreview || [
                      '/img/AlbumSample.jpg',
                      '/img/AlbumSample.jpg',
                      '/img/AlbumSample.jpg',
                    ]
                  }
                  feedRecommendText={'회원님을 위한 추천'}
                />{' '}
              </>
            ))}
      </Box>
    </ContentWrapper>
  );
}
