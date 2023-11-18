import React from "react";
import { InputComponent } from "../InputComponent";

interface AuthComponentProps {
  type: string;
}
export default function AuthComponent({ type }: AuthComponentProps) {
  return (
    <>
      <img src="/img/Logo.png" className="mx-auto" />
      <InputComponent
        label="이메일"
        type="email"
        placeholder="mingle@mingle.com"
      />
      <InputComponent
        label="비밀번호"
        type="password"
        placeholder="•••••••••"
      />
      {type === "join" && (
        <InputComponent
          label="비밀번호 확인"
          type="password"
          placeholder="•••••••••"
        />
      )}
    </>
  );
}
