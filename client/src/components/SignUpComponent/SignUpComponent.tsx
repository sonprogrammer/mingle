// SignUpComponent.tsx
import React from "react";
import {
  SignUpContainerStyle,
  ServiceName,
  InputStyle,
  ButtonStyle,
} from "./styles";

interface SignUpProps {
  userId: string;
  userPassword: string;
  verifyPassword: string;
  userEmail: string;
}

export default function SignUpComponent({
  userId,
  userPassword,
  verifyPassword,
  userEmail,
}: SignUpProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //제출 로직
  };

  return (
    <SignUpContainerStyle onSubmit={handleSubmit}>
      <ServiceName>
        <img src="/client/public/img/MingleLogo.png" alt="Mingle Logo" />
        <p>MINGLE</p>
      </ServiceName>
      <p>아이디</p>
      <InputStyle
        type="text"
        placeholder="아이디를 입력하세요."
        value={userId}
        onChange={() => {}}
      />
      <p>비밀번호</p>
      <InputStyle
        type="text"
        placeholder="비밀번호를 입력하세요."
        value={userPassword}
        onChange={() => {}}
      />
      <p>비밀번호 재확인</p>
      <InputStyle
        type="text"
        placeholder="비밀번호를 재입력하세요."
        value={verifyPassword}
        onChange={() => {}}
      />
      <p>이메일</p>
      <InputStyle
        type="text"
        placeholder="이메일을 입력하세요."
        value={userEmail}
        onChange={() => {}}
      />
      <ButtonStyle type="submit">Sign Up</ButtonStyle>
    </SignUpContainerStyle>
  );
}
