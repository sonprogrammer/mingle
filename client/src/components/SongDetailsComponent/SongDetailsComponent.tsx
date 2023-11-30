import React, { useEffect } from 'react';
import { faHeart as noLike } from '@fortawesome/free-regular-svg-icons';
import { faHeart as like } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useGetSongDetails } from '../../hooks';
import { formatDuration, songUploaderState } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  PageContainer,
  Header,
  ContentContainer,
  ImageSection,
  DetailsSection,
  SongTitle,
  ArtistName,
  AdditionalInfo,
  LikeSection,
  StyleDescriptionSection,
  StyleUploaderInfo,
} from './styles';

export default function SongDetailsPage() {
  const navigate = useNavigate();
  const { songId } = useParams();
  const { data, isLoading, error } = useGetSongDetails(songId ?? '');
  const [songUploader, setSongUploader] = useRecoilState(songUploaderState);

  useEffect(() => {
    if (data?.song?.songUploader) {
      setSongUploader(data.song.songUploader);
    }
  }, [data, setSongUploader]);

  const handleUserClick = () => {
    if (songUploader?._id) {
      navigate(`/user/${songUploader._id}`);
    } else {
      alert('업로더 정보가 존재하지 않습니다.');
    }
  };

  if (isLoading) {
    return (
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
    );
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  const song = data?.song;
  const isLiked = data?.isCurrentUserLiked;
  const formattedDuration = formatDuration(song?.songDuration || 0);

  return (
    <PageContainer>
      <Header>곡 정보</Header>
      <ContentContainer>
        <ImageSection>
          {song.songImageLocation && (
            <img
              src={`http://kdt-sw-6-team09.elicecoding.com/file/songImg/${song.songImageLocation}`}
              alt="앨범 커버"
            /> //앨범 사진 바꿔야함
          )}
        </ImageSection>
        <DetailsSection>
          <SongTitle>{song.songName}</SongTitle>
          <ArtistName>{song?.songArtist || 'Unknown Artist'}</ArtistName>
          <AdditionalInfo>장르 : {song.songCategory}</AdditionalInfo>
          <AdditionalInfo>시간 : {formattedDuration}</AdditionalInfo>
          <StyleUploaderInfo>
            <span style={{ cursor: 'pointer' }} onClick={handleUserClick}>
              {song?.songUploader?.userNickName || 'Unknown Uploader'}
            </span>
          </StyleUploaderInfo>
          <LikeSection>
            {isLiked ? (
              <FontAwesomeIcon icon={like} color={'#9b59b6'} cursor="pointer" />
            ) : (
              <FontAwesomeIcon
                icon={noLike}
                color={'#9b59b6'}
                cursor="pointer"
              />
            )}
            <FontAwesomeIcon
              style={{ marginLeft: '12px', color: '#9b59b6' }}
              icon={faPlus}
            />{' '}
            {/* 더하기 버튼을 눌렀을 때 플레이리스트에 추가하기 기능 구현할 것  */}
          </LikeSection>
        </DetailsSection>
      </ContentContainer>
      <div style={{ padding: '1rem', fontSize: '30px', marginTop: '4px' }}>
        곡 소개
      </div>
      <StyleDescriptionSection>{song.songDescription}</StyleDescriptionSection>
    </PageContainer>
  );
}
