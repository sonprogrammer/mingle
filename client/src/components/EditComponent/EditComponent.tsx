import React, { useState } from 'react';
import { InputComponent } from '../InputComponent';
import { LongButtonComponent } from '../LongButtonComponent';
import { RecommendGenreComponent } from '../RecommendGenreComponent';
import {
  StyledChoiceButton,
  StyledSelectedGenre,
  StylePasswordToggleIcon,
} from '../SignUpComponent/styles';
import { StyledPasswordWrapper } from './styles';

interface EditComponentProps {
  profile: {
    email: string;
    nickname: string;
  };
}
export default function EditComponent({ profile }: EditComponentProps) {
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const openGenreModal = () => setIsGenreModalOpen(true);
  const closeGenreModal = () => setIsGenreModalOpen(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleGenreSelect = (genre: string[]) => {
    setSelectedGenre(genre);
  };
  const handleClick = () => {
    // 변경 제출 함수 구현 예정
  };
  return (
    <>
      <label className="block mb-2 text-lg font-bold text-gray-900">
        이메일
      </label>
      <div className="mb-6">{profile.email}</div>
      <StyledPasswordWrapper>
        <InputComponent
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력하세요"
        />
        <StylePasswordToggleIcon
          src="/img/view-password.png"
          alt="비밀번호 보기"
          onClick={togglePasswordVisibility}
        />
      </StyledPasswordWrapper>
      <StyledPasswordWrapper>
        <InputComponent
          label="비밀번호 재확인"
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 재입력하세요"
        />
        <StylePasswordToggleIcon
          src="/img/view-password.png"
          alt="비밀번호 보기"
          onClick={togglePasswordVisibility}
        />
      </StyledPasswordWrapper>
      <InputComponent label="닉네임" type="text" value={profile.nickname} />
      <div className="flex mb-2">
        <label className="block text-lg font-bold text-gray-900">
          음악 취향
        </label>
        <StyledChoiceButton onClick={openGenreModal}>
          고르러 가기
        </StyledChoiceButton>
      </div>

      {selectedGenre.length > 0 && (
        <div style={{ position: 'relative', width: '100%' }}>
          <StyledSelectedGenre>
            {selectedGenre.map((item) => {
              return <>{`${item}, `}</>;
            })}
          </StyledSelectedGenre>
        </div>
      )}
      <RecommendGenreComponent
        isOpen={isGenreModalOpen}
        onClose={closeGenreModal}
        onSelect={handleGenreSelect}
      />
      <LongButtonComponent text={'변경하기'} onClick={handleClick} />
    </>
  );
}
