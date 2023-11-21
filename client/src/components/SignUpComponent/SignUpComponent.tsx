import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './styles';
import LongButtonComponent from '../LongButtonComponent/LongButtonComponent';
import { InputComponent } from '../InputComponent';
import { RecommendGenreComponent } from '../RecommendGenreComponent';
import { usePostRegister } from '../../hooks';

interface SignUpProps {
  initialUserPassword: string;
  initialVerifyPassword: string;
  initialUserEmail: string;
  initialUserNickname: string;
}

export default function SignUpComponent({
  initialUserPassword,
  initialVerifyPassword,
  initialUserEmail,
  initialUserNickname,
}: SignUpProps) {
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);

  const openGenreModal = () => setIsGenreModalOpen(true);
  const closeGenreModal = () => setIsGenreModalOpen(false);
  const [userPassword, setUserPassword] = useState(initialUserPassword);
  const [verifyPassword, setVerifyPassword] = useState(initialVerifyPassword);
  const [userEmail, setUserEmail] = useState(initialUserEmail);
  const [userNickname, setUserNickname] = useState(initialUserNickname);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);

  const { mutate } = usePostRegister({
    userEmail: userEmail,
    userPassword: verifyPassword,
    userNickname: userNickname,
    userPreference: selectedGenre,
  });
  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    mutate();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleGenreSelect = (genre: string[]) => {
    setSelectedGenre(genre);
  };
  useEffect(() => {
    if (userPassword !== verifyPassword && verifyPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [userPassword, verifyPassword]);
  return (
    <Styled.StyleSignUpContainer>
      <Styled.StyleServiceName>
        <img src="/img/Logo.png" alt="Mingle Logo" />
      </Styled.StyleServiceName>
      <div style={{ position: 'relative', width: '100%' }}>
        <InputComponent
          type="email"
          label="이메일"
          placeholder="이메일을 입력하세요."
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
        <InputComponent
          type={showPassword ? 'text' : 'password'}
          label="비밀번호"
          placeholder="비밀번호를 입력하세요."
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Styled.StylePasswordToggleIcon
          src="/img/view-password.png"
          alt="비밀번호 보기"
          onClick={togglePasswordVisibility}
        />
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
        <InputComponent
          type={showPassword ? 'text' : 'password'}
          label="비밀번호 재확인"
          placeholder="비밀번호를 재입력하세요."
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
        <Styled.StylePasswordToggleIcon
          src="/img/view-password.png"
          alt="비밀번호 보기"
          onClick={togglePasswordVisibility}
        />
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
        <InputComponent
          type="text"
          label="닉네임"
          placeholder="닉네임을 입력하세요."
          value={userNickname}
          onChange={(e) => setUserNickname(e.target.value)}
        />
      </div>
      {passwordError && (
        <Styled.StyleWarningText>
          비밀번호가 일치하지 않습니다.
        </Styled.StyleWarningText>
      )}
      <Styled.StyledTextWrapper>
        <span>나의 음악 취향은?(선택사항)</span>
        <Styled.StyledChoiceButton onClick={openGenreModal}>
          고르러 가기
        </Styled.StyledChoiceButton>
      </Styled.StyledTextWrapper>

      {selectedGenre.length > 0 && (
        <div style={{ position: 'relative', width: '100%' }}>
          <Styled.StyledSelectedGenre>
            {selectedGenre.map((item) => {
              return <>{`${item}, `}</>;
            })}
          </Styled.StyledSelectedGenre>
        </div>
      )}

      <LongButtonComponent text="가입하기" onClick={handleClick} />
      <Styled.StyledTextWrapper>
        <span>회원이신가요?</span>
        <Link to="/login">
          <Styled.StyledTextButton>로그인</Styled.StyledTextButton>
        </Link>
      </Styled.StyledTextWrapper>
      <RecommendGenreComponent
        isOpen={isGenreModalOpen}
        onClose={closeGenreModal}
        onSelect={handleGenreSelect}
      />
    </Styled.StyleSignUpContainer>
  );
}
