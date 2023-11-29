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
import { UserInfo } from '../../types';

interface EditComponentProps {
  profile: UserInfo;
  onUpdate: (updatedInfo: Partial<UserInfo>) => void;
}

export default function EditComponent({
  profile,
  onUpdate,
}: EditComponentProps) {
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const openGenreModal = () => setIsGenreModalOpen(true);
  const closeGenreModal = () => setIsGenreModalOpen(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string[]>(profile.userPreference || []);
  const [userPassword, setUserPassword] = useState(profile.userPassword || '');
  const [userNickname, setUserNickname] = useState(profile.userNickname);
  // const [userPreference, setUserPreference] = useState(profile.userPreference);

  if (!profile) {
    return <p>no profile</p>;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleGenreSelect = (selectedGenre: string[]) => {
    setSelectedGenre(selectedGenre);
  };
  const handleClick = () => {
    const updatedInfo: Partial<UserInfo> = {
      userPassword: userPassword, 
      userNickname: userNickname,
      userPreference: selectedGenre,
    };
    onUpdate(updatedInfo);
  };
  return (
    <>
      <label className="block mb-2 text-lg font-bold text-gray-900">
        이메일
      </label>
      <div className="mb-6">{profile.userEmail}</div>
      <StyledPasswordWrapper>
        <InputComponent
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력하세요"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
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
      <InputComponent
        label="닉네임"
        type="text"
        onChange={(e) => setUserNickname(e.target.value)}
        value={userNickname}
      />
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
