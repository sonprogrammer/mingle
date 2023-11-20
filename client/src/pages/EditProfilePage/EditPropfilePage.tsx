import React from "react";
import { EditComponent } from "../../components/EditComponent";
import { StyledEditWrapper } from "./styles";

export default function EditProfilePage() {
  const profile = {
      email: 'mingle@mingle.com',
      nickname: 'mingle',
  }
  return (
    <StyledEditWrapper>
      <EditComponent profile={profile} />
    </StyledEditWrapper>
  );
}
