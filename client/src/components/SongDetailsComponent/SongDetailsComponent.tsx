import React from 'react';
import { faHeart as noLike } from '@fortawesome/free-regular-svg-icons';
import { faHeart as like } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useGetSongDetails } from '../../hooks';
import { formatDuration } from '../../utils';
import { useNavigate } from 'react-router-dom';
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
  const handleUserClick = () => {
    if (song?.songUploader?._id) {
      navigate(`/user/${song.songUploader._id}`);
    } else alert('정보가 존재하지 않습니다.');
  };
  const { songId } = useParams();
  const { data, isLoading, error } = useGetSongDetails(songId ?? '');
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  console.log(data);
  const song = data?.song;
  const isLiked = data?.isCurrentUserLiked;
  const formattedDuration = formatDuration(song?.songDuration || 0);
  return (
    <PageContainer>
      <Header>곡 정보</Header>
      <ContentContainer>
        <ImageSection>
          {song.songImageLocation && (
            <img src="/img/AlbumSample.jpg" alt="앨범 커버" /> //앨범 사진 바꿔야함
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
