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
  albumCover: string;
  title: string;
  hashtags?: string[];
  likes: number;
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
              />
            ))}

          {selectTab === 'likedPlaylists' &&
            likedplaylists.map((playlist, idx) => (
              <RecommendPlaylistComponent
                key={idx}
                albumCover={playlist.albumCover}
                title={playlist.title}
                likes={playlist.likes}
              />
            ))}

          {selectTab === 'myuploadsongslists' &&
            myuploadsongslists.map((playlist, idx) => (
              <>
                <RecommendPlaylistComponent
                  key={idx}
                  albumCover={playlist.albumCover}
                  title={playlist.title}
                  likes={playlist.likes}
                />
              </>
            ))}
          <UploadButtonComponent text="업로드" onClick={handleButtonClick} />
        </PlaylistConetent>
      </PlaylistContainer>
      {isModalOpen && <UploadModalComponent onClose={handleCloseModal} />}
    </>
  );
}
