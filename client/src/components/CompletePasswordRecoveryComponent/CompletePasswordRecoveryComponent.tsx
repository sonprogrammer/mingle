import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyleFormContainer,
  StyledButton,
  StyledCompletionMessage,
  StyledImage,
} from './styles';
export default function CompletePasswordRecoveryComponent() {
  return (
    <>
      <StyleFormContainer>
        <div style={{ position: 'relative', width: '100%' }}>
          <StyledImage src="/img/CheckIcon.png" />
          <StyledCompletionMessage>
            이메일로 임시 비밀번호가 전송되었습니다.
          </StyledCompletionMessage>

          <Link to="/login">
            <StyledButton>로그인하러 가기</StyledButton>
          </Link>

          <Link to="/">
            <StyledButton>메인으로 가기</StyledButton>
          </Link>
        </div>
      </StyleFormContainer>
    </>
  );
}
