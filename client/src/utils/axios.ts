import Axios, { AxiosHeaders } from 'axios';
import { getCookieToken } from './cookie';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState } from './state';
import axios from 'axios';

export const useAxios = () => {
  const today = new Date(Date.now());
  const { accessToken, accessExpiredDate } = useRecoilValue(loginState);
  const diff = today.getTime() - new Date(accessExpiredDate).getTime();
  const refreshToken = getCookieToken();
  const axiosInstance = Axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const setLogin = useSetRecoilState(loginState);
  axiosInstance.interceptors.request.use(async (config) => {
    if ((accessToken === '' && refreshToken) || diff >= 0) {
      const response = await axios.post('/api/account/refresh', {
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
  return axiosInstance;
};
