import React, { useState } from 'react';
import { StyleFormContainer } from './styles';
import { LongButtonComponent } from '../LongButtonComponent';
import { InputComponent } from '../InputComponent';
import { Link } from 'react-router-dom';
import { usePostPassword } from '../../hooks/usePostPassword';
interface FindPasswordProps {
  initialUserEmail: string;
  initialUserNickname: string;
}
export default function FindPasswordComponent({
  initialUserEmail,
  initialUserNickname,
}: FindPasswordProps) {
  const [userEmail, setUserEmail] = useState(initialUserEmail);
  const [userNickname, setUserNickname] = useState(initialUserNickname);
  const [emailError, setEmailError] = useState('');

  const { mutate: postPassword } = usePostPassword();

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    if (!userEmail || !userNickname) {
      alert('이메일과 닉네임을 모두 입력해주세요.');
      return;
    }

    postPassword({ userEmail, userNickname });
  };

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

  return (
    <>
      <StyleFormContainer>
        <div style={{ position: 'relative', width: '100%' }}>
          <Link to="/">
            <img src="/img/Logo.png" className="mx-auto" />
          </Link>
          <InputComponent
            id="user-email"
            label="이메일"
            type="email"
            value={userEmail}
            placeholder="이메일을 입력하세요."
            onChange={handleEmailChange}
          />
          {emailError && (
            <p style={{ color: 'red', marginTop: -20, marginBottom: 10 }}>
              {emailError}
            </p>
          )}
          <InputComponent
            id="user-nickname"
            label="닉네임"
            type="text"
            value={userNickname}
            placeholder="닉네임을 입력하세요."
            onChange={(e) => setUserNickname(e.target.value)}
          />
        </div>
        <Link to="/completerecoverypw">
          <LongButtonComponent text="비밀번호 찾기" onClick={handleClick} />
        </Link>
      </StyleFormContainer>
    </>
  );
}
