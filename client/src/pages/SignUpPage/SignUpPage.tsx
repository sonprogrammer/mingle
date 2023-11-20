import React from "react";
import { SignUpComponent } from "../../components/SignUpComponent";

export default function SignUpPage() {
  return (
    <>
      <SignUpComponent
        initialUserPassword={""}
        initialVerifyPassword={""}
        initialUserEmail={""}
      />
    </>
  );
}
