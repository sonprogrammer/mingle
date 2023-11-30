import React, { useState } from 'react';
import {
  StyleButton,
  StyleContainer,
  StyleCoverUpload,
  StyleFormInputContainer,
  StyleFormLabel,
  StyleFormSection,
  StyleInput,
  StyleLabel,
  StyleSelect,
  StyleAddSongContainer,
  StyleToAddSong,
  StyleSongInfo,
  StyleSongImg,
} from './styles';
import { usePostUploadPlayList } from '../../hooks/usePostUploadPlayList';

interface Song {
  _id: string;
  img: string;
  title: string;
  artist: string;
  length: string;
}

interface PlaylistUploadComponentProps {
  setIsModalAppear: (value: boolean) => void;
  songs: Song[];
  setSongs: <T>(value: T[]) => void;
}

const PlaylistUploadComponent: React.FC<PlaylistUploadComponentProps> = ({
  setIsModalAppear,
  songs,
  setSongs,
}) => {
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [playListName, setPlayListName] = useState<string | null>(null);
  const [playListDescription, setPlayListDescription] = useState<string | null>(
    null,
  );
  const [playListGenre, setPlayListGenre] = useState<string | null>(null);

  const { mutate: uploadMutate } = usePostUploadPlayList(
    setIsModalAppear,
    setSongs,
  );

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (!imageFile || !playListName || !playListDescription || !playListGenre) {
      alert('모든 항목을 입력해 주세요.');
      return;
    } else {
      const playListData = {
        playListTitle: playListName,
        playListExplain: playListDescription,
        playListSongs: songs.map((song: Song) => song._id),
        playListImg: imageFile.split(';base64,')[1],
        genre: playListGenre,
      };
      uploadMutate(playListData);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // FileReader 객체 생성
      const reader = new FileReader();

      // 파일 읽기 완료 이벤트 핸들러
      reader.onloadend = () => {
        // reader.result에 base64 URL이 들어 있습니다.
        const base64Url = reader.result as string;
        // base64Url을 사용하여 필요한 작업 수행
        setImageFile(base64Url);
      };

      // 파일을 Data URL로 읽기
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setPlayListName(value);
    } else if (name === 'description') {
      setPlayListDescription(value);
    } else if (name === 'genre') {
      setPlayListGenre(value);
    }
  };

  return (
    <StyleContainer>
      <button
        style={{ display: 'flex', marginLeft: 'auto', marginBottom: '10px' }}
        onClick={() => {
          setIsModalAppear(false);
        }}
      >
        X
      </button>
      <StyleFormSection as="form" onSubmit={handleSubmit}>
        <StyleFormInputContainer>
          <StyleFormLabel htmlFor="description">
            플레이리스트에 담을 곡들
          </StyleFormLabel>
          <StyleAddSongContainer>
            <ul>
              {songs.map((song) => (
                <StyleToAddSong key={song._id}>
                  <StyleSongImg src={song.img} alt="songImage" />
                  <StyleSongInfo>{song.title}</StyleSongInfo>
                  <StyleSongInfo>{song.artist}</StyleSongInfo>
                  <StyleSongInfo>{song.length}</StyleSongInfo>
                </StyleToAddSong>
              ))}
            </ul>
          </StyleAddSongContainer>
        </StyleFormInputContainer>

        <StyleFormLabel htmlFor="name">플레이리스트 커버 이미지</StyleFormLabel>
        <StyleCoverUpload>
          <StyleLabel>
            {imageFile ? (
              <img src={imageFile} alt="Album Cover" />
            ) : (
              'SELECT IMAGE FILE'
            )}
            <input
              type="file"
              hidden
              onChange={handleImageChange}
              accept="image/*"
            />
          </StyleLabel>
        </StyleCoverUpload>

        <StyleFormInputContainer>
          <StyleFormLabel htmlFor="name">플레이리스트 이름</StyleFormLabel>
          <StyleInput
            type="text"
            id="name"
            name="name"
            value={playListName || ''}
            onChange={handleInputChange}
            placeholder="플레이리스트 이름을 적어주세요."
          />
        </StyleFormInputContainer>

        <StyleFormInputContainer>
          <StyleFormLabel htmlFor="description">
            플레이리스트 소개
          </StyleFormLabel>
          <StyleInput
            type="text"
            id="description"
            name="description"
            value={playListDescription || ''}
            onChange={handleInputChange}
            placeholder="플레이리스트 소개를 적어주세요."
          />
        </StyleFormInputContainer>

        <StyleFormInputContainer>
          <StyleFormLabel htmlFor="genre">장르 선택</StyleFormLabel>
          <StyleSelect
            id="genre"
            name="genre"
            value={playListGenre || ''}
            onChange={handleInputChange}
          >
            <option value="">장르 선택</option>
            <option value="발라드">발라드</option>
            <option value="록">록</option>
            <option value="댄스">댄스</option>
            <option value="클래식">클래식</option>
            <option value="힙합">힙합</option>
          </StyleSelect>
        </StyleFormInputContainer>

        <StyleButton type="submit">등록하기</StyleButton>
      </StyleFormSection>
    </StyleContainer>
  );
};

export default PlaylistUploadComponent;
