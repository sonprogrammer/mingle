import React, { useState } from 'react';
import {
  StyleButton,
  StyleContainer,
  StyleCoverUpload,
  StyleFileInputButton,
  StyleFileInputContainer,
  StyleFormInputContainer,
  StyleFormLabel,
  StyleFormSection,
  StyleInput,
  StyleLabel,
  StyleSelect,
} from './styles';
import { usePostUploadSongs } from '../../hooks/usePostUploadSongs';

interface UploadModalComponentProps {
  onClose: () => void;
}
export default function UploadModalComponent({
  onClose,
}: UploadModalComponentProps) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const [song, setSong] = useState({
    name: '',
    artist: '',
    albumCover: '',
    genre: '',
    description: '', // 곡 시간을 넣으니 데이터에러가 발생 추후 물어보고 수정예정
  });

  const { mutate: uploadMutate } = usePostUploadSongs(onClose);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (audioFile && imageFile) {
      const songData = {
        audio: audioFile,
        image: imageFile,
        name: song.name,
        artist: song.artist,
        description: song.description,
        duration: '6000', // 곡 시간쪽을 일단은 하드코딩 해놓은 상태 추후 수정예정
        genre: song.genre,
      };

      uploadMutate(songData);
    }
  };
  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAudioFile(event.target.files[0]);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setSong({ ...song, [name]: value });
  };

  return (
    <StyleContainer onClick={handleOutsideClick}>
      <button
        style={{ display: 'flex', marginLeft: 'auto', marginBottom: '10px' }}
        onClick={onClose}
      >
        X
      </button>
      <StyleFormSection as="form" onSubmit={handleSubmit}>
        <StyleFileInputContainer>
          <StyleFileInputButton as="label">
            {audioFile ? `${audioFile.name}` : 'SELECT AUDIO FILE'}
            <input
              type="file"
              hidden
              onChange={handleAudioChange}
              accept="audio/*"
            />
          </StyleFileInputButton>
        </StyleFileInputContainer>

        <StyleCoverUpload>
          <StyleLabel>
            {imageFile ? (
              <img src={URL.createObjectURL(imageFile)} alt="Album Cover" />
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
          <StyleFormLabel htmlFor="name">음악 이름</StyleFormLabel>
          <StyleInput
            type="text"
            id="name"
            name="name"
            value={song.name}
            onChange={handleInputChange}
            placeholder="음악 이름을 적어주세요."
          />
        </StyleFormInputContainer>

        <StyleFormInputContainer>
          <StyleFormLabel htmlFor="artist">아티스트 이름</StyleFormLabel>
          <StyleInput
            type="text"
            id="artist"
            name="artist"
            value={song.artist}
            onChange={handleInputChange}
            placeholder="아티스트 이름을 적어주세요."
          />
        </StyleFormInputContainer>

        <StyleFormInputContainer>
          <StyleFormLabel htmlFor="description">곡 소개</StyleFormLabel>
          <StyleInput
            type="text"
            id="description"
            name="description"
            value={song.description}
            onChange={handleInputChange}
            placeholder="소개를 적어주세요."
          />
        </StyleFormInputContainer>

        <StyleFormInputContainer>
          <StyleFormLabel htmlFor="genre">장르 선택</StyleFormLabel>
          <StyleSelect
            id="genre"
            name="genre"
            value={song.genre}
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
}
