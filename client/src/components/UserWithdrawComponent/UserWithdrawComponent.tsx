import React, { useState } from 'react';
import { useDeleteUser } from '../../hooks';
import LogoutModal from '../SideBarComponent/LogoutModal';
import { StyledLogoutModal } from '../SideBarComponent/styles';
import { StyledWrapper } from './styles';

export default function UserWithdrawComponent() {
  const [showModal, setShowModal] = useState(false);
  const { mutate } = useDeleteUser();
  const handleClick = () => {
    setShowModal(true);
  };
  const handleConfirmWithdraw = () => {
    mutate();
    setShowModal(false);
  };

  const handleCancelWithdraw = () => {
    setShowModal(false);
  };
  return (
    <>
      <StyledWrapper onClick={handleClick}>회원 탈퇴하기</StyledWrapper>
      <StyledLogoutModal>
        {showModal && (
          <LogoutModal
            onConfirm={handleConfirmWithdraw}
            onCancel={handleCancelWithdraw}
            text="탈퇴"
          />
        )}
      </StyledLogoutModal>
    </>
  );
}
