import React, { useState } from 'react';
import {
  RecommendPlaylistComponent,
  UploadButtonComponent,
  UploadModalComponent,
} from '../../components';
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
}

interface PlaylistsProps {
  myplaylists: Playlists[];
  likedplaylists: Playlists[];
  myuploadsongslists: Playlists[];
}

export default function MyPagePlaylists({
  myplaylists,
  likedplaylists,
  myuploadsongslists,
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
            myplaylists.map((playlist, idx) => (
              <RecommendPlaylistComponent
                key={idx}
                albumCover={playlist.albumCover}
                title={playlist.title}
                likes={playlist.likes}
                selectTab={selectTab}
              />
            ))}
          {selectTab === 'likedPlaylists' &&
            likedplaylists.map((playlist, idx) => (
              <RecommendPlaylistComponent
                key={idx}
                albumCover={playlist.albumCover}
                title={playlist.title}
                likes={playlist.likes}
                selectTab={selectTab}
              />
            ))}
          {selectTab === 'myuploadsongslists' &&
            myuploadsongslists.map((playlist, idx) => (
              // <>
                <RecommendPlaylistComponent
                  key={idx}
                  albumCover={playlist.albumCover}
                  title={playlist.title}
                  likes={playlist.likes}
                  selectTab={selectTab}
                  songId={playlist._id}
                  // onDelete={() => handleDeleteUploadedSong(playlist._id)}
                />
              // </>
            ))}
          {/* 지금 버튼을 전체 다 보이게 꺼내놓은 상태인데 원래는 내가 업로드한
          쪽에서만 보이게 하려는데
          넣으면 돔에 추가가 안되는 현상이 발생해서
          이것도 추후 수정예정 */}
          <UploadButtonComponent text="업로드" onClick={handleButtonClick} />
        </PlaylistConetent>
      </PlaylistContainer>
      {isModalOpen && <UploadModalComponent onClose={handleCloseModal} />}
    </>
  );
}
