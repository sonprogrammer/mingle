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
  Divider,
} from './styles';
import { LongButtonComponent } from '../LongButtonComponent';
import { usePostLogin } from '../../hooks';
interface LoginProps {
  initialUserEmail: string;
  initialUserPassword: string;
}
export default function LoginComponent({
  initialUserEmail,
  initialUserPassword,
}: LoginProps) {
  const [emailError, setEmailError] = useState('');
  const [userEmail, setUserEmail] = useState(initialUserEmail);
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
    mutate();
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
          />
        </div>
        <StyledHelpWrapper>
          <StyledLabel>
            <StyledCheckbox className="peer" type="checkbox" />
            <StyledCheckboxChildren className="peer" />
            <span>아이디 저장</span>
          </StyledLabel>
          <StyledTextWrapper>
            <StyledTextButton>아이디 찾기</StyledTextButton>
            <Divider />
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
