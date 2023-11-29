import React from 'react';
import { UserWithdrawComponent } from '../../components';
import { EditComponent } from '../../components/EditComponent';
import { useGetUserInfo, usePutUserInfo } from '../../hooks';
import { StyledEditWrapper } from './styles';
import { UserInfo } from '../../types';


export default function EditProfilePage() {
  
  const { data: userData, isLoading } = useGetUserInfo();
  const { mutate: updateUserInfo } = usePutUserInfo();

  if(isLoading) {
    return <h1>loading...</h1>
  }

  const handleUpdate = async(updatedInfo: Partial<UserInfo>) =>{
       updateUserInfo(updatedInfo);
  }

  return (
    <StyledEditWrapper>
      <EditComponent profile={userData.user} onUpdate={handleUpdate} />
      <UserWithdrawComponent />
    </StyledEditWrapper>
  );
}
