import React, { useState } from 'react';
import { useDeleteSong } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import {
  UserUploadSongComponent,
  RecommendPlaylistComponent,
  UploadButtonComponent,
  UploadModalComponent,
} from '../../components';
import { Playlists } from '../../types';
import {
  StyledButtons,
  StyledMyPlaylistButtons,
  StyledLikedButtons,
  PlaylistConetent,
  PlaylistContainer,
} from './styles';
interface Playlists {
  song: string;
  albumCover: string;
  title: string;
  hashtags?: string[];
  likes: number;
  _id: string;
  songId: string;
}

interface PlaylistsProps {
  myPlaylists: {
    _id: string;
    playListImg: string;
    playListTitle: string;
    likeCount: number;
  }[]; // 임시, 데이터 바인딩 후 아래와 같은 Playlists[] | undefined 형태로 수정 필요
  likedPlaylists: Playlists[] | undefined;
  myUploadSongslists: {
    playListImg: string;
    playListTitle: string;
    likeCount: number;
  }[]; // 임시, 데이터 바인딩 후 아래와 같은 Playlists[] | undefined 형태로 수정 필요
  myplaylists: Playlists[];
  likedplaylists: Playlists[];
  myuploadsongslists: Playlists[];
  handleDeleteUploadedSong: (songId: string) => Promise<void>;
}

export default function MyPagePlaylists({
  myPlaylists,
  likedPlaylists,
  myUploadSongslists,
  handleDeleteUploadedSong,
}: PlaylistsProps) {
  const [selectTab, setSelecTab] = useState('myPlaylists');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleTabClick = (tab: string) => {
    setSelecTab(tab);
  };

  const navigate = useNavigate();
  /* 차트쪽은 Link를 사용했는데 여기서는 Link태그 사용시 a태그 속성때문에 ui가 깨져서
   useNavigate함수를 사용하였음 */
  const handleCardClick = (_id: string) => {
    navigate(`/song/${_id}`);
  };
  return (
    <>
      <StyledButtons>
        <StyledMyPlaylistButtons
          selected={selectTab === 'myPlaylists'}
          onClick={() => handleTabClick('myPlaylists')}
        >
          내 플레이리스트
        </StyledMyPlaylistButtons>
        <StyledLikedButtons
          selected={selectTab === 'likedPlaylists'}
          onClick={() => handleTabClick('likedPlaylists')}
        >
          좋아요한 플레이리스트
        </StyledLikedButtons>
        <StyledLikedButtons
          selected={selectTab === 'myuploadsongslists'}
          onClick={() => handleTabClick('myuploadsongslists')}
        >
          내가 업로드한 곡
        </StyledLikedButtons>
      </StyledButtons>

      <PlaylistContainer>
        <PlaylistConetent>
          {selectTab === 'myPlaylists' ? (
            myPlaylists && myPlaylists.length > 0 ? (
              myPlaylists?.map((playlist) => (
                <RecommendPlaylistComponent
                  key={playlist._id}
                  playListImg={playlist.playListImg}
                  playListTitle={playlist.playListTitle}
                  likeCount={playlist.likeCount}
                  selectTab={selectTab}
                  _id={playlist._id}
                  isFromMyPage={true}
                />
              ))
            ) : (
              <>업로드한 플레이리스트가 없습니다.</>
            )
          ) : null}
          {selectTab === 'likedPlaylists' ? (
            likedPlaylists && likedPlaylists.length > 0 ? (
              likedPlaylists?.map((playlist) => (
                <RecommendPlaylistComponent
                  key={playlist._id}
                  playListImg={playlist.playListImg}
                  playListTitle={playlist.playListTitle}
                  likeCount={playlist.likeCount}
                  selectTab={selectTab}
                  _id={playlist._id}
                />
              ))
            ) : (
              <>좋아요한 플레이리스트가 없습니다.</>
            )
          ) : null}

          {selectTab === 'myuploadsongslists' ? (
            myUploadSongslists && myUploadSongslists.length > 0 ? (
              myUploadSongslists.map((songs) => {
                return (
                  <>
                    <UserUploadSongComponent
                      _id={songs._id || 'error'} // 오류 메시지는 임시로 사용
                      key={songs._id}
                      playListImg={songs.songImageLocation}
                      playListTitle={songs.songName}
                      likeCount={songs.likeCount}
                      onClick={handleCardClick}
                      selectTab={selectTab}
                      songId={songs._id}
                      onDelete={() => handleDeleteUploadedSong(songs._id)}
                      // songData={songs.song.songData}
                    />
                  </>
                );
              })
            ) : (
              <>업로드한 곡이 없습니다.</>
            )
          ) : null}
          <UploadButtonComponent text="곡 업로드" onClick={handleButtonClick} />
        </PlaylistConetent>
      </PlaylistContainer>
      {isModalOpen && <UploadModalComponent onClose={handleCloseModal} />}
    </>
  );
}
