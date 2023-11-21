import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState } from './utils';

export default function PrivateRoute() {
  const isLogin = useRecoilValue(tokenState);
  if (isLogin) {
    return <Outlet />;
  }
  return <Navigate replace to="/login" />;
}
