import Axios, { AxiosHeaders } from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState } from './state';

export const useAxios = () => {
  const today = new Date(Date.now());
  const { accessToken, accessExpiredDate } = useRecoilValue(loginState);
  const diff = today.getTime() - new Date(accessExpiredDate).getTime();
  const storage = window.localStorage;
  const refreshToken = storage.getItem("refresh_token");
  
  const axiosBase = Axios.create({
    baseURL: 'http://kdt-sw-6-team09.elicecoding.com/',
  });
  const axiosInstance = Axios.create({
    baseURL: 'http://kdt-sw-6-team09.elicecoding.com/',
    headers: {
      'Content-Type': 'application/json',
      withCredentials: true,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const setLogin = useSetRecoilState(loginState);
  axiosInstance.interceptors.request.use(async (config) => {
    if ((accessToken === '' && refreshToken) || diff >= 0) {
      const response = await axiosBase.post('/api/account/refresh', {
        refreshToken: refreshToken,
      });
      setLogin({
        isLogin: true,
        accessToken: response.data.accessToken,
        accessExpiredDate: response.data.accessExpiredDate,
      });
      (config.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${response.data.accessToken}`,
      );
    } // 토큰이 유실되었을 때 또는 access Token이 만료 되었을 때 재발급 로직(refresh Token은 존재함)

    return config;
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return { axiosInstance, axiosBase };
};
