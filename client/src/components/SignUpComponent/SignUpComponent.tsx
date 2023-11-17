// SignUpComponent.tsx
import React, { useState, useEffect } from "react";
import {
  StyleSignUpContainer,
  StyleServiceName,
  StyleInput,
  StyleButton,
  StyleText,
  StyleWarningText,
} from "./styles";

interface SignUpProps {
  initialUserId: string;
  initialUserPassword: string;
  initialVerifyPassword: string;
  initialUserEmail: string;
}

export default function SignUpComponent({
  initialUserId,
  initialUserPassword,
  initialVerifyPassword,
  initialUserEmail,
}: SignUpProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //제출 로직
  };
  const [userId, setUserId] = useState(initialUserId);
  const [userPassword, setUserPassword] = useState(initialUserPassword);
  const [verifyPassword, setVerifyPassword] = useState(initialVerifyPassword);
  const [userEmail, setUserEmail] = useState(initialUserEmail);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    // 비밀번호와 비밀번호 확인이 다를 때 오류 상태 설정
    if (userPassword !== verifyPassword && verifyPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [userPassword, verifyPassword]);
  return (
    <StyleSignUpContainer onSubmit={handleSubmit}>
      <StyleServiceName>
        <img src="/img/Logo.png" alt="Mingle Logo" />
        <p>MINGLE</p>
      </StyleServiceName>
      <StyleText>아이디</StyleText>
      <StyleInput
        type="text"
        placeholder="아이디를 입력하세요."
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        pattern="[A-Za-z가-힣\s]+"
        required
      />
      <StyleText>비밀번호</StyleText>
      <StyleInput
        type="password"
        placeholder="비밀번호를 입력하세요."
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        minLength={8}
        required
      />
      <StyleText>비밀번호 재확인</StyleText>
      <StyleInput
        type="password"
        placeholder="비밀번호를 재입력하세요."
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
        required
      />
      {passwordError && (
        <StyleWarningText>비밀번호가 일치하지 않습니다.</StyleWarningText>
      )}
      <StyleText>이메일</StyleText>
      <StyleInput
        type="email"
        placeholder="이메일을 입력하세요."
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />
      <StyleButton type="submit">가입하기</StyleButton>
    </StyleSignUpContainer>
  );
}
