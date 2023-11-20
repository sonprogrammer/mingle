import React from 'react';
import { LongButtonComponent, AuthComponent } from '../../components';
import {
  StyledHelpWrapper,
  StyledLabel,
  Divider,
  StyledLoginWrapper,
  StyledTextButton,
  StyledTextWrapper,
  StyledCheckbox,
  StyledCheckboxChildren,
} from './styles';
export default function LoginPage() {
  const handleClick = () => {
    // 추후 로그인 함수 구현 예정
  };
  return (
    <StyledLoginWrapper>
      <AuthComponent type="login" />
      <StyledHelpWrapper>
        <StyledLabel>
          <StyledCheckbox className="peer" type="checkbox" />
          <StyledCheckboxChildren className="peer" />
          <span>아이디 저장</span>
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
