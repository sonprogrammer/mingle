import React from 'react';
import { EditComponent } from '../../components/EditComponent';
import { useGetUserInfo } from '../../hooks';
import { StyledEditWrapper } from './styles';

export default function EditProfilePage() {
  const profile = {
    email: 'mingle@mingle.com',
    nickname: 'mingle',
  };
  const { data, isLoading } = useGetUserInfo();
  return (
    <StyledEditWrapper>
      <EditComponent profile={profile} />
    </StyledEditWrapper>
  );
}
