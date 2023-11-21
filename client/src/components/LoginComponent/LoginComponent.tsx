import React, { useState } from 'react';
import { InputComponent } from '../InputComponent';
import * as Styled from './styles';
import { LongButtonComponent } from '../LongButtonComponent';
import { usePostLogin } from '../../hooks';

export default function LoginComponent() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const { mutate } = usePostLogin({
    userEmail: userEmail,
    userPassword: userPassword,
  });
  const handleClick = () => {
    mutate();
  };
  return (
    <>
      <Styled.StyledLoginWrapper>
        <div style={{ position: 'relative', width: '100%' }}>
          <img src="/img/Logo.png" className="mx-auto" />
          <InputComponent
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요."
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
          <InputComponent
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
        <Styled.StyledHelpWrapper>
          <Styled.StyledLabel>
            <Styled.StyledCheckbox className="peer" type="checkbox" />
            <Styled.StyledCheckboxChildren className="peer" />
            <span>아이디 저장</span>
          </Styled.StyledLabel>
          <Styled.StyledTextWrapper>
            <Styled.StyledTextButton>아이디 찾기</Styled.StyledTextButton>
            <Styled.Divider />
            <Styled.StyledTextButton>비밀번호 찾기</Styled.StyledTextButton>
          </Styled.StyledTextWrapper>
        </Styled.StyledHelpWrapper>
        <LongButtonComponent text="로그인" onClick={handleClick} />
        <Styled.StyledTextWrapper>
          <span>회원이 아니신가요?</span>
          <Styled.StyledTextButton>회원가입</Styled.StyledTextButton>
        </Styled.StyledTextWrapper>
      </Styled.StyledLoginWrapper>
    </>
  );
}
