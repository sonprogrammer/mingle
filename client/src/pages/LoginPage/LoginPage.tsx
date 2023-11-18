import React from "react";
import { LongButtonComponent, AuthComponent } from "../../components";
import {
  StyledHelpWrapper,
  StyledLabel,
  Divider,
  StyledLoginWrapper,
  StyledTextButton,
  StyledTextWrapper,
} from "./styles";
export default function LoginPage() {
  const handleClick = () => {
    // 추후 로그인 함수 구현 예정
  };
  return (
    <StyledLoginWrapper>
      <AuthComponent type="login" />
      <StyledHelpWrapper>
        <StyledLabel>
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
          <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            아이디 저장
          </span>
        </StyledLabel>
        <StyledTextWrapper isJoin={false}>
          <StyledTextButton>아이디 찾기</StyledTextButton>
          <Divider />
          <StyledTextButton>비밀번호 찾기</StyledTextButton>
        </StyledTextWrapper>
      </StyledHelpWrapper>
      <LongButtonComponent text="로그인" onClick={handleClick} />
      <StyledTextWrapper isJoin>
        <span>회원이 아니신가요?</span>
        <StyledTextButton>회원가입</StyledTextButton>
      </StyledTextWrapper>
    </StyledLoginWrapper>
  );
}
