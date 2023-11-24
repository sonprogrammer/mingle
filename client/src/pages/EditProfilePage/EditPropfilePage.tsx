import React from 'react';
import { UserWithdrawComponent } from '../../components';
import { EditComponent } from '../../components/EditComponent';
import { useGetUserInfo } from '../../hooks';
import { StyledEditWrapper } from './styles';

export default function EditProfilePage() {
  
  const { data, isLoading } = useGetUserInfo();

  if(isLoading) {
    <h1>loading...</h1>
  }

  return (
    <StyledEditWrapper>
      <EditComponent profile={data} />
      <UserWithdrawComponent />
    </StyledEditWrapper>
  );
}
