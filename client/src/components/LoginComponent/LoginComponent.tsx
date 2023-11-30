import React, { useState } from 'react';
import { InputComponent } from '../InputComponent';
import { Link } from 'react-router-dom';
import {
  StyledLoginWrapper,
  StyledHelpWrapper,
  StyledLabel,
  StyledCheckbox,
  StyledCheckboxChildren,
  StyledTextWrapper,
  StyledTextButton,
} from './styles';
import { LongButtonComponent } from '../LongButtonComponent';
import { usePostLogin } from '../../hooks';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { emailState } from '../../utils';
interface LoginProps {
  initialUserEmail: string;
  initialUserPassword: string;
}
export default function LoginComponent({
  initialUserEmail,
  initialUserPassword,
}: LoginProps) {
  const setEmail = useSetRecoilState(emailState);
  const existedEmail = useRecoilValue(emailState);
  const [isSaveEmail, setIsSaveEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [userEmail, setUserEmail] = useState(
    existedEmail === '' ? initialUserEmail : existedEmail,
  );
  const [userPassword, setUserPassword] = useState(initialUserPassword);
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setUserEmail(email);
    if (!validateEmail(email) && email) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };
  const { mutate } = usePostLogin({
    userEmail: userEmail,
    userPassword: userPassword,
  });
  const handleClick = () => {
    if (isSaveEmail) {
      setEmail(userEmail);
    } else {
      setEmail('');
    }
    if (userEmail === '') alert('이메일을 입력해주세요.');
    else if (userPassword === '') alert('비밀번호를 입력해주세요.');
    else mutate();
  };

  return (
    <>
      <StyledLoginWrapper>
        <div style={{ position: 'relative', width: '100%' }}>
          <Link to="/">
            <img src="public/img/Logo.png" className="mx-auto" />
          </Link>
          <InputComponent
            id="user-email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요."
            value={userEmail}
            onChange={handleEmailChange}
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          <InputComponent
            id="user-password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          />
        </div>
        <StyledHelpWrapper>
          <StyledLabel>
            <StyledCheckbox
              className="peer"
              type="checkbox"
              onClick={() => setIsSaveEmail(!isSaveEmail)}
            />
            <StyledCheckboxChildren className="peer" />
            <span>이메일 저장</span>
          </StyledLabel>
          <StyledTextWrapper>
            <Link to="/findpassword">
              <StyledTextButton>비밀번호 찾기</StyledTextButton>
            </Link>
          </StyledTextWrapper>
        </StyledHelpWrapper>
        <LongButtonComponent text="로그인" onClick={handleClick} />
        <StyledTextWrapper>
          <span>회원이 아니신가요?</span>
          <Link to="/signup">
            <StyledTextButton>회원가입</StyledTextButton>
          </Link>
        </StyledTextWrapper>
      </StyledLoginWrapper>
    </>
  );
}
