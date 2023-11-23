import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyleFormContainer,
  StyledButton,
  StyledCompletionMessage,
  StyledImage,
} from './styles';
export default function CompleteSignUpComponent() {
  return (
    <>
      <StyleFormContainer>
        <div style={{ position: 'relative', width: '100%' }}>
          <StyledImage src="/img/CompleteSignUp.png" />
          <StyledCompletionMessage>
            회원가입이 완료되었습니다!
          </StyledCompletionMessage>

          <Link to="/login">
            <StyledButton>로그인하러 가기</StyledButton>
          </Link>
        </div>
      </StyleFormContainer>
    </>
  );
}
