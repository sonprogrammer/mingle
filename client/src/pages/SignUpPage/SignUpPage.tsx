import React from "react";
import { SignUpComponent } from "../../components";

export default function SignUpPage() {
  return (
    <>
      <SignUpComponent
        initialUserId={""}
        initialUserPassword={""}
        initialVerifyPassword={""}
        initialUserEmail={""}
      />
    </>
  );
}
