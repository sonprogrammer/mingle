import React from 'react';
import {
  StyleContainer,
  StyleEmoji,
  StyleErrorText,
  StyleBackLink,
} from './styles';

const NotFoundPage: React.FC = () => {
  return (
    <StyleContainer>
      <StyleEmoji>😵‍💫</StyleEmoji>
      <StyleErrorText>404!</StyleErrorText>
      <StyleBackLink href="/">메인 페이지로 돌아가기</StyleBackLink>
    </StyleContainer>
  );
};

export default NotFoundPage;
