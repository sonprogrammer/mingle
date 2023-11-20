import React, { useState, useEffect } from "react";

import * as Styled from "./styles";
import LongButtonComponent from "../LongButtonComponent/LongButtonComponent";

interface SignUpProps {
  initialUserPassword: string;
  initialVerifyPassword: string;
  initialUserEmail: string;
}

export default function SignUpComponent({
  initialUserPassword,
  initialVerifyPassword,
  initialUserEmail,
}: SignUpProps) {
  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    //제출 로직
  };
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
    <Styled.StyleSignUpContainer>
      <Styled.StyleServiceName>
        <img src="/img/Logo.png" alt="Mingle Logo" />
      </Styled.StyleServiceName>
      <Styled.StyleText>이메일</Styled.StyleText>
      <Styled.StyleInput
        id="userEmail"
        type="email"
        placeholder="이메일을 입력하세요."
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />
      <div style={{ position: "relative", width: "100%" }}>
        <Styled.StyleText>비밀번호</Styled.StyleText>
        <Styled.StyleInput
          id="userPassword"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력하세요."
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <Styled.StylePasswordToggleIcon
          src="/img/view-password.png"
          alt="비밀번호 보기"
          onClick={togglePasswordVisibility}
        />
      </div>
      <div style={{ position: "relative", width: "100%" }}>
        <Styled.StyleText>비밀번호 재확인</Styled.StyleText>
        <Styled.StyleInput
          id="verifyPassword"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 재입력하세요."
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          required
        />
        <Styled.StylePasswordToggleIcon
          src="/img/view-password.png"
          alt="비밀번호 보기"
          onClick={togglePasswordVisibility}
        />
      </div>
      <Styled.StyledTextWrapper>
        <span>나의 음악 취향은?(선택사항)</span>
        <Styled.StyledChoiceButton>고르러 가기</Styled.StyledChoiceButton>
      </Styled.StyledTextWrapper>
      {passwordError && (
        <Styled.StyleWarningText>
          비밀번호가 일치하지 않습니다.
        </Styled.StyleWarningText>
      )}

      <LongButtonComponent text="가입하기" onClick={handleClick} />
      <Styled.StyledTextWrapper>
        <span>회원이신가요?</span>
        <Styled.StyledTextButton>로그인</Styled.StyledTextButton>
      </Styled.StyledTextWrapper>
    </Styled.StyleSignUpContainer>
  );
}
