import React, { useState } from 'react';
import { useDeleteSong } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import {
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
          {selectTab === 'myPlaylists' &&
            myPlaylists.map((playlist, idx) => (
              <RecommendPlaylistComponent
                key={idx}
                playListImg={playlist.playListImg}
                playListTitle={playlist.playListTitle}
                likeCount={playlist.likeCount}
                selectTab={selectTab}
                _id={playlist._id}
                isFromMyPage={true}
              />
            ))}
          {selectTab === 'likedPlaylists' &&
            likedPlaylists &&
            likedPlaylists.length > 0 &&
            likedPlaylists?.map((playlist) => (
              <RecommendPlaylistComponent
                key={playlist._id}
                playListImg={playlist.playListImg}
                playListTitle={playlist.playListTitle}
                likeCount={playlist.likeCount}
                selectTab={selectTab}
                _id={playlist._id}
              />
            ))}

          {selectTab === 'myuploadsongslists' &&
            myUploadSongslists.map((playlist) => {
              return (
                <>
                  <RecommendPlaylistComponent
                    _id={playlist._id || 'error'} // 오류 메시지는 임시로 사용
                    key={playlist._id}
                    playListImg={playlist.playListImg}
                    playListTitle={playlist.playListTitle}
                    likeCount={playlist.likeCount}
                    onClick={handleCardClick}
                    selectTab={selectTab}
                    songId={playlist.songId}
                    onDelete={() => handleDeleteUploadedSong(playlist.songId)}
                    songData={playlist.songData}
                  />
                </>
              );
            })}
          <UploadButtonComponent text="업로드" onClick={handleButtonClick} />
        </PlaylistConetent>
      </PlaylistContainer>
      {isModalOpen && <UploadModalComponent onClose={handleCloseModal} />}
    </>
  );
}
