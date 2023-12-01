import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from './utils';

export default function PrivateRoute() {
  const { isLogin } = useRecoilValue(loginState);
  const refreshToken = window.localStorage.getItem('refresh_token');
  if (isLogin || (!isLogin && refreshToken)) {
    return <Outlet />;
  }
  return <Navigate replace to="/login" />;
}
