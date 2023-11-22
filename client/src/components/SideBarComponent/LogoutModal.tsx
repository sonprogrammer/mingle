import React from 'react'
import { StyledLogoutModalContainer, StyledLogoutModalContent, StyledButtons } from './styles'

interface LogoutModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function LogoutModal({ onConfirm, onCancel }: LogoutModalProps) {
  return (
    <StyledLogoutModalContainer>
      <StyledLogoutModalContent>
        <p>정말 로그아웃 하시겠습니까?</p>
        <StyledButtons>
          <button onClick={onConfirm}>확인</button>
          <button onClick={onCancel}>취소</button>
        </StyledButtons>
      </StyledLogoutModalContent>
    </StyledLogoutModalContainer>
  )
}
