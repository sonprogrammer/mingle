import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  StyleButton,
  StyleContainer,
  StyleCoverUpload,
  StyleFormInputContainer,
  StyleFormLabel,
  StyleFormSection,
  StyleLabel,
  StyledText,
  StyleAddSongContainer,
  StyledPlayListUl,
  StyledPlayListLi,
  StyledPlayListImg,
  StyledPlayListTitle,
} from './styles';
import { useGetUserPlaylist } from '../../hooks/useGetUserPlaylist';
import { usePostPlaylistAddSongs } from '../../hooks/usePostPlaylistAddSongs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

interface SelectedSong {
  _id: string;
  img: string;
  title: string;
  artist: string;
  length: string;
}

interface CommentInSelect {
  author: string;
  comment: string;
  date: string;
  _id: string;
}

interface GetPlayListForModal {
  createdAt: string;
  genre: string;
  like: boolean;
  likeCount: number;
  playListComments: CommentInSelect[];
  playListExplain: string;
  playListImg: string;
  playListOwner: string;
  playListSongs: string[];
  playListTitle: string;
  updatedAt: string;
  _id: string;
}

interface PlaylistSelectComponentProps {
  setIsModalAppear: Dispatch<SetStateAction<boolean>>;
  setIsSelectModal: Dispatch<SetStateAction<boolean | null>>;
  setIsExistingPlayList: Dispatch<SetStateAction<boolean | null>>;
  setSongs: Dispatch<SetStateAction<SelectedSong[]>>;
  songs: SelectedSong[];
}

const PlaylistSelectComponent: React.FC<PlaylistSelectComponentProps> = ({
  setIsModalAppear,
  setIsSelectModal,
  setIsExistingPlayList,
  setSongs,
  songs,
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');
  const [selectedName, setSelectedName] = useState<string>('');
  const { data, isLoading } = useGetUserPlaylist();
  const { mutate: uploadMutate } = usePostPlaylistAddSongs(
    selectedPlaylist,
    setIsModalAppear,
    setSongs,
  );

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleNewPlaylist = () => {
    setIsSelectModal(false);
    setIsExistingPlayList(false);
    setIsModalAppear(true);
  };

  const handlePlayListClick = (playListId: string, playListTitle: string) => {
    setSelectedPlaylist(playListId);
    setSelectedName(playListTitle);
  };

  const handleAddSongs = () => {
    if (!selectedPlaylist) {
      alert('곡들을 추가할 기존의 플레이리스트를 선택해 주세요.');
      return;
    }
    const isAgreed = confirm(`${selectedName} 에 곡을 추가하시겠습니까?`);
    if (!isAgreed) return;
    const songData = songs.map((song) => song._id);
    uploadMutate({ songId: songData });
  };

  console.log(data);

  return (
    <StyleContainer>
      <button
        style={{ display: 'flex', marginLeft: 'auto', marginBottom: '10px' }}
        onClick={() => {
          setIsModalAppear(false);
          setIsSelectModal(true); // 모달이 닫힐 때 다시 초기 상태로 돌아감
          setIsExistingPlayList(null);
        }}
      >
        X
      </button>
      <StyleFormSection as="form" onSubmit={handleSubmit}>
        {/* <StyleFormLabel htmlFor="name">새 플레이리스트 만들기</StyleFormLabel> */}
        <StyleCoverUpload onClick={handleNewPlaylist}>
          <StyleLabel>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="fa-2x"
              style={{ paddingRight: '25px' }}
            />
            새 플레이리스트 생성하기
          </StyleLabel>
        </StyleCoverUpload>

        <StyleFormInputContainer>
          <StyleFormLabel>기존 플레이리스트에 추가하기</StyleFormLabel>
          <StyleAddSongContainer>
            <StyledPlayListUl>
              {isLoading ? (
                <span>로딩중</span>
              ) : !data.length ? (
                <StyledText>기존 플레이리스트가 존재하지 않습니다.</StyledText>
              ) : (
                data.map((playlist: GetPlayListForModal) => (
                  <StyledPlayListLi
                    selectedPlaylist={selectedPlaylist}
                    playlistId={playlist._id}
                    onClick={() =>
                      handlePlayListClick(playlist._id, playlist.playListTitle)
                    }
                  >
                    <StyledPlayListImg
                      src={`/file/playListCover/${playlist.playListImg}`}
                      alt={playlist.playListTitle}
                    />
                    <StyledPlayListTitle>
                      {playlist.playListTitle}
                    </StyledPlayListTitle>
                  </StyledPlayListLi>
                ))
              )}
            </StyledPlayListUl>
          </StyleAddSongContainer>
        </StyleFormInputContainer>

        <StyleButton type="submit" onClick={handleAddSongs} data={data}>
          플레이리스트에 곡 추가
        </StyleButton>
      </StyleFormSection>
    </StyleContainer>
  );
};

export default PlaylistSelectComponent;
