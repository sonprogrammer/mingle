// SignUpComponent.tsx
import React, { useState, useEffect } from "react";
import {
  StyleSignUpContainer,
  StyleServiceName,
  StyleInput,
  StyleButton,
  StyleText,
  StyleWarningText,
  StylePasswordToggleIcon,
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
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
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
        id="userId"
        type="text"
        placeholder="아이디를 입력하세요."
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        pattern="[A-Za-z가-힣\s]+"
        required
      />
      <div style={{ position: "relative", width: "100%" }}>
        <StyleText>비밀번호</StyleText>
        <StyleInput
          id="userPassword"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력하세요."
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <StylePasswordToggleIcon
          src="/img/view-password.png"
          alt="비밀번호 보기"
          onClick={togglePasswordVisibility}
        />
      </div>
      <div style={{ position: "relative", width: "100%" }}>
        <StyleText>비밀번호 재확인</StyleText>
        <StyleInput
          id="verifyPassword"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 재입력하세요."
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          required
        />
        <StylePasswordToggleIcon
          src="/img/view-password.png"
          alt="비밀번호 보기"
          onClick={togglePasswordVisibility}
        />
      </div>

      {passwordError && (
        <StyleWarningText>비밀번호가 일치하지 않습니다.</StyleWarningText>
      )}
      <StyleText>이메일</StyleText>
      <StyleInput
        id="userEmail"
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
