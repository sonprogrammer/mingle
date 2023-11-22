import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from './utils';

export default function PrivateRoute() {
  const { accessToken } = useRecoilValue(loginState);
  if (accessToken !== '') {
    return <Outlet />;
  }
  return <Navigate replace to="/login" />;
}
